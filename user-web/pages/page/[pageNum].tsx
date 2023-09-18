import React, { useState,useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { PAGE_SIZE } from '@/utils/constant'
import { Row, Col } from 'antd'
import axios from 'axios'
import HomeBanner from '@@/home/home-banner'
import '@/public/style/pages/index.scss'
import Pagination from '@@/home/pagination'
import 'highlight.js/styles/monokai-sublime.css'
import servicePath from '@/config/apiUrl'
import {getAllPages} from '@/lib/post'  
import Image from '@@/common/image'
const Home = (res: { data: NextPageContext }) => {
  let resData: any = res.data
  const router = useRouter()
  const pageNum = Number(router.query.pageNum || 1)
  const articleTotal = resData.articleTotalNum
  console.log('articleTotal', articleTotal)
  const [mylist] = useState(resData.articleList)
  const [articleTopList] = useState(resData.articleTopList)
  return (
    <>
      <Head>
        <title>首页 | 乐橙-Blog</title>
        <meta name="description" content="首页 | 乐橙-Blog"></meta>
        <link rel="icon" href="../static/favicon.ico" type="image/x-icon" />
      </Head>
      <Row className="comm-main" justify="center">
        <Col span={24}>
          {articleTopList.length ? <HomeBanner articleTopList={articleTopList} /> : null}
          <div style={{ marginTop: '20px' }} className="article-list-wrapper">
            <div className="article-list">
              {mylist.map((item: any) => {
                return (
                  <div key={item.id} className="list-detail">
                    <Row gutter={[16, 0]}>
                      <Col span={18} className="article-content">
                        <div className="article-body">
                          <div className="list-title">
                            <Link href={{ pathname: `/details/${item.id}` }} >
                              <span>{item.title}</span>
                            </Link>
                          </div>
                          <Col className="list-content" xs={0} sm={0} md={24} lg={24} >
                            {item.introduce}
                          </Col>
                        </div>
                        <div className="article-footer">
                          <div className="article-metadata">
                            <span className="article-tags">
                              {
                                item.classify.map((itemTag: any) => {
                                  return <span key={itemTag.id} >{itemTag.name}</span>
                                })
                              }
                            </span>
                            <i className="px-1">•</i>
                            <span className="article-date">{item.manyTimePublish}</span>
                          </div>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="media-wrapper" style={{display: item.cover ? 'block' : 'none'}}>
                          <Image layout="fill"  src={item.cover}  alt="loading" />
                        </div>
                      </Col>
                    </Row>
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination page={pageNum} total={articleTotal} size={PAGE_SIZE} />
        </Col>
      </Row>
    </>
  )
}
// export async function getStaticPaths() {
//   const articlePages = await getAllPages()
//   return {
//     paths: articlePages,
//     fallback: false
//   }
// }
// export async function getStaticProps(ctx:any) {
//   const moreParams = {
//     page: ctx.params.pageNum || 1,
//     size: PAGE_SIZE
//   }
//   const res = await axios(servicePath.getArticleList, { params: moreParams })
//   return {
//     props: {
//       data: res.data.data
//     }
//   }
// }
export async function getServerSideProps(context:any) {
     const moreParams = {
        page: context.params.pageNum || 1,
        size: PAGE_SIZE
      }
      const res = await axios(servicePath.getArticleList, { params: moreParams })
      return {
        props: {
          data: res.data.data
        }
      }
}
export default Home
