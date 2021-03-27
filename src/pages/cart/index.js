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
  MinusOutlined
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
            return (
              <div className="stats-card" key={index}>
                <img src={o.photo} />
                <div className="details">
                    <div className="d-flex j-space-between">
                      <span className="name">{o.name}</span>
                      <span className="price">{o.price} $</span>
                    </div>
                    <div
                      className="d-flex "
                      style={{ marginTop: 8 }}
                    >
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={()=>{
                          props.updateQty({
                            index,
                            qty: o.qty +1
                          })
                        }}
                      />
                      <span className="qty" style={{padding: "0px 10px"}}> {o.qty}</span>
                      <Button
                        type="primary"
                        icon={<MinusOutlined />}
                        onClick={()=>{
                          props.updateQty({
                            index,
                            qty: o.qty - 1
                          })
                        }}
                      />
                    </div>
                </div>
              </div>
            );
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
    updateQty: (data) => {
      dispatch({
        type: "UPDATE_QTY",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
