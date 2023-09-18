import {useRef} from 'react'
import NextImage from 'next/image'
import React from 'react'
import imageHelper from '../../../utils/imgHelper'
import Env from '../../../utils/env'
const BLUR_COLOR = [2, 129, 210]
const Image = (props:any) =>{
  const {width, height, layout='fill',unoptimized = false, src , blurColor = BLUR_COLOR, onImgeloaded, alt = 'pic',placeholder = 'blur', limitType = 'limitW'} = props
  const imageEle = useRef(null)
  let url  = props.src
  const imageLoader = (props:any) => {
    if(imageEle.current){
      let imageWidth = (imageEle.current as any).offsetWidth
      let imageHeight = (imageEle.current as any).offsetHeight
      let suitImageWidth = imageWidth * (Env.devicePixelRatio + 1)
      let suitImageHeight = imageHeight * (Env.devicePixelRatio + 1)
      if(limitType === 'limitW') {
        url = imageHelper.getImageUrlLimitWidth(props.src, suitImageWidth)
      }
      if(limitType === 'limitH') {
        url = imageHelper.getImageUrlLimitHeight(props.src, suitImageHeight)
      }
      if(limitType === 'limitT') {
        url = imageHelper.getThumbImageUrlSquare(props.src, suitImageWidth)
      }
    }
    // 添加width消除next图片警告
    if(url.includes('?')){
      url += `&width=${props.width}`
    } else {
      url += `?width=${props.width}`
    }
    return url
  }
  return <>
   <div ref={imageEle}>
      <NextImage 
        fill={layout} 
        height={height}
        width={width} 
        onLoadingComplete={onImgeloaded} 
        unoptimized={unoptimized}
        src={src}
        data-src={src}
        placeholder={placeholder}
        blurDataURL={imageHelper.rgbDataURL.apply(null,blurColor)} 
        loader={imageLoader}  
        alt={alt} 
      />
   </div>
  </>
}
export default Image