import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { IoFootballOutline } from "react-icons/io5";

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <IoFootballOutline className="text-5xl md:text-8xl spin-icon mt-32 md:mt-52 w-full mx-auto color-secondary" />
      }
    >
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
