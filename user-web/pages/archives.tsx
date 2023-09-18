import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, Select, Tag } from 'antd'
import axios from 'axios'
import 'highlight.js/styles/atom-one-dark.css'
import servicePath from '@/config/apiUrl'
import '@/public/style/pages/archives.module.scss'
import Banner from '@@/common/banner'
import Link from 'next/link'
function tagRender(props:any) {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event :any) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}
const Archives = (res: any) => {
  let  { articleLabels, articleTypes, articles } = res.data
  const [selectType, setSelectType] = useState(null)
  const [selectLabels, setSelectLabels] = useState([])
  const [searchContent, setSearchContent] = useState('')
  const [articlesData, setArticlesData] = useState(articles)
  const [selectOptionId, setSelectOptionId] = useState([])
  const [timeArticleData, setTimeArticleData] = useState<any>([])
  useEffect(() => {
    doDealTimeArticle(articles)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const doResetFilter = () => {
    setSelectType(null)
    setSelectLabels([])
    setSearchContent('')
    doDealTimeArticle(articles)
  }
  const onSelectType = (value :any, item:any) => {
    setSelectType(value)
    doFilterArticle('classify', item.id)
  }
  const onSelectLabels = (value:any, item:any) => {
    const labels = selectLabels.concat(value)
    const selectOptionIds = selectOptionId.concat(item.id)
    doFilterArticle('label', selectOptionIds)
    setSelectLabels(labels)
    setSelectOptionId(selectOptionIds)
  }
  const doFilterArticle = (type:any, keyInfo:any) => {
    const filterArticle = []
    if (type === 'search') {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].title.includes(keyInfo)) {
          filterArticle.push(articles[i])
        }
      }
      setSelectType(null)
      setSelectLabels([])
    }
    if (type === 'classify') {
      for (let i = 0; i < articles.length; i++) {
        const typeIds = articles[i].type_data.map((item: { id: any })=>{
          return item.id
        }) 
        if (typeIds.includes(keyInfo)) {
          filterArticle.push(articles[i])
        }
      }
      setSelectLabels([])
      setSearchContent('')
    }
    if (type === 'label') {
      for (let j = 0; j < articles.length; j++) {
        const includes = []
        for (let k = 0; k < articles[j].label_data.length; k++) {
          let haveInclude = keyInfo.includes(articles[j].label_data[k].id)
          includes.push(haveInclude)
        }
        let isAllInclude = includes.every((item) => !!item)
        if (isAllInclude && includes.length) {
          filterArticle.push(articles[j])
        }
      }
      setSearchContent('')
      setSelectType(null)
    }
    doDealTimeArticle(filterArticle)
    setArticlesData(filterArticle)
  }
  const doDealTimeArticle = (data: string | any[]) => {
    const years: any[] = [], aritcleYearsData: any = {}, formatYearsArticleData = []
    for (let i = 0; i < data.length; i++) {
      let year = data[i].add_time.slice(0, 4)
      if (!years.includes(year)) {
        years.push(year)
        aritcleYearsData[year] = []
      }
      aritcleYearsData[year].push(data[i])
    }
    for (let i = 0; i < years.length; i++) {
      formatYearsArticleData.push({ year: years[i], items: aritcleYearsData[years[i]] })
    }
    setTimeArticleData(formatYearsArticleData)
  }
  const onDeselectLabels = (value: any) => {
    const labels = selectLabels.filter(item => {
      return item !== value
    })
    setSelectLabels(labels)
  }
  const onChangeSearchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value)
    doFilterArticle('search', e.target.value)
  }
  return (
    <>
      <Head>
        <title>归档</title>
        <meta name='description' content='归档'></meta>
        <link rel='icon' href='../static/favicon.ico' type='image/x-icon' />
      </Head>
      <Banner />
      <Row className="comm-main archives-content" justify="center">
        <Col span={24}>
          <div className="search-box" >
            <div className="search-input-box">
              <input className="search-input" value={searchContent} onChange={e => { onChangeSearchContent(e) }} type="text" placeholder="搜索文章..." />
              <div className="clear-btn" onClick={doResetFilter}>
                <span role="img" aria-label="redo" className="anticon anticon-redo">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="redo" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-9.3 9.3-19.1 18-29.3 26L668.2 724a8 8 0 00-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 .8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z">
                    </path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="search-class-tag-box">
              <Select
                placeholder="请选择文章标签"
                bordered={false}
                showSearch
                dropdownClassName="theme-color-1"
                className="theme-color-1"
                style={{ width: '100%' }}
                value={selectType}
                fieldNames={{ value: 'name',}}
                options={articleTypes}
                onSelect={onSelectType}
              />
              <div className="blank"></div>
              <Select
                mode="multiple"
                bordered={false}
                className="theme-color-1"
                dropdownClassName="theme-color-1"
                placeholder="请选择文章标签"
                tagRender={tagRender}
                value={selectLabels}
                style={{ width: '100%' }}
                onSelect={onSelectLabels}
                onDeselect={onDeselectLabels}
                // , key: 'id'
                fieldNames={{ value: 'name' }}
                options={articleLabels}
              />
            </div>
          </div>
        </Col>
        <Col span={24} >
          {timeArticleData.map((itemYear: any) => {
            return (
              <div className="archive-group" key={itemYear.year}>
                <div className="archive-header">
                  <h3>{itemYear.year}</h3>
                </div>
                <div className="archive-list">
                  <Row >
                    {itemYear.items.map((item: { id: React.Key | null | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; add_time: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; cover: any }) => {
                      return (
                        <Col key={item.id} xs={24} sm={12} md={12} className="archive-item">
                          <Col span={20} className="item-inner">
                            <Link href={`/details/${item.id}`}>
                              <span className="item-title text-sm" >{item.title}</span>
                            </Link>
                            <span className="article-date">{item.add_time}</span>
                          </Col>
                          <Col span={4} className="item-thumb col-3" style={{ backgroundImage: `url(${item.cover})` }}></Col>
                        </Col>
                      )
                    })}
                  </Row>
                </div>
              </div>
            )
          })}
        </Col>
      </Row>
    </>
  )
}
export async function getServerSideProps(ctx:any) {
  const res = await axios(`${servicePath.getArchivesData}`)
  return {
    props: {
      data:res.data.data
    },
  }
}
export default Archives
