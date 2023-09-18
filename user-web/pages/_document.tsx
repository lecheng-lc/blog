import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head >
          <link rel="manifest" href="/manifest.json" />
          <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
          <meta name="baidu-site-verification" content="code-pR8vCYknZ4" />
        </Head>
        <body>
          {/*  提前设置状态 */}
          <script>
            const themeType = window.localStorage.getItem(`theme`);
            if(themeType === `dark`) document.body.classList.add(`dark-theme`);
          </script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument