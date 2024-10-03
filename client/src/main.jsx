import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain={import.meta.env.VITE_REACT_APP_DOMAIN}
    clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: "http://localhost:5173"
    }}
    audience = "http://localhost:8000"
    scope = "openid profile email"
    >
   <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
    </MantineProvider>
   
    </Auth0Provider>
  </React.StrictMode>
);
