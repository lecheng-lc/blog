import  styles from './index.module.scss'
import { Row, Col } from 'antd'

function Banner() {
  return (
    <div className="content-header">
      <div className="container">
        <Row justify="center">
          <Col xs={24} sm={24} md={18} >
            <div>
              <div className="header-title">
                <Col  >
                  <h1 className="title">归档</h1>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Banner