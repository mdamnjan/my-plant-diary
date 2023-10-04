import logo from "./logo.svg";
import "./App.css";
import NotePage from "./components/Notes/NotePage";
import LoginForm from "./components/Login/LoginForm";
import PlantPage from "./components/Plants/PlantPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantDetailPage from "./components/Plants/PlantDetailPage";
import HomePage from "./components/Home/HomePage";
import RegistrationForm from "./components/Login/RegistrationForm";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/plants" element={<PlantPage />} />
          <Route path="/plants/:slug/" element={<PlantDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
