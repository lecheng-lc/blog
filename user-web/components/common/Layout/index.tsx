import Header from '../Header/index'
import Footer from '../Footer'
import { Row, Col,FloatButton } from 'antd'
import  './index.module.scss'
type Props = {
  children?: React.ReactNode;
}; 
const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="container">
        <Row justify="center">
          <Col span={24}>
            {children}
          </Col>
        </Row>
      </main>
      <Footer />
      <FloatButton.BackTop />
    </>
  )
}
export default Layout

