import React, { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import ActiveLink from '@@/common/ActiveLink'
import Image from '@@/common/image'
import { Row, Col } from 'antd'
const Header = () => {
  const [darkMode, setModeType] = useState('light')
  const [meauShow, setMeauShow] = useState(false)
  const changeDrakMode = () => {
    if (darkMode === 'light') {
      setModeType('dark')
      window.localStorage.setItem('theme', 'dark')
      document.querySelector('body')!.classList.add('dark-theme')
    } else {
      setModeType('light')
      window.localStorage.setItem('theme', 'light')
      document.querySelector('body')!.classList.remove('dark-theme')
    }
  }
  useEffect(() => {
    let mode = window.localStorage.getItem('theme') || 'light'
    setModeType(mode)
    if (mode === 'light') {
      document.querySelector('body')!.classList.remove('dark-theme')
    } else {
      document.querySelector('body')!.classList.add('dark-theme')
    }
  }, [])
  const doChangeMeauShow = () => {
    setMeauShow(true)
  }
  return (
    <div className="header">
      <div className="container">
        <Row justify="space-between">
          <Col span={24}>
            <Row justify="space-between">
              <Col xs={18} sm={8} md={12}>
                <span className="header-logo">
                  <Link href={{ pathname: '/' }}>
                    <span>乐橙</span>
                  </Link>
                </span>
                <span className="header-txt">实践出真知</span>
              </Col>
              <Col className="memu-div" xs={0} sm={16} md={12} >
                <Row justify='end' className="meau-content">
                  <Col span={4}>
                   <ActiveLink activeClassName="active"  href="/">
                      <span className="link-href">首页</span>
                    </ActiveLink>
                  </Col>
                  <Col span={4}>
                   <ActiveLink activeClassName="active"  href="/archives">
                      <span className="link-href">
                        归档
                      </span>
                   </ActiveLink>
                  </Col>
                  <Col span={4}  >
                    <ActiveLink activeClassName="active" href="/about">
                      <span className="link-href">关于</span>
                    </ActiveLink>
                  </Col>
                  <Col span={4}  >
                    <div className="dark-wrapper" onClick={changeDrakMode}>
                      <div className="dark-item" style={{ display: `${darkMode === 'dark' ? 'inline-block' : 'none'}` }}>
                        <Image alt="dark-sun-l" src="/images/common/dark-sun-l.svg" className="dark-sun-l" />
                      </div>
                      <div style={{ display: `${darkMode === 'light' ? 'inline-block' : 'none'}` }} className="dark-item">
                        <Image alt="dark-sun" src="/images/common/dark-sun.svg" className="dark-sun" />
                      </div>
                      <div style={{ display: `${darkMode === 'light' ? 'inline-block' : 'none'}` }} className="dark-item" >
                        <Image alt="dark-moon-l" src="/images/common/dark-moon-l.svg" className="dark-moon-l"  />
                      </div>
                      <div style={{ display: `${darkMode === 'dark' ? 'inline-block' : 'none'}` }} className="dark-item" >
                        <Image alt="dark-moon" src="/images/common/dark-moon.svg" className=" dark-moon" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={6} sm={0} md={0}>
                <div className="header-operation">
                  <div className="dark-wrapper" onClick={changeDrakMode}>
                    <div className="dark-item" style={{ display: `${darkMode === 'dark' ? 'inline-block' : 'none'}` }}>
                      <Image src="/images/common/dark-sun-l.svg" className="dark-sun-l" alt="dark-sun-l" />
                    </div>
                    <div style={{ display: `${darkMode === 'light' ? 'inline-block' : 'none'}` }} className="dark-item">
                      <Image src="/images/common/dark-sun.svg" className="dark-sun" alt="dark-sun" />
                    </div>
                    <div style={{ display: `${darkMode === 'light' ? 'inline-block' : 'none'}` }} className="dark-item" >
                      <Image src="/images/common/dark-moon-l.svg" className="dark-moon-l" alt="dark-moon-l" />
                    </div>
                    <div style={{ display: `${darkMode === 'dark' ? 'inline-block' : 'none'}` }} className="dark-item" >
                      <Image src="/images/common/dark-moon.svg" className="dark-moon" alt="dark-moon" />
                    </div>
                  </div>
                  <div className="meau-wrapper" onClick={doChangeMeauShow}>
                    <div className="iconmenu" style={{ display: `${darkMode === 'dark' ? 'inline-block' : 'none'}` }}>
                      <Image className="iconfont " src="/images/common/dark-meau-icon.svg"  alt="iconmenu"/>
                    </div>
                    <div className="iconmenu" style={{ display: `${darkMode === 'light' ? 'inline-block' : 'none'}` }}>
                      <Image className="iconfont " src="/images/common/light-meau-icon.svg" alt="iconmenu" />
                    </div>
                  </div>
                  <div className="meau-nav" style={{ display: meauShow ? 'flex' : 'none' }}>
                    <ul className="menu__inner">
                      <li>
                        <Link href="/"  >
                          <span className="link-href">首页</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/archives">
                          <span className="link-href">归档</span> 
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <span className="link-href">关于</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header
