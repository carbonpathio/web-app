import { APIPanoPlan, APIPhotoPlan, APIPlans } from '@carbonpath/shared/lib/api/dronedeploy'
import { fetchEnverusWellData } from '@carbonpath/shared/lib/api/wells'
import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Popup } from 'react-map-gl'
import ReactPannellum from 'react-pannellum'
import Rodal from 'rodal'
import ChevronDownIcon from '../../../assets/icons/ChevronDownIcon'
import ChevronUpIcon from '../../../assets/icons/ChevronUpIcon'
import DownloadIcon from '../../../assets/icons/DownloadIcon'
import FlaskIcon from '../../../assets/icons/FlaskIcon'
import MoneyIcon from '../../../assets/icons/MoneyIcon'
import RetireIcon from '../../../assets/icons/RetireIcon'
import { isContainedWithinGeom } from '../../../utils/geom'
import Button from '../../atoms/Button'
import ActiveMapMarketCarousel from '../Carousels/ActiveMapMarketCarousel'

type Props = {
  wellInfo: Well
  droneDeployImages: APIPlans
  onClose: () => void
  activeButton: string
  setActiveButton: Dispatch<SetStateAction<string>>
  setRetireFromMarker: Dispatch<SetStateAction<Well>>
}

type WellImage = {
  image: string
  description: string
}

