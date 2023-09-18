import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import Link from 'next/link'
import gfm from '@bytemd/plugin-gfm'
import math from '@bytemd/plugin-math'
import gemoji from '@bytemd/plugin-gemoji'
import hightlight from '@bytemd/plugin-highlight-ssr'
import 'highlight.js/styles/atom-one-dark.css'
import { Viewer } from '@bytemd/react'
import './index.module.scss'
import NextImage from '@@/common/image'
import ImagePreview from '@@/common/image-preview'
import { useRouter } from 'next/router'
import dayjs from '@/lib/dayTime'
import axios from 'axios'
import servicePath from '@/config/apiUrl'
const DetailsContent = (res: any) => {
  const { articleData, friendsChain, recentArticleData, preArticleData, nextArticleData } = res.data
  const [imgPreData, setImgPreData] = useState<{ source: string }[]>([])
  const [showIndex, setShowIndex] = useState(0)
  const [viewCount, setViewCount] = useState(0)
  const article_content = articleData.article_content
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [articleCatalog, setArticleCatalog] = useState({ maxTitleIndex: 0, items: [] })
  const articleCata = useRef<HTMLDivElement>(null)
  const [cataDisTop, setCataDisTop] = useState(0)
  const markDownContentEl = useRef(null)
  const Router = useRouter()
  useEffect(() => {
    const imgList = document.querySelectorAll<HTMLElement>('.post-content img')
    const newImgList = []
    for (let i = 0; i < imgList.length; i++) {
      imgList[i].onclick = () => {
        setShowIndex(i)
        setModalIsOpen(true)
      }
      newImgList.push({ source: imgList[i].getAttribute('data-src') || '' })
    }
    setImgPreData(newImgList)
    if(articleData.title) {
      const currentEl = markDownContentEl.current!
      doDealArticle(currentEl)
      const cataEle = articleCata.current!
      const initCataDisTop = cataEle.getBoundingClientRect().top
      setCataDisTop(initCataDisTop)
    }
    if(Router.query.id) {
      axios(`${servicePath.addArticleViews}/${Router.query.id}`).then(res=>{
        const resData = res.data
        setViewCount(resData.data.viewCount)
      }).catch(err=>{
        console.log(err)
      })
    }
  }, [])
  const scrollEventListener = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (articleCata.current) {
      if (scrollTop > cataDisTop) {
        articleCata.current.classList.add('fixed')
      } else {
        articleCata.current.classList.remove('fixed')
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollEventListener)
    return () => { window.removeEventListener('scroll', scrollEventListener) }
  }, [cataDisTop])
  const onChangeModal = () => {
    setModalIsOpen(false)
  }
  const doDealArticle = (element: HTMLElement) => {
    if (!element) return
    let h1Ele = element.querySelectorAll('h1')
    let h2Ele = element.querySelectorAll('h2')
    let h3Ele = element.querySelectorAll('h3')
    let h4Ele = element.querySelectorAll('h4')
    let h5Ele = element.querySelectorAll('h5')
    let h6Ele = element.querySelectorAll('h6')
    let maxTitleIndex = 0
    switch (true) {
      case !!h1Ele.length:
        maxTitleIndex = 6
        break
      case !!h2Ele.length:
        maxTitleIndex = 5
        break
      case !!h3Ele.length:
        maxTitleIndex = 4
        break
      case !!h4Ele.length:
        maxTitleIndex = 3
        break
      case !!h5Ele.length:
        maxTitleIndex = 2
        break
      case !!h6Ele.length:
        maxTitleIndex = 1
        break
    }
    const titlesEles = element.querySelectorAll('h1,h2,h3,h4,h5,h6')
    for (let i = 0; i < titlesEles.length; i++) {
      titlesEles[i].id = (titlesEles[i] as HTMLElement).innerText
    }
    const copyArticleCatalogObj:any = {
      maxTitleIndex: maxTitleIndex,
      items: []
    }
    for (let i = 0; i < titlesEles.length; i++) {
      const articleCatalog = {
        level: 0,
        nodeName: '',
        text: '',
        id: i
      }
      switch (true) {
        case titlesEles[i].nodeName.toLowerCase() === 'h1':
          articleCatalog.level = 6
          break
        case titlesEles[i].nodeName.toLowerCase() === 'h2':
          articleCatalog.level = 5
          break
        case titlesEles[i].nodeName.toLowerCase() === 'h3':
          articleCatalog.level = 4
          break
        case titlesEles[i].nodeName.toLowerCase() === 'h4':
          articleCatalog.level = 3
          break
        case titlesEles[i].nodeName.toLowerCase() === 'h5':
          articleCatalog.level = 2
          break
        case titlesEles[i].nodeName.toLowerCase() === 'h6':
          articleCatalog.level = 1
          break
      }
      articleCatalog.nodeName = titlesEles[i].nodeName.toLowerCase()
      articleCatalog.text = (titlesEles[i] as HTMLElement).innerText
      copyArticleCatalogObj.items.push(articleCatalog)
    }
    for (let i = 0; i < copyArticleCatalogObj.items.length; i++) {
      if (copyArticleCatalogObj.items[i].hasOwnProperty('paddingLeft')) continue
      let currentLevel = copyArticleCatalogObj.items[i].level
      if (copyArticleCatalogObj.items[i].level === copyArticleCatalogObj.maxTitleIndex) {
        copyArticleCatalogObj.items[i].paddingLeft = ''
      }
      let haveMiddleTitleArr:any[] = []
      copyArticleCatalogObj.items.forEach((item: { level: number }) => {
        if (copyArticleCatalogObj.maxTitleIndex > copyArticleCatalogObj.items[i].level && item.level > copyArticleCatalogObj.items[i].level && !haveMiddleTitleArr.includes(item.level)) {
          haveMiddleTitleArr.push(item.level)
        }
      })
      if (copyArticleCatalogObj.maxTitleIndex > copyArticleCatalogObj.items[i].level && haveMiddleTitleArr.length === 1) {
        copyArticleCatalogObj.items[i].paddingLeft = 16
      }
      if (i > 0 && copyArticleCatalogObj.items[i].level < copyArticleCatalogObj.items[i - 1].level) {
        copyArticleCatalogObj.items[i].paddingLeft = copyArticleCatalogObj.items[i - 1].paddingLeft + 16
      }
      if (i > 0 && copyArticleCatalogObj.items[i].level === copyArticleCatalogObj.items[i - 1].level) {
        copyArticleCatalogObj.items[i].paddingLeft = copyArticleCatalogObj.items[i - 1].paddingLeft
      }

      // 分段处理
      const nextLevelGather = []
      for (let j = i + 1; j < copyArticleCatalogObj.items.length; j++) {
        let nextLevel = copyArticleCatalogObj.items[j].level
        if (nextLevel === currentLevel) {
          break
        } else {
          nextLevelGather.push({ index: j, level: nextLevel })
        }
      }
      // if (i === 2) {
      //   console.log(nextLevelGather)
      // }
      let isNeedDeal = nextLevelGather.every(item => {
        return item.level < currentLevel
      })
      if (isNeedDeal) {
        let sectionMiddleArr:any[] = []
        nextLevelGather.forEach(item => {
          if (!sectionMiddleArr.includes(item.level)) {
            sectionMiddleArr.push(item.level)
          }
        })
        sectionMiddleArr.sort((a, b) => b - a)
        // if (i === 2) {
        //   console.log('sectionMiddleArr', sectionMiddleArr)
        // }
        // if (i === 2) {
        //   console.log('nextLevelGather', nextLevelGather)
        // }
        let middleLength = sectionMiddleArr.length
        for (let w = 0; w < sectionMiddleArr.length; w++) {
          for (let y = 0; y < nextLevelGather.length; y++) {
            if (sectionMiddleArr[w] === copyArticleCatalogObj.items[nextLevelGather[y].index].level) {
              // if (i === 2) {
              //   console.log('copyArticleCatalogObj.items[i].paddingLeft ' + copyArticleCatalogObj.items[i].paddingLeft + (w + 1) * 16)
              // }
              copyArticleCatalogObj.items[nextLevelGather[y].index].paddingLeft = copyArticleCatalogObj.items[i].paddingLeft + (w + 1) * 16
            }
          }
        }
        if (i === 2) {
          // console.log('sectionMiddleArr', sectionMiddleArr)
        }
      }
    }
    console.log(copyArticleCatalogObj,'---')
    setArticleCatalog(copyArticleCatalogObj)
  }
  return (
      <>
      <Head>
        <title>{articleData.title}</title>
        <meta name='description' content={articleData.title}></meta>
        <link rel='icon' href='../static/favicon.ico' type='image/x-icon' />
      </Head>
      <Row gutter={[16, 16]} className="detail-content" justify="center">
        <Col xs={24} sm={24} md={16} lg={18}>
          <div className="post-main">
            <div className="post-header">
              <h1 className="post-title">{articleData.title}</h1>
              <div className="post-meta mt-3">
                {articleData.classify.length ? <span className="item">
                  {
                    articleData.classify.map((item: any) => {
                      return <span key={item.id}>{item.name}</span>
                    })
                  }
                </span> : null}
                <span className="article-date item">{dayjs(articleData.add_time).fromNow()}</span>
                <span className="article-readtime item">
                  <span>{articleData.article_content.length} 字</span>
                </span>
              </div>
            </div>
            <div className="post-content">
              <div className="post-feature mb-3">
                <div className="post-cover">
                  <NextImage layout="fill" src={articleData.cover} className="post-cover" alt="post-cover" />
                </div>
              </div>
              <div className="post-inner" ref={markDownContentEl}>
                <Viewer
                  value={articleData.article_content}
                  plugins={[gfm(), math(), gemoji(), hightlight()]}
                />
              </div>
              <Row className="friends-list">
                {friendsChain && friendsChain.length ? friendsChain.map((item: any) => {
                  return <Col key={item.id} span={12} className="archive-item ">
                    <div className="item-thumb item-avatar">
                      <NextImage layout="fill" src={item.avatar}/>
                    </div>
                    <div className="item-inner">
                      <Link href={item.address}>
                          <span className="item-title text-sm" >{item.name}</span>
                      </Link>
                      <span className="article-date text-xs">
                        {item.desc}
                      </span>
                    </div>
                  </Col>
                }) : null}
              </Row>
            </div>
            <div className="post-navigation"></div>
            <div className={`post-footer ${preArticleData || nextArticleData ? '' : 'no-next'}`}>
              <span className="item flex-fill" style={{display: viewCount > 0 ? 'block' : 'none'}}>
                阅读&nbsp;
                <span id="twikoo_visitors">{viewCount? viewCount : '-'}</span>
              </span>
              {/* @TODO  */}
              {/* <a href="#twikoo">
                <span className="item">
                  评论&nbsp;
                  <span id="twikoo_count">1</span>
                </span>
              </a> */}
            </div>
            {preArticleData || nextArticleData ? <div className="post-navigation" >
              <div className="navigation-list">
                {
                  preArticleData ? <Link href={`/details/${preArticleData.id}`}  passHref >
                    <div className="post-card row">
                      <Col span={18} className="card-content col-8 col-md-9">
                        <div className="card-body">
                          <h3>
                              <span className="title">{preArticleData.title}</span>
                          </h3>
                        </div>
                        <div className="card-footer text-xs">
                          <div className="item">
                            <span>上一篇</span>
                          </div>
                          <div className="item">
                            {preArticleData.addTimeFormat}
                          </div>
                        </div>
                      </Col>
                      <Col span={6} className="card-thumb">
                        <div className="thumb">
                          <NextImage layout="fill" src={preArticleData.cover}  alt="post-cover" />
                        </div>
                      </Col>
                    </div></Link> : null}
                {
                  nextArticleData ? <Link href={`/details/${nextArticleData.id}`} passHref>
                    <div className="post-card row">
                      <Col span={18} className="card-content">
                        <div className="card-body">
                          <h3><span className="title" >{nextArticleData.title}</span></h3>
                        </div>
                        <div className="card-footer text-xs">
                          <div className="item">
                            <span>下一篇</span>
                          </div>
                          <div className="item">
                            {nextArticleData.addTimeFormat}
                          </div>
                        </div>
                      </Col>
                      <Col span={6} className="card-thumb">
                        <div className="thumb">
                          {nextArticleData.cover ? <NextImage layout="fill" src={nextArticleData.cover}  alt="post-cover" /> : null}
                        </div>
                      </Col>
                    </div></Link> : null
                }
              </div>
            </div> : null}

            <div className="post-comments">
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={8} lg={6}>
          <div className="post-sidebar">
            {
              recentArticleData.length ? <div className="post-recent sidebar" >
                <div className="sidebar-title">最新文章</div>
                <div className="sidebar-content">
                  <ul className="recent-list">
                    {recentArticleData.map((item:any) => {
                      return <li key={item.id} className="recent-item">
                        <div className="recent-thumb">
                          <NextImage layout="fill" src={item.cover} className="post-cover" alt="post-cover" />
                        </div>
                        <div className="recent-content">
                        {/* href={`/details/${item.id}`} */}
                          <span className="recent-link">{item.title}</span>
                          <span className="recent-date">
                            {item.addTimeFormat}
                          </span>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div> : null
            }
            <div className="post-toc sidebar" ref={articleCata}>
              {articleCatalog.items.length ? <div className="sidebar-title" >文章目录</div> : null}
              <div className="sidebar-content">
                <ul className="toc-h2">
                  {articleCatalog.items.map((item:any, index) => {
                    return <li key={item.id} style={{ paddingLeft: `${item.paddingLeft}px` }}>
                      <span className="cat-item" >{item.text}</span>
                      {/* href={`#${item.text}`} */}
                      <span className="cat-num"># {index + 1} </span>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ImagePreview list={imgPreData} modalIsOpen={modalIsOpen} changeModalStatus={onChangeModal} showIndex={showIndex} />
    </>
  )
}
export default DetailsContent

