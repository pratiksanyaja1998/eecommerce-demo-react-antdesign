import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./login";
import Singup from "./signup";
import Home from "./home";
import Cart from './cart';

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Singup} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}