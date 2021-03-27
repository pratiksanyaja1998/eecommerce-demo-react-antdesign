import React from 'react';
import { Row, Col, Grid, Button, Image, Input, Form, message, Spin } from "antd";

export default function Loading({style={}}) {
  return (
    <div className="d-flex j-center" style={style}> 
        <Spin />
    </div>
  );
}
