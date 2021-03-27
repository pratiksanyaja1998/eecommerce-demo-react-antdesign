import "./signup.less";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Upload,
  Select,
} from "antd";
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
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";

const { Option } = Select;

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

function Singup(props) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    let formData = new FormData();
    // let formData = {
    //   user
    // };
    console.log( Object.keys(values))
    Object.keys(values).map(key=>{
      // formData ={
      //   // ...formData,
      //   // "user[]"
        
      // }
      console.log(key)
      formData.append(`user[${key}]`,values[key])
    })

    formData.append(`device_detail[device_type]`,'web')
    formData.append(`device_detail[player_id]`,"")

    
    console.log(formData);

    axios
      .post("/users/sign_up.json",formData)
      .then((response) => {
        console.log(response.data);
        const { success, message : errorMessage, status, data, common, subscription_plans } = response.data;
        // props.login(response.data.data)
        // console.log(props);

        if(success){
          props.history.push('/')
          props.login(data.user);
          // setFormSubmit(true);
        }else{
          setLoading(false);
          message.error(errorMessage)
        }
      })
      .catch((e) => {
        console.error(e.response?.data);
        message.error(e.response?.data?.message || "Something went wrong.");
        setLoading(false);
      });
  };

  return (
    <div className="singup-root">
      <div style={{ margin: "auto", minWidth: 400 }}>
        <Form
          {...layout}
          // onSubmitCapture={console.log}
          name="singup-supplier"
          onFinish={onSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ type: "email" }]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[{ type: "password" }]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="first_name"
            label={"FirstName"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"last_name"}
            label="LastName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label={"Phone Number"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" loading={loading} htmlType="submit">
              Signup
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

export default connect(mapStateToProps, mapDispatchToProps)(Singup);
