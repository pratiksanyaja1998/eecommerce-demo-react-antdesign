import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import axios from "axios";
import { connect } from "react-redux";

axios.defaults.baseURL = "https://dev-api.alldaydr.com/api";

const product = [
  { name: "Cheese", price: 2.5, location: "Refrigerated foods", photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60", qty: 2 },
  { name: "Crisps", price: 3, location: "the Snack isle", photo: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__340.jpg", qty: 5 },
  { name: "pizza", price: 4, location: "Refrigerated foods", photo: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8&w=1000&q=80", qty: 7 },
  { name: "Chocolate", price: 1.5, location: "the Snack isle", photo: "https://image.shutterstock.com/image-photo/supreme-pizza-lifted-slice-1-260nw-84904912.jpg", qty: 8 },
  { name: "Self-raising flour", price: 1.5, location: "Home baking", photo: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8&w=1000&q=80", qty: 0 },
  { name: "Ground almonds", price: 3, location: "Home baking", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHUKMHAc09CoqKqaOUNgm8aHhb_LqCzlFUfA&usqp=CAU", qty: 1 },
];

const storeReducer = function (
  state = { user: JSON.parse(localStorage.getItem("auth") || null), cart: [], product },
  action
) {
  let newCart = state.cart;

  switch (action.type) {
    
    case "LOGIN":
      localStorage.setItem("auth", JSON.stringify(action.payload));
      axios.defaults.headers.common["Authorization"] =
        "bearer " + action.payload.token;
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.setItem("auth", null);
      delete axios.defaults.headers.common["Authorization"];
      return { locale: "en", user: null };
    case "ADD_INTO_CART":
      newCart.push({...action.payload, qty:1});
      return { ...state, cart: newCart };
    case "REMOVE_FROM_CART":
      newCart = state.cart;
      newCart.splice(action.payload, 1)
      return { ...state, newCart };
    case "UPDATE_QTY":
      newCart = state.cart;
      newCart[action.payload.index].qty = action.payload.qty
      // newCart.splice(action.payload, 1)
      return { ...state, newCart };
    default:
      return state;
  }
};

let store = createStore(storeReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
