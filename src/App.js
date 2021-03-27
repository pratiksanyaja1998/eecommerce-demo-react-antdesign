import "./App.less";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { UseContext, authReducer, initialState } from "./authContext";
import { IntlProvider } from "react-intl";

import Routes from "./pages/routes";
import messages from "./locale";
import { connect } from "react-redux";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const App = (props) => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
