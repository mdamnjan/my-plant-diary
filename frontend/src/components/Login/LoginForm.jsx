import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Login.css";
import Logo from "../common/Logo";
import { login } from "../../api";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // reset error when attempting to register/log in again so it doesn't show the old error message
    setError(null);
    await login({ username: username, password: password })
      .then(() => {
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(localStorage.getItem("isLoggedIn") || true);
        navigate("/");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <Logo />
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
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
