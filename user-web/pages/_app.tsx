import App, { AppProps } from 'next/app'
import React, {useEffect} from 'react'
import '@/public/style/pages/comm.scss'
import Layout from '@@/common/Layout'
import NextNprogress from 'nextjs-progressbar'

function BlogApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    let theme = window.localStorage.getItem('theme')
    document.querySelector('body')!.classList.add(theme === 'dark' ? 'dark-theme' : 'light')
  },[])
  return (
    <>
      <Layout>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default BlogApp

