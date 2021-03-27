import "./Footer.less";
import React, { Component } from "react";
import { Layout, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  DingdingOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const { Footer } = Layout;

export default class FooterComp extends Component {
  render() {
    return (
      <Footer>
        <div className="container">
          <Row>
            <Col
              className="logo-root"
              xs={{ span: 24 }}
              lg={{ span: 5 }}
              md={{ span: 6 }}
            >
              <div className="logo">
                <img src="assets/plane.svg" />
                <div>Cheese</div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 6 }}>
              <h3>Company</h3>
              <ul>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/">Careers</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 6 }}>
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link to="/">Terms and conditions</Link>
                </li>
                <li>
                  <Link to="/">Privacy policy</Link>
                </li>
                <li>
                  <Link to="/">Payment and refund</Link>
                </li>
              </ul>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 6 }}>
              <h3>Partnership</h3>
              <ul>
                <li>
                  <Link to="/">Become Experience Partner</Link>
                </li>
              </ul>
            </Col>
            <Col
              className="logo-root"
              xs={{ span: 24 }}
              lg={{ span: 4 }}
              md={{ span: 6 }}
            >
              <div className="social-icons">
                <FacebookFilled /> <InstagramOutlined /> <TwitterOutlined />
              </div>
            </Col>
          </Row>
        </div>
      </Footer>
    );
  }
}
