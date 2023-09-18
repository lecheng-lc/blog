import './index.scss'
import Link from 'next/link'
import {guid } from '@/utils/index'
import {HOME_BANNER_NUM} from '@/utils/constant'
const Pagination = (props:any) => {
  const { page, total, size } = props
  const pageNum = Math.ceil((total - HOME_BANNER_NUM) / (size)) > 0 ? Math.ceil((total - HOME_BANNER_NUM) / (size)) : 1
  const pageItems = []
  if(pageNum > HOME_BANNER_NUM) {
    const firstPagination = <li key={1} className={`page-item ${page === 1 ? 'active' : ''}`}><a href={`/page/1`} className="page-link">1</a></li>
    pageItems.push(firstPagination)
    if(page - 1 > 1 ) {
      if(page - 1 !== 2) {
        const ellipsisPagination = <li key={guid()} className="page-item"><span  className="page-ellipsis">···</span></li>
        pageItems.push(ellipsisPagination)
      }
      const prePage =  <li key={page - 1} className="page-item"><a href={`/page/${page - 1}`} className="page-link">{page - 1}</a></li>
      const currentPage =  <li key={page} className="page-item active"><a href={`/page/${page}`} className="page-link">{page}</a></li>
      pageItems.push(prePage)
      pageItems.push(currentPage)
    } else if(page - 1 < 1 ){
      const nextPage =  <li key={page + 1} className="page-item"><a href={`/page/${page + 1}`} className="page-link">{page + 1}</a></li>
      pageItems.push(nextPage)
    } else if(page < pageNum){
      const currentPage =  <li key={page} className="page-item active"><a href={`/page/${page}`} className="page-link">{page}</a></li>
      pageItems.push(currentPage)
    }
    if(pageNum - page >=1 && page > 1 ) {
      const nextPage =  <li key={page + 1} className="page-item"><a href={`/page/${page + 1}`} className="page-link">{page + 1}</a></li>
      pageItems.push(nextPage)
    }  
    if(pageNum - page >1  ) {
      const ellipsisPagination = <li key={guid()} className="page-item"><span  className="page-ellipsis">···</span></li>
      pageItems.push(ellipsisPagination)
      const lastPagination = <li  key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}><a href={`/page/${pageNum}`} className="page-link">{pageNum}</a></li>
      pageItems.push(lastPagination)
    }
  } else {
    for (let i = 1; i <= pageNum; i++) {
    pageItems.push(<li key={i} className={`page-item ${page === i ? 'active' : ''}`}><a href={`/page/${i}`} className="page-link">{i}</a></li>)
  }
  }
  const haveNextPage = page === pageNum ? '' :  <div className="pagination-menu"> <span className="page-item"> <Link href={`/page/${page+1}`}><a  rel="next" className="page-link page-next">下一页</a></Link></span></div>
  return (
    <div className='pagination-box' style={{display: pageNum > 1 ? '' : 'none' }}>
      <div className="pagination col-12 ">
        <div className="pagination-buttons">
          <nav className="pagination-nav" aria-label="Page navigation">
            <ul className="nav-links">
              {pageItems}
            </ul>
          </nav>
         {haveNextPage}
        </div>
      </div>
    </div>
  )
}

export default Pagination