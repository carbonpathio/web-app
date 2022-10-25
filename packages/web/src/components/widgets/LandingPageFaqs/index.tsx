import { useStore } from '@carbonpath/shared/lib/stores'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useAsync } from 'react-use'
import LinkMoreIcon from '../../../assets/icons/LinkMoreIcon'
import Button from '../../atoms/Button'

const LandingFaqs: React.FC<React.PropsWithChildren> = () => {
  const [loading, setLoading] = useState(false)
  const [faqList, setFaqList] = useState([])
  const [faqToggle, setFaqToggle] = useState(new Array(faqList.length).fill(false))

  const { faqStore } = useStore()

  const handleFaqClick = (index) => {
    let ret = faqToggle
    ret[index] = !ret[index]
    setFaqToggle([...ret])
  }

  useAsync(async () => {
    setLoading(true)
    await faqStore.fetchFaqs()
    const newFaqs: any = []
    faqStore.faqs.forEach((newFaq) => {
      newFaqs.push(newFaq.$)
    })
    setFaqList(newFaqs)
    setLoading(false)
  }, [faqStore])

  return (
    <div className="accordion px-4 md:px-0">
      {loading ? (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        faqList.map((item, index) =>
          index < 4 && (
          <div className="pt-4" key={`faq-item-${index}`}>
            <h2 className="accordion-header mb-0" id={`faq-header-${index}`}>
              <button
                className={classNames(
                  'accordion-button accordion-button-faq flex items-center',
                  'w-full py-4 md:pt-[24px] md:pb-[28px] pr-[100px] pl-6 md:pl-[60px] shadow-sm',
                  'text-base md:text-lg text-carbon-path-bluestroke font-bold font-lato text-left',
                  'bg-white rounded-2xl transition focus:outline-none',
                  {
                    collapsed: !faqToggle[index],
                  }
                )}
                type="button"
                id={`faq-${index}`}
                onClick={() => {
                  handleFaqClick(index)
                }}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`faq-body-${index}`}
              className={classNames('accordion-collapse collapse', {
                show: faqToggle[index],
              })}
            >
              <div className="accordion-body bg-white text-[#606060] font-lato font-medium text-base md:text-lg rounded-b-2xl shadow-md pt-6 pb-7 px-6 md:px-[60px] md:pt-10 md:pb-12">
                {item.answer}
              </div>
            </div>
          </div>
        ))
      )}
      <div className="w-full flex justify-center md:w-1/2 md:mx-auto">
        <Button
          href={
            'https://carbonpath.notion.site/7b76de265c1a4a5a8573601bfc175d17?v=eff2c61cef984a939c0b8cf9775f3552'
          }
          variant="cyan"
          className="w-full md:w-auto rounded-xl mt-[60px]"
          target="_blank"
        >
          <span className="font-montserrat font-bold text-carbon-path-bluestroke mr-2">
            READ MORE
          </span>
          <LinkMoreIcon />
        </Button>
      </div>
    </div>
  )
}

export default LandingFaqs
