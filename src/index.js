import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./components/App";
import reducers from "./reducers";

const middlewares = [thunk, promiseMiddleware, createLogger()];


const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);



const rootElement = document.getElementById("root");



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
