import config from '@carbonpath/shared/lib/config'
import React, { useState } from 'react'
import { useAsync } from 'react-use'
import RightSmallArrowIcon from '../../../assets/icons/RightSmallArrowIcon'
import ScrollIcon from '../../../assets/icons/ScrollIcon'
const LandingPageBlogTile: React.FC = () => {
  const [blog, setBlog] = useState([])

  useAsync(async () => {
    const resp = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40devcarbontest&api_key=${config.mediumApiKey}`
    )
    const respData = await resp.json()
    const blogArray = respData.items.slice(0, 3)

    const displayData = blogArray.map((item, index) => {
      try {
        const itemDesc = item.description
        const descStart = itemDesc.indexOf('<p>')
        const descEnd = itemDesc.indexOf('</p>')

        if (index === 0) {
          return (
            <>
              <img src={item.thumbnail} alt="sample-blog-pic" className="w-full rounded-t-2xl" />
              <div className="px-9 py-7">
                <div className="font-lato font-bold text-3xl mb-4">{item.title}</div>
                <div className="font-lato text-[#606060] text-sm pb-7 md:mb-12">
                  {itemDesc.slice(descStart + 3, descEnd)}
                </div>
                <a
                  className="font-lato font-bold text-lg text-carbon-path-bluestroke`"
                  href={item.guid}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ScrollIcon className="stroke-carbon-path-bluestroke inline mr-1" /> Get the full
                  story
                </a>
              </div>
            </>
          )
        } else {
          return (
            <div className="flex flex-col bg-white rounded-2xl shadow-md text-left mx-4 md:mx-0 md:flex-row">
              <img
                alt="blog-thumbnail"
                src={item.thumbnail}
                className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none object-cover md:max-w-[30%]"
              />
              <div className="px-9 py-7">
                <div className="font-lato font-bold text-3xl mb-4">{item.title}</div>
                <div className="font-lato text-[#606060] text-sm pb-7 md:mb-12">
                  {itemDesc.slice(descStart + 3, descEnd)}
                </div>
                <a
                  className="font-lato font-bold text-lg text-carbon-path-bluestroke"
                  href={item.guid}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="inline">Read more</span>
                  <RightSmallArrowIcon className="stroke-carbon-path-bluestroke ml-1 inline" />
                </a>
              </div>
            </div>
          )
        }
      } catch (error) {
        console.log(error)
      }
    })
    setBlog(displayData)
  }, [])

  return (
    <>
      <div id="blogs" className="flex flex-col justify-between mt-16 mb-12 md:flex-row">
        <div className="mx-4 mb-8 bg-white rounded-2xl shadow-md text-left md:w-2/5 md:mx-0 md:mb-0 md:mr-7">
          {blog[0]}
        </div>

        <div className="flex flex-col justify-between gap-4 md:w-3/5">
          {blog[1]}
          {blog[2]}
        </div>
      </div>
    </>
  )
}

export default LandingPageBlogTile
