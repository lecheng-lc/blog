import React, {useEffect} from 'react'
import ArticleContent from '@@/detail/detail-content'
import axios from 'axios'
import servicePath from '@/config/apiUrl'
// import {getAllPostIds} from '@/lib/post'  
const Details = (res: any) => {
  return (
   <ArticleContent data={res.data} />
  )
}
// export async function getStaticPaths() {
//   const articleIds = await getAllPostIds()
//   return {
//     paths:articleIds,
//     fallback: false
//   }
// }
// export async function getStaticProps(ctx:any) {
//   const paramsId = ctx.params.id
//   const res = await axios(`${servicePath.getArticleDetail}${paramsId}`)
//   return {
//     props: {
//       data: res.data.data
//     }
//   }
// }

export async function getServerSideProps(context:any) {
  const paramsId = context.params.id
  const res = await axios(`${servicePath.getArticleDetail}${paramsId}`)
  return {
    props: {
      data: res.data.data
    }
  }
}

export default Details