const MapPopup: React.FC<Props> = ({
  wellInfo,
  droneDeployImages,
  onClose,
  activeButton,
  setActiveButton,
  setRetireFromMarker,
}) => {
  const [expand, setExpand] = useState(false)
  const [panoPath, setPanoPath] = useState('')
  const [showPano, setShowPano] = useState(false)
  const [carouselPhotos, setCarouselPhotos] = useState<WellImage[]>([...wellInfo.wellImageList])
  const [isCarouselPhotosSet, setIsCarouselPhotosSet] = useState(false)
  const [videoPath, setVideoPath] = useState('')
  const [showVideo, setShowVideo] = useState(false)

  const { authStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token

  const handleExpandClick = () => {
    setExpand((prev) => !prev)
  }

  const handleDownloadWellData = async () => {
    const response = await fetchEnverusWellData(wellInfo.id)
    if (Object.keys(response.response.entities).length !== 0) {
      const element = document.createElement('a')
      const file = new Blob([JSON.stringify(response.response.entities)], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${wellInfo.name}_data.json`
      document.body.appendChild(element) // Required for this to work in FireFox
      element.click()
    }
  }

  const handlePopupRetire = () => {
    setRetireFromMarker(wellInfo)
    setActiveButton('retire')
  }

  useEffect(() => {
    if (droneDeployImages) {
      droneDeployImages['panoPlans'].forEach((pano: APIPanoPlan, index: number) => {
        if (isContainedWithinGeom(wellInfo.shlLatitude, wellInfo.shlLongitude, pano.geometry)) {
          setPanoPath(pano.downloadPath)
        }
      })
      droneDeployImages['videoPlans'].forEach((video: APIPanoPlan, index: number) => {
        if (isContainedWithinGeom(wellInfo.shlLatitude, wellInfo.shlLongitude, video.geometry)) {
          setVideoPath(video.downloadPath)
        }
      })
      if (!isCarouselPhotosSet) {
        droneDeployImages['photoPlans'].forEach((photo: APIPhotoPlan, index: number) => {
          if (isContainedWithinGeom(wellInfo.shlLatitude, wellInfo.shlLongitude, photo.geometry)) {
            if (photo.downloadPath !== null) {
              setIsCarouselPhotosSet(true)
              setCarouselPhotos((prev) => {
                let newPhotos = photo.downloadPath.map((item: string, index: number) => {
                  return {
                    image: item,
                    description: `${photo.name} -  ${index + 1} of ${photo.downloadPath.length}`,
                  }
                })
                let ret = [...prev, ...newPhotos]
                return ret
              })
            }
          }
        })
      }
    }
  }, [droneDeployImages, wellInfo, isCarouselPhotosSet])

  const pannellumConfig = {
    autoLoad: false,
    zoom: 2,
  }

  const pannellumStyle = {
    width: '100%',
    height: '100%',
    background: '#000000',
  }

  return (
    <>
      <Rodal
        className={'mb-auto'}
        visible={showPano}
        width={90}
        height={90}
        measure={'%'}
        animation={'fade'}
        showCloseButton={true}
        onClose={() => setShowPano(false)}
      >
        {panoPath !== '' && (
          <ReactPannellum
            id="1"
            sceneId="1"
            imageSource={panoPath}
            config={pannellumConfig}
            style={pannellumStyle}
          />
        )}
      </Rodal>
      <Rodal
        className={'mb-auto'}
        visible={showVideo}
        width={80}
        height={50}
        measure={'%'}
        animation={'fade'}
        showCloseButton={true}
        onClose={() => setShowVideo(false)}
      >
        {videoPath !== '' && (
          <video width="80%" className="flex mx-auto my-auto" controls>
            <source src={videoPath} type="video/mp4" />
          </video>
        )}
      </Rodal>
      <Popup
        maxWidth="720px"
        anchor="bottom"
        longitude={360 - wellInfo.shlLongitude}
        latitude={wellInfo.shlLatitude}
        onClose={onClose}
      >
        <div
          className={classNames('items-center', {
            'grid grid-cols-2 w-full gap-x-4': carouselPhotos.length > 0,
          })}
        >
          <div className="min-w-[320px] h-fit font-lato p-4 justify-self-end bg-white rounded-2xl tracking-normal">
            <div className="w-fit font-bold text-gray-normal text-2xl">
              {wellInfo.name}
              <span className="block font-bold text-gray-middle text-base">
                {wellInfo.location.length > 2 ? wellInfo.location : 'N/A'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-4 text-gray-normal text-xs font-semibold">
              <div className="flex flex-row items-center">
                <MoneyIcon />
                <span className="pl-1">
                  ${wellInfo.costPerTonne !== null ? wellInfo.costPerTonne : 'N/A'} per Tonne
                </span>
              </div>
              <div className="flex flex-row items-center">
                <RetireIcon className="stroke-gray-normal" />
                <span className="pl-1">
                  {!!wellInfo.retiredAmount ? `${wellInfo.retiredAmount}  tokens retired` : 'N/A'}
                </span>
              </div>
              <div className="flex flex-row items-center">
                <FlaskIcon />
                <span className="pl-1">
                  {!!wellInfo.numberOfBufferPoolEavs && !!wellInfo.numberOfAdvancedEavs
                    ? `${wellInfo.numberOfBufferPoolEavs + wellInfo.numberOfAdvancedEavs} tonnes`
                    : 'N/A'}
                </span>
              </div>
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => handleDownloadWellData()}
              >
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="underline cursor-pointer focus:outline-none"
                >
                  <DownloadIcon className="inline" />
                  <span className="pl-1 font-bold text-carbon-path-bluestroke">
                    Download well data
                  </span>
                </a>
              </div>
            </div>

            <div className="flex py-4 justify-center ">
              <button onClick={handleExpandClick}>
                {expand ? (
                  <ChevronUpIcon className="stroke-carbon-path-bluestroke" />
                ) : (
                  <ChevronDownIcon className="stroke-carbon-path-bluestroke" />
                )}
              </button>
            </div>

            <div
              className={classNames('font-lato text-gray-normal text-xs pb-4 pl-4', {
                hidden: !expand,
              })}
            >
              <div className="flex-row py-1">
                <span className="font-bold">Contract Add: </span>
                {wellInfo.nftContractAddress.length ? wellInfo.nftContractAddress : 'N/A'}
              </div>
              <div className="flex-row py-1">
                <span className="font-bold">Token Id: </span>
                {wellInfo.tokenId.length ? wellInfo.tokenId : 'N/A'}
              </div>
              <div className="flex-row py-1">
                <span className="font-bold">Blockchain: </span>
                {wellInfo.blockchain.length ? wellInfo.blockchain : 'N/A'}
              </div>
              {/* <div className="flex-row py-1">
                <span className="font-bold">Metadata: </span>
                {wellInfo.ipfsMetadataUrl.length ? wellInfo.ipfsMetadataUrl : 'N/A'}
              </div> */}
              {/* <Button
                className="flex-1 text-carbon-path-bluestroke font-montserrat text-xs"
                //@ts-ignore
                variant={classNames({
                  cyan: panoPath !== "",
                  grayOut: panoPath === ""
                })}
                disabled={panoPath === ""}
                onClick={() => setShowPano(true)}
              >
                {panoPath === "" ? "No Panoramic View Available" : "Show Panoramic View"}
              </Button> */}
            </div>

            <Button
              className="flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base mb-2"
              variant={isLogin ? 'cyan' : 'grayOut'}
              onClick={handlePopupRetire}
              caps={true}
              disabled={!isLogin}
            >
              {isLogin ? 'Retire' : 'Login to retire'}
            </Button>
            <Button
              className="flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base mb-2"
              caps={true}
              //@ts-ignore
              variant={classNames({
                quickWhite: panoPath !== '',
                grayOut: panoPath === '',
              })}
              disabled={panoPath === ''}
              onClick={() => setShowPano(true)}
            >
              SHOW PANORAMIC VIEW
            </Button>
            {/* <Button
              className="flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base"
              //@ts-ignore
              variant={classNames({
                cyan: videoPath !== '',
                grayOut: videoPath === '',
              })}
              disabled={videoPath === ''}
              onClick={() => setShowVideo(true)}
            >
              SHOW VIDEO
            </Button> */}
          </div>

          <div
            className={classNames('bg-transparent rounded-2xl h-full w-[340px]', {
              hidden: carouselPhotos.length === 0,
            })}
          >
            {<ActiveMapMarketCarousel show expand={expand} images={carouselPhotos} />}
          </div>
        </div>
      </Popup>
    </>
  )
}

export default MapPopup
