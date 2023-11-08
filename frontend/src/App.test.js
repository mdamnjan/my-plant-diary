import { render, screen } from "@testing-library/react";
import LoginPage from "./components/Login/LoginForm";
import { BrowserRouter as Router } from "react-router-dom";

test("renders a login form", async () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );
  const formTitle = await screen.findByText("My Plant Diary");
  expect(formTitle).toBeInTheDocument();
});
