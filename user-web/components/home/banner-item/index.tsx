import React from 'react'
import './index.scss'
import Link from 'next/link'
import Image from '@@/common/image'
const Banner = (props:any) => {
  const data = props.data
  return (
    <div className="banner-item">
      <Link href={`/details/${data.id}`} passHref>
        <div className="link-article">
          <div className="img-wrapper">
            <Image objectFit="cover" alt="loading"  width="100" height="70" layout="responsive" src={data.cover} />
          </div>
          <div className="cover-curtain"></div>
          <div className="title-wrapper">
            <h4 className="title">{data.title}</h4>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Banner