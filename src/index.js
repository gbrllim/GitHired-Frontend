import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-vcyswev0l4tqpvbg.jp.auth0.com"
    clientId="qnoelXx8JmckAXDipUuokLEb93WAmm9a"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
);
