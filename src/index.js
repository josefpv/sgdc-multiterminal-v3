import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./utils/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-day-picker/dist/style.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
/*Font awesome 4.7.0 */
import "font-awesome/css/font-awesome.css";
//redux
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import reduxThunk from "redux-thunk";

//to use redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
