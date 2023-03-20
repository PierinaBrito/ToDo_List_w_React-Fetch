//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//import your own component
import { Home } from "./component/home.jsx";

//import your styles into the webpack bundle
import "../styles/index.css";

//render your react application
ReactDOM.render (<Home />, document.querySelector("#app"));
 