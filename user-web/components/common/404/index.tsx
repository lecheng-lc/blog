import Image from '@@/common/image'
import Link from 'next/link'
import styles from './index.module.scss'
const Component404 = () => {
  return <>
     <div className={styles['not-fond']}>
        <Image layout="" height="149" width="350"  alt="404" src="/images/common/404.png" />
        <h2>抱歉，您访问的页面出错了</h2>
        <p>您可能输错了网址，或该网页已删除或不存在</p>
        <Link href="/">
          <span className={styles['reback-home']}>返回主页</span>
        </Link>
    </div>
  </>
}
export default Component404