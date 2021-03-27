import "./stats.less";
import React, { Component } from "react";
import { Row, Col, Grid, Button, Image, Input, Form } from "antd";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { IntlProvider, FormattedMessage } from "react-intl";
import { Select, Upload, Checkbox, Tag, Tooltip, Layout } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import { connect } from "react-redux";

const { Content } = Layout;
const { Option } = Select;

const Cart = (props) => {
  const { cart } = props;

  return (
    <Layout>
      <Header />
      <Content className="stats-root ">
        <Heading value={"Checkout"} style={{ marginBottom: 20 }} />
        <div className="container">
          {cart.map((o, index) => {
            return <div className="stats-card" key={index}>
              <img src={o.photo} />
              <div className="details">
                
              </div>
            </div>;
          })}
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
