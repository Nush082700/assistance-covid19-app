import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import HelpeeForm from "./js/components/HelpeeForm";
import HelperForm from "./js/components/HelperForm";
import HelperSuccess from "./js/components/SuccessHelper.jsx";
import HelpeeSuccess from "./js/components/SuccessHelpee.jsx";
import Home from "./js/components/Home";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/helpeeForm" component={HelpeeForm} />
        <Route path="/helperForm" component={HelperForm} />
        <Route path="/helpeeSuccess" component={HelpeeSuccess} />
        <Route path="/helperSuccess" component={HelperSuccess} />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
