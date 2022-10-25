import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ChevronDownIcon from '../../../assets/icons/ChevronDownIcon'
import DownloadIcon from '../../../assets/icons/DownloadIcon'
import FlaskIcon from '../../../assets/icons/FlaskIcon'
import MoneyIcon from '../../../assets/icons/MoneyIcon'
import ShieldCheckIcon from '../../../assets/icons/ShieldCheckIcon'
import Button from '../../atoms/Button'
import ActiveMapMarketCarousel from '../Carousels/ActiveMapMarketCarousel'

import { APIPanoPlan, APIPhotoPlan, APIPlans } from '@carbonpath/shared/lib/api/dronedeploy'
import { fetchEnverusWellData } from '@carbonpath/shared/lib/api/wells'
import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import ReactPannellum from 'react-pannellum'
import Rodal from 'rodal'
import CloseIcon from '../../../assets/icons/CloseIcon'
import { MIN_SWIPE_DISTANCE } from '../../../constants/swipe'
import { isContainedWithinGeom } from '../../../utils/geom'
import MobileSliderModal from '../../atoms/MobileSliderModal'

type Props = {
  wellInfo: Well
  droneDeployImages: APIPlans
  showPopup: boolean
  setShowPopup: (showPopup: boolean) => void
  onClose: () => void
  activeButton: string
  setActiveButton: Dispatch<SetStateAction<string>>
  setRetireFromMarker: Dispatch<SetStateAction<Well>>
}

type WellImage = {
  image: string
  description: string
}

