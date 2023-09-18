import servicePath from '@/config/apiUrl'
import axios from 'axios' 
import {PAGE_SIZE,HOME_BANNER_NUM} from '@/utils/constant'
export async function getAllPostIds() {
    const result:any= await axios(`${servicePath.getAllPostIds}`)
    const articleIds = result.data.data.lists
    return articleIds.map((item:any) => {
      return {
        params: {
          id: String(item.id)
        }
      }
    })
}
export async function getAllPages(){
  const result:any = await axios(`${servicePath.getAllArticles}`)
  const articleNum =  result.data.data.total
  const pageNum = Math.ceil((articleNum - HOME_BANNER_NUM) / (PAGE_SIZE)) > 0 ? Math.ceil((articleNum - HOME_BANNER_NUM) / (PAGE_SIZE)) : 1
  const pagePaths = []
  for(let i =0; i < pageNum; i++) {
    pagePaths.push({params: {pageNum: String(i+1)}})
  }

  return pagePaths
}
