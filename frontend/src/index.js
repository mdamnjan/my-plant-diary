import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { theme } from "./theme.js";
import { ThemeProvider } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="my-plant-diary.us.auth0.com"
    clientId="XpH8tzSOXSTvnlemPBB44EypZixLjTSs"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/",
    }}
  >
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
