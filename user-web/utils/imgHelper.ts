const keyStr:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const BUCKET_lECHENG_SUFFIX = 'lecheng-static'
const BUCKET_IMAGE01_BASE_PATH = 'http://lecheng-static.oss-cn-beijing.aliyuncs.com'
const THUMB_DOMAIN = 'lechengweb.com'
const IMAGE_ALIYUN = 'aliyuncs.com'
const OSS_IMAGE_PROCESS = 'x-oss-process=image'
const WEBP_SUFFIX = '.webp'
const PNG_SUFFIX = '.png'
const SVG_SUFFIX = '.svg'
import Env from'./env'
const triplet = (e1:number, e2:number, e3:number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

  /**
  * 自适应图片数据结构
  */
 export interface AdaptiveImage {
   '2x'?: '';
   '3x'?: '';
   '4x'?: '';
 }
 
 /**
  * 根据屏幕宽度自适应选择2x、3x、4x的图片，主要用于png图片，png图片使用OSS缩放大概率会变大
  * @param obj
  */
 function adaptiveImageSize(obj: AdaptiveImage) {
   let url = ''
   if (Env.screenWidth < 390) {
     url = obj['2x'] || ''
   } else if (Env.screenWidth < 430) {
     url = obj['3x'] || ''
   } else {
     url = obj['4x'] || ''
   }
   return url
 }
 
 /**
  * 获取Oss图片链接
  * @param {*} url 
  */
 function getOssImageUrl(url: string) {
   if (url.indexOf('thumb.') > 0) {
     const arr = url.split('/')
     const objectPath = arr[1] ? arr[1] : ''
     const arr1 = objectPath.split('=')
     url = BUCKET_IMAGE01_BASE_PATH + '/' + arr1[0]
   }
   return url
 }
 
 /**
  * 获取图片原链接
  * @param {*} url 
  */
 function getOriginalImageUrl(url: string) {
   const arr = getOssImageUrl(url).split('?')
   return arr[0]
 }
 
 /**
  * 检查图片链接是否可以进行oss图片处理
  * @param url
  */
 function checkUrlCanProcess(url: string) {
   if ((url.indexOf(BUCKET_lECHENG_SUFFIX) > 0 || url.indexOf(IMAGE_ALIYUN) > 0) && url.indexOf(THUMB_DOMAIN) == -1) {
     if (url.indexOf(PNG_SUFFIX) > 0 && !Env.canUseWebp) {
       return false
     }
     if (url.indexOf(SVG_SUFFIX) > 0) {
       return false
     }
     return true
   }
   return false
 }
 
 /**
  * 更多图片处理
  * @param url
  */
 function convertMore(url: string) {
   const convertWebp: boolean = Env.canUseWebp
   if (convertWebp) {
     if (url.indexOf(WEBP_SUFFIX) < 0) {
       url += '/format,webp'
     }
   } else {
     if (url.indexOf(WEBP_SUFFIX) > 0) {
       url += '/format,jpg'
     } else if (url.indexOf(PNG_SUFFIX) > 0) {
       url += '/format,jpg'
     }
   }
   if (url.indexOf('jpg') > 0 && !convertWebp) {
     url += '/interlace,1'
   }
   url = url.replace('http://', 'https://')
   return url
 }
 
 /**
  * 限制宽度，主要用在移动端详情页
  * @param {*} url 
  * @param {*} width 
  * @param {*} keepProcess
  */
 function getImageUrlLimitWidth(url: string | AdaptiveImage, width: any, keepProcess: boolean = false) {
   if (!url) {
     return ''
   }
   if (typeof url !== 'string') {
     url = adaptiveImageSize(url)
     if (!Env.canUseWebp) {
       return url
     }
   }
   const videoCover = filterVideoCover(url, width)
   if (videoCover) {
     return videoCover
   }
   width = parseInt(width)
   if (!checkUrlCanProcess(url)) {
     return url
   }
   const process = `/resize,m_lfit,w_${width}`
   if (url.indexOf(OSS_IMAGE_PROCESS) > 0 && keepProcess) {
     return convertMore(`${url}${process}`)
   }
   url = getOriginalImageUrl(url)
   url += `?${OSS_IMAGE_PROCESS}${process}`
   return convertMore(url)
 }
 
 /**
  * 限制短边，主要用在移动端缩略图
  * @param {*} url 
  * @param {*} width 
  * @param {*} keepProcess 
  */
 function getImageUrlLimitShort(url: string | AdaptiveImage, width: any, keepProcess: boolean = false) {
   if (!url) {
     return ''
   }
   if (typeof url !== 'string') {
     url = adaptiveImageSize(url)
     if (!Env.canUseWebp) {
       return url
     }
   }
   const videoCover = filterVideoCover(url, width)
   if (videoCover) {
     return videoCover
   }
  if (!checkUrlCanProcess(url)) {
     return url
   }
   width = parseInt(width)
   const process = `/resize,m_fill,s_${width}`
   if (url.indexOf(OSS_IMAGE_PROCESS) > 0 && keepProcess) {
     return convertMore(`${url}${process}`)
   }
   url = getOriginalImageUrl(url)
   url += `?${OSS_IMAGE_PROCESS}${process}`
   return convertMore(url)
 }
 
 /**
  * 只限制高度
  * @param {*} url 
  * @param {*} height 
  * @param {*} keepProcess 
  */
 function getImageUrlLimitHeight(url: string | AdaptiveImage, height: any, keepProcess: boolean = false) {
   if (!url) {
     return ''
   }
   if (typeof url !== 'string') {
     url = adaptiveImageSize(url)
     if (!Env.canUseWebp) {
       return url
     }
   }
   const videoCover = filterVideoCover(url, 0, height)
   if (videoCover) {
     return videoCover
   }
   height = parseInt(height)
   if (!checkUrlCanProcess(url)) {
     return url
   }
   const process = `/resize,m_lfit,h_${height}`
   if (url.indexOf(OSS_IMAGE_PROCESS) > 0 && keepProcess) {
     return convertMore(`${url}${process}`)
   }
   url = getOriginalImageUrl(url)
   url += `?${OSS_IMAGE_PROCESS}${process}`
   return convertMore(url)
 }
 
 /**
  * 正方形缩略图，主要用作不要放大的预览图
  * @param {*} url 
  * @param {*} size 
  * @param {*} keepProcess 
  */
 function getThumbImageUrlSquare(url: string | AdaptiveImage, size: any, keepProcess: boolean = false) {
   if (!url) {
     return ''
   }
   if (typeof url !== 'string') {
     url = adaptiveImageSize(url)
     if (!Env.canUseWebp) {
       return url
     }
   }
   const videoCover = filterVideoCover(url, size, 0)
   if (videoCover) {
     return videoCover
   }
   size = parseInt(size)
   if (!checkUrlCanProcess(url)) {
     return url
   }
   const process = `/resize,m_mfit,h_${size},w_${size}`
   if (url.indexOf(OSS_IMAGE_PROCESS) > 0 && keepProcess) {
     return convertMore(`${url}${process}`)
   }
   url = getOriginalImageUrl(url)
   url += `?${OSS_IMAGE_PROCESS}${process}`
   return convertMore(url)
 }
 
 /**
  * 处理视频封面图
  * @param url 
  * @param width 
  * @param height 
  */
 function filterVideoCover(url: string, width: any = 0, height: any = 0) {
   width = parseInt(width)
   height = parseInt(height)
   const arr = url.split('?')
   let params = arr.length > 1 ? arr[1] : ''
   if (params.indexOf('x-oss-process=video/snapshot') >= 0) {
     if (width > 0) {
       if (params.indexOf(',w_') > 0) {
         params.replace(/,w_\d+/img, `,w_${width}`)
       } else {
         params += `,w_${width}`
       }
     } else {
       params.replace(/,w_\d+/img, '')
     }
     if (height > 0) {
       if (params.indexOf(',h_') > 0) {
         params.replace(/,h_\d+/img, `,h_${height}`)
       } else {
         params += `,h_${height}`
       }
     } else {
       params.replace(/,h_\d+/img, '')
     }
     return arr[0] + '?' + params
   }
   return ''
 }
 
 /**
  * 获取视频封面缩略图
  * @param url 
  * @param width 
  */
 function getVideoCoverLimitWidth(url: string, width: any) {
   return getImageUrlLimitWidth(url, width)
 }
 
 /**
  * 获取视频封面缩略图
  * @param url 
  * @param width 
  * @param height
  */
 function getVideoCoverWithSize(url: string, width: any = 0, height: any = 0) {
   return filterVideoCover(url, width, height)
 }
/**
 * 返回颜色蒙版
 * @param r 
 * @param g 
 * @param b 
 * @returns 
 */
const rgbDataURL = (r:number, g:number, b:number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`


export default {
  rgbDataURL,
  getVideoCoverLimitWidth,
  getImageUrlLimitWidth,
  getVideoCoverWithSize,
  getThumbImageUrlSquare,
  getImageUrlLimitShort,
  getImageUrlLimitHeight
}