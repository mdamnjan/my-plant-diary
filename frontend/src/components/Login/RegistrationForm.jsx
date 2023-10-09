import { Alert, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { register } from "../Plants/utils";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    // reset error when attempting to register/log in again so it doesn't show the old error message
    setError(null);
    await register({ username: username, password: password, email: email })
      .then((res) => {
        setSignUpSuccess(true);
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={registerUser}>
        <Typography>
          <img alt="plant" id="logo" src="leaf-svgrepo-com.svg" />
          <h2>My Plant Diary</h2>
        </Typography>
        {signUpSuccess && (
          <Alert
            style={{ marginBottom: "20px" }}
            variant="filled"
            severity="success"
          >
            Your account was created successfully! You can now log in.
          </Alert>
        )}
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          helperText={error}
        />
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
          Sign Up
        </Button>

        <div id="sign-up-section">
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")}>Log In</Button>
        </div>
      </form>
    </div>
  );
};
export default RegistrationForm;
