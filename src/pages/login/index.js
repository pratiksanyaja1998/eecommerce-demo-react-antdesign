import "./login.less";
import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
  PlaySquareOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Login(props) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (values) => {
    console.log(values);

    let formData = new FormData();

    console.log(Object.keys(values));

    Object.keys(values).map((key) => {
      console.log(key);
      formData.append(`user[${key}]`, values[key]);
    });

    formData.append("role","patient")
    formData.append("device_detail[device_type]","web")
    formData.append("device_detail[player_id]","")

    setLoading(true);
    axios
      .post("/users/sign_in.json", formData)
      .then((response) => {
        console.log("-----------------------------------------")
        console.log(response.data)
        const { success, message : errorMessage, status, data, common, subscription_plans } = response.data;

        if(success){
          props.history.push('/');
          props.login(data.user);
        }else{
          setLoading(false);
          message.error(errorMessage);
        }
      })
      .catch((e) => {
        console.error(e.response?.data);
        message.error(e.response?.data?.message || "Something went wrong.");
        setLoading(false);
      });
  };

  return (
    <div className="login-root">
      <div style={{ margin: "auto", minWidth: 400 }}>
        <div className="header">
          <h2>Login</h2>
          {/* <p>We will review your application after submission</p> */}
        </div>
        <Form
          {...layout}
          name="singup-supplier"
          onFinish={onSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name={"email"} label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"Password"}
            label="Password"
            // rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
