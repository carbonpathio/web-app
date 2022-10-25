import Script from 'next/script'
import React from 'react'
import Footer from '../../widgets/Footer'
import NavBar from '../../widgets/NavBar'
import Layout from '../Layout'

type Props = React.PropsWithChildren<Record<string, unknown>>

const BasicLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <Script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></Script>
      <NavBar />
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden tracking-wide">
        {children}
      </main>
      <Footer />
    </Layout>
  )
}

export default BasicLayout
