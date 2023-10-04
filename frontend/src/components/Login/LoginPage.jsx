import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { authenticate, refreshToken } from "../Plants/utils";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    await authenticate({ username: username, password: password })
      .then((res) => {
        window.location.assign("/plants");
      })
      .catch((error) => console.log("Sorry, login failed"));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <Typography>
          <img id="logo" src="leaf-svgrepo-com.svg" />
          <h2>My Plant Diary</h2>
        </Typography>
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="login-button" variant="contained" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
