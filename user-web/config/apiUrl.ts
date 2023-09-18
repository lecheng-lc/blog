const IPURL: string = process.env.NODE_ENV ==='production' ? 'https://api.lechengweb.com/default/' : 'http://127.0.0.1:7001/default/'
interface ServicePath {
  getArticleList: string
  getArticleDetail: string
  getTypeInfo: string
  getListTag: string
  getAllPartCount: string
  getAboutMe: string
  getArchivesData: string,
  getAllPostIds: string,
  getAllArticles: string,
  addArticleViews: string
}
let servicePath: ServicePath = {
  getArticleList: IPURL + 'getArticleList',    // 首页文章列表接口
  getArticleDetail: IPURL + 'getArticleDetail/',   // 文章详细页内容接口 ,需要接收参数
  getTypeInfo: IPURL + 'getTypeInfo',          // 文章分类信息
  getListTag: IPURL + 'getListTag',         // 根据类别ID获得文章列表
  getAllPartCount: IPURL + 'getAllPartCount',  // 获得所有集数和访问数
  getAboutMe: IPURL + 'getAboutMe',            // 所见所得
  getArchivesData: IPURL + 'getArchivesData',
  getAllPostIds: IPURL + 'getAllPostIds',
  getAllArticles: IPURL + 'getAllArticles',
  addArticleViews: IPURL + 'addArticleViews',

}

export default servicePath