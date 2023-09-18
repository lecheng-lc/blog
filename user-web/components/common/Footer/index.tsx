import styles from "./index.module.scss";
import React from "react";
import { Row, Col } from "antd";
const Footer = () => (
  <>
    <div className="container">
      <Row justify="center">
        <Col span={24}>
          <div className={styles["footer-content"]}>
            <span className="align-items-center">
              © 2022 乐橙{" "}
              <span className="d-none d-sm-inline">
                <span className="px-2">⋅</span> Powered by antd And
                <span rel="noopener"> next</span>{" "}
                <span className="px-2">⋅</span> 豫ICP备2022002618号{" "}
              </span>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  </>
);

export default Footer;