const MapPopupMobile: React.FC<Props> = ({
  wellInfo,
  droneDeployImages,
  showPopup,
  setShowPopup,
  onClose,
  activeButton,
  setActiveButton,
  setRetireFromMarker,
}) => {
  const [expand, setExpand] = useState(false)

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const [showPopupIntermediate, setShowPopupIntermediate] = useState(false)

  const [panoPath, setPanoPath] = useState('')
  const [showPano, setShowPano] = useState(false)
  const [carouselPhotos, setCarouselPhotos] = useState<WellImage[]>([...wellInfo.wellImageList])
  const [isCarouselPhotosSet, setIsCarouselPhotosSet] = useState(false)
  const [videoPath, setVideoPath] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef()

  const { authStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token

  const pannellumConfig = {
    autoLoad: false,
    zoom: 2,
  }

  const pannellumStyle = {
    width: '100%',
    height: '100%',
    background: '#000000',
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

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance < -MIN_SWIPE_DISTANCE) {
      handleCloseModal()
    }
    if (distance >= MIN_SWIPE_DISTANCE) {
      setExpand(true)
    }
  }

  const handleExpandClick = () => {
    setExpand((prev) => !prev)
  }

  const handleCloseModal = () => {
    setExpand(false)
    setShowPopup(false)
    setShowPopupIntermediate(false)
    onClose()
  }

  const handlePopupRetire = () => {
    setRetireFromMarker(wellInfo)
    handleCloseModal()
    setActiveButton('retire')
  }

  useEffect(() => {
    if (showPopup) {
      setShowPopupIntermediate(true)
    }
  }, [showPopup])

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

  return (
    <>
      <Rodal
        className={'mb-auto z-[9999]'}
        visible={showPano}
        width={100}
        height={100}
        measure={'%'}
        animation={'fade'}
        showCloseButton={true}
        onClose={() => {
          setShowPano(false)
          setShowPopupIntermediate(true)
        }}
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
        className={'mb-auto z-[9999] bg-transparent'}
        visible={showVideo}
        width={100}
        height={100}
        measure={'%'}
        animation={'fade'}
        showCloseButton={true}
        onClose={() => {
          setShowVideo(false)
          setShowPopupIntermediate(true)
        }}
      >
        {videoPath !== '' && (
          <video width="100%" className="flex mx-auto my-auto" controls>
            <source src={videoPath} type="video/mp4" />
          </video>
        )}
      </Rodal>
      <MobileSliderModal
        isModalOpen={showPopupIntermediate}
        setIsModalOpen={setShowPopupIntermediate}
        width={100}
        height={expand ? 100 : 50}
        measure={'%'}
        animation={'slideUp'}
        className={classNames('flex flex-col justify-start items-center px-3 py-2', {
          'rounded-none bg-white overflow-y-scroll': expand,
        })}
      >
        <div
          className="w-full z-[999] flex flex-col justify-between items-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={classNames('border-[#9EA1AE] border-2 rounded-lg w-8', { hidden: expand })}
          />
          <div
            className={classNames('flex w-full justify-between items-center', {
              hidden: !expand,
            })}
          >
            <Button
              iconAlign="iconOnly"
              icon={<ChevronDownIcon className="scale-150" />}
              onClick={handleExpandClick}
              className="px-0 pr-4"
            />

            <Button
              iconAlign="iconOnly"
              icon={<CloseIcon className="stroke-carbon-path-bluestroke" width={30} />}
              onClick={handleCloseModal}
              className="px-0 pr-4"
            />
          </div>
        </div>
        <div className="w-full tracking-normal overflow-y-auto">
          <div
            className={classNames('font-bold text-carbon-path-blue text-2xl mt-8', {
              'mt-0': expand,
            })}
          >
            {wellInfo.name}
          </div>
          <div className="font-bold text-gray-light text-base mb-4">
            {wellInfo.location.length > 2 ? wellInfo.location : 'N/A'}
          </div>

          <div className="flex flex-col text-gray-normal text-sm gap-2 mb-4">
            <div className="flex items-center">
              <MoneyIcon />
              <span className="pl-1">
                ${wellInfo.costPerTonne !== null ? wellInfo.costPerTonne : 'N/A'} per Tonne
              </span>
            </div>
            <div className="flex items-center">
              <ShieldCheckIcon />
              <span className="pl-1">
                {!!wellInfo.retiredAmount ? `${wellInfo.retiredAmount} tokens retired` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center">
              <FlaskIcon />
              <span className="pl-1">
                {!!wellInfo.numberOfBufferPoolEavs && !!wellInfo.numberOfAdvancedEavs
                  ? `${wellInfo.numberOfBufferPoolEavs + wellInfo.numberOfAdvancedEavs} tonnes`
                  : 'N/A'}
              </span>
            </div>
            <div className="flex items-center" onClick={() => handleDownloadWellData()}>
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

          <Button
            onClick={handlePopupRetire}
            variant={isLogin ? 'cyan' : 'grayOut'}
            caps={true}
            disabled={!isLogin}
            className="flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base rounded-2xl my-4"
          >
            {isLogin
              ? activeButton === 'retire'
                ? 'RETIRE ON THIS WELL'
                : 'RETIRE'
              : 'Login to retire'}
          </Button>

          <Button
            caps={true}
            className={classNames(
              'flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base rounded-2xl my-4',
              {
                hidden: !expand,
              }
            )}
            variant="quickWhite"
            onClick={() => {
              setShowPano(true)
              setShowPopupIntermediate(false)
            }}
          >
            SHOW PANORAMIC VIEW
          </Button>
          <Button
            onClick={handleExpandClick}
            variant="quickWhite"
            caps={true}
            className={classNames(
              'flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base rounded-2xl my-4',
              {
                hidden: expand,
              }
            )}
          >
            SEE FULL INFO
          </Button>
          <div
            className={classNames('py-8 bg-transparent rounded-2xl', {
              hidden: carouselPhotos.length === 0,
            })}
          >
            <ActiveMapMarketCarousel show={expand} images={carouselPhotos} />
          </div>
          <Button
            className="flex-1 font-bold w-full text-carbon-path-bluestroke font-montserrat text-base rounded-2xl my-4"
            variant="cyan"
            onClick={() => {
              setShowVideo(true)
              setShowPopupIntermediate(false)
            }}
          >
            SHOW VIDEO VIEW
          </Button>
          <div className={classNames('font-lato text-gray-normal text-base pb-4 bg-white', {})}>
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
          </div>
        </div>
      </MobileSliderModal>
    </>
  )
}

export default MapPopupMobile
