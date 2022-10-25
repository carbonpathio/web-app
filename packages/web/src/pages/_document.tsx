import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class CarbonPathDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="h_GqSHIQcfU-qmx6gWaCJIB8UtSt8mhR2FEZil-wBd8"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CarbonPathDocument
