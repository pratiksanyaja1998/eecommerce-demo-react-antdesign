import "./home.less";
import React, { Component, useState, useEffect, message } from "react";
import { Row, Col, Grid, Button, Image, Input } from "antd";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
  StarFilled,
  SearchOutlined,
  AimOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Layout } from "antd";
import { Select, DatePicker } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import Heading from "../../components/Heading";
import { connect } from "react-redux";

const { Option } = Select;
const { Content } = Layout;

const Home = ({ user, product, history, addIntoCart }) => {


  const addToCart = (index)=>{

    addIntoCart(product[index]);
    history.push('/cart');
  }

  return (
    <Layout>
      <Header transparentMobile={true} />
      <Content className="home-root ">
        <div className="container">
          <Heading value={'Products'} style={{margin: 20}} />

          <Row gutter={20} className="product-list">
            {
              product.map((o,index)=>{
                return (
                  <Col xs={24} md={8} lg={6} key={index} >
                    <div className="item" >
                      <div className="preview" style={{backgroundImage: "url('"+o.photo+"')"}}>
                        <div className="label"> <AimOutlined /> &nbsp; {o.location}</div>
                      </div>
                      <div className="description">
                        <div className="d-flex j-space-between" >
                          <span className="name">{o.name}</span>
                          <span className="price">{o.price} $</span>
                        </div>
                        <div className="d-flex j-space-between" style={{marginTop: 8}}>
                        <span className="qty">Stock : {o.qty}</span>
                         { o.qty!=0 ? <Button type="primary" onClick={()=>addToCart(index)} shape="round">Add to cart</Button> : <span className="sold">Sold out</span> }
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })
            }
          </Row>

        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIntoCart: (data) => {
      dispatch({
        type: "ADD_INTO_CART",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
