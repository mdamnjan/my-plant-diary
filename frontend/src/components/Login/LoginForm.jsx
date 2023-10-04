import "./Login.css";
import { useState } from "react";
import { authenticate } from "../Plants/utils";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    // reset error when attempting to register/log in again so it doesn't show the old error message
    setError(null)
    await authenticate({ username: username, password: password })
      .then((res) => {
        navigate("/plants");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <Typography>
          <img alt="plant" id="logo" src="leaf-svgrepo-com.svg" />
          <h2>My Plant Diary</h2>
        </Typography>
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Username"
          value={username}
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          error={error}
          helperText={error}
        />
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          helperText={error}
        />
        <Button className="login-button" variant="contained" type="submit">
          Log In
        </Button>
          <div id="sign-up-section">
            Don't have an account?{" "}
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>  
      </form>
    </div>
  );
};
export default LoginPage;
