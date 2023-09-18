import React from 'react'
import ArticleContent from '@@/detail/detail-content'
import axios from 'axios'
import servicePath from '@/config/apiUrl'  
const About = (res: any) => {
  return (
   <ArticleContent data={res.data} />
  )
}
export async function getServerSideProps(ctx:any) {
  const res = await axios(`${servicePath.getAboutMe}`)
  return {
    props: {
      data:res.data.data
    },
  }
}
export default About
