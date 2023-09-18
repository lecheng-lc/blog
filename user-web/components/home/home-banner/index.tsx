import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import BannerItem from '../banner-item'
const Author = (props:any) => {
  const listData = props.articleTopList
  return (
    <div className="banner-wrapper">
      <Row>
        <Col span={24}>
          <div className="banner-content">
            <Row gutter={[12, 12]} >
              <Col xs={12} sm={12} md={12}>
                <BannerItem  data={listData[0]}/>
              </Col>
              <Col xs={12} sm={12} md={12}>
                <Row gutter={[12, 8]}>
                  <Col xs={12} sm={12} md={12}>
                   <BannerItem data={listData[1]}/>
                  </Col>
                  <Col xs={12} sm={12} md={12}>
                   <BannerItem data={listData[2]}/>
                  </Col>
                  <Col xs={12} sm={12} md={12}>
                   <BannerItem data={listData[3]}/>
                  </Col>
                  <Col xs={12} sm={12} md={12}>
                   <BannerItem data={listData[4]} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}



export default Author