class Env {
  isAndroid: boolean = false
  isIOS: boolean = false
  ua: string = ''
  isWx: boolean = false
  isQq:boolean = false
  screenWidth: number = 375
  devicePixelRatio: number = 1
  constructor(){
    this.refreshWithUa()
  }
  refreshWithUa() {
    if(  typeof window === 'undefined' ) return
    const ua = window.navigator.userAgent.toLowerCase()
    this.ua = ua
    this.isWx = /micromessenger/.test(ua)
    this.isQq = ua.match(/\sqq/i) !== null
    this.isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1
    this.isIOS = /iphone|ipad|ipod|ios/.test(ua)
    this.screenWidth = window.screen.width
    this.devicePixelRatio = window.devicePixelRatio
  }
    /**
   * 客户端是否支持webp
   */
    get canUseWebp(): boolean {
      return !this.isIOS
    }
}
export default new Env()