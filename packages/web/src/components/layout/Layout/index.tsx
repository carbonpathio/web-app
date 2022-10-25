import Head from 'next/head'

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <Head>
        <title>CarbonPath</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1" />
        <link rel="canonical" href="https://www.carbonpath.io/" />

        <meta name="title" content="CarbonPath" />
        <meta property="og:title" content="CarbonPath" />

        <meta
          name="description"
          content="CarbonPath is generating a new type of carbon credit by shutting down oil and gas wells, resulting in an accessible, transparent, and verified token."
        />
        <meta
          property="og:description"
          content="CarbonPath is generating a new type of carbon credit by shutting down oil and gas wells, resulting in an accessible, transparent, and verified token."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.carbonpath.io/" />

        <meta name="image" content="https://www.carbonpath.io/images/landing-pic-3.png" />
        <meta property="og:image" content="https://www.carbonpath.io/images/landing-pic-3.png" />
        <meta property="og:image:alt" content="Forest view under sunset" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CarbonPath_io" />
        <meta name="twitter:creator" content="@CarbonPath_io" />
      </Head>
      {children}
    </>
  )
}

export default Layout
