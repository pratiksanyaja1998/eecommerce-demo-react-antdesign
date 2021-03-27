import "./Header.less";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Layout, Menu, Button, Dropdown, Drawer } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import clsx from "clsx";

const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: window.location.pathname,
      isOpenDrawer: false,
      transparentMobile: props.transparentMobile || false,
      user: props.state?.user || null,
      category: [],
      isScrolled: true,
    };

    this.onScrolling = this.onScrolling.bind(this);
  }

  componentWillReceiveProps(nProps){
    this.setState({
      user: nProps.state.user || null,
    })
  }

  componentDidMount() {
    document.addEventListener("scroll", this.onScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.onScrolling);
  }

  onScrolling(e) {
    // console.log(e);
    // if (window.scrollY > 5) {
    //   this.setState({ isScrolled: true });
    // } else {
    //   this.setState({ isScrolled: false });
    // }
  }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  showDrawer = () => {
    this.setState({ isOpenDrawer: true });
  };

  onCloseDrawer = () => {
    this.setState({ isOpenDrawer: false });
  };

  onLangChange = (event) => {
    // console.log(event.key);
    this.props.changeLocale(event.key);
  };

  getMenuItem = (isMobile = false) => {

        return (
          <>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
          
              
            <Menu.Item key="about">
              <Link to="/about-us">About Us</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact-us">Contact Us</Link>
            </Menu.Item>
          </>
        );
    
  };

  render() {
    const { isOpenDrawer, isScrolled, transparentMobile, user, current } = this.state;



    const accountMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            Profile
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
           Account Settings
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <Header className="desktop-header">
          <div className="brand-detail">
            <div
              className="container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                <div className="logo">
                  <img src={process.env.PUBLIC_URL + '/assets/plane.svg'} />
                  
                  <div>Cheese</div>
                </div>
              </div>
              <div style={{ display: "flex" }}>

                {!user ? (
                  <>
                    <Link
                      className="ant-btn ant-btn-round ant-btn-sm round"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="ant-btn ant-btn-round ant-btn-sm round"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (<>
                  <Dropdown overlay={accountMenu} placement="bottomRight">
                    <>
                    <Button
                      className="account-btn"
                      shape="circle"
                      icon={<UserOutlined />}
                    />
                    <span className="user-name">{user.FullName}</span>
                    </>
                  </Dropdown>
                  <Button type={'primary'} shape="round" onClick={this.props.logout} size="small" style={{marginLeft: 10}}>Log out</Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="top-menu">
            <div className="container">
              <Menu
                onClick={this.handleClick}
                selectedKeys={[current]}
                mode="horizontal"
              >
                {this.getMenuItem()}
              </Menu>
            </div>
          </div>

          <Drawer
            title={
              <div className="logo">
                <img src={process.env.PUBLIC_URL + '/assets/plane.svg'} />
                <div>Cheese</div>
              </div>
            }
            placement="left"
            closable={false}
            onClose={this.onCloseDrawer}
            visible={isOpenDrawer}
          >
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode={"inline"}
              theme={"light"}
            >
              {this.getMenuItem(true)}
            </Menu>
          </Drawer>
        </Header>
        <Header
          className={clsx(
            "mobile-header",
            isScrolled && "mobile-header-white",
            transparentMobile && "mobile-header-transparent"
          )}
        >
          <div className="container">
            <Button
              className={!isScrolled ? "menu-btn" : ""}
              onClick={this.showDrawer}
              // type="primary"
              icon={<MenuOutlined />}
              size={22}
            />

            <div className="logo">
              <img src={process.env.PUBLIC_URL + '/assets/plane.svg'} />
              <div>Cheese</div>
            </div>

            <Button
              // className={!isScrolled ? "menu-btn" : ""}
              onClick={this.showDrawer}
              // type="primary"
              icon={<ShoppingCartOutlined />}
              size={22}
            />

            {/* <Dropdown
              isOpenDrawer={true}
              trigger={["click"]}
              overlay={() => {
                return (
                  <Menu>
                    {langList.map((o) => (
                      <Menu.Item key={o.key} onClick={this.onLangChange}>
                        {o.name}
                      </Menu.Item>
                    ))}
                  </Menu>
                );
              }}
              placement="bottomRight"
            >
              <span style={{ textTransform: "uppercase" }}>
                {this.props.state.locale} &nbsp; <DownOutlined />
              </span>
            </Dropdown> */}
          </div>
        </Header>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (data) => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    },
    changeLocale: (locale) => {
      dispatch({
        type: "UPDATE_LOCALE",
        payload: locale,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);
