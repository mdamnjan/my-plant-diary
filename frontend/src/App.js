import logo from "./logo.svg";
import "./App.css";
import NotePage from "./components/Notes/NotePage";
import LoginPage from "./components/Login/LoginPage";
import PlantPage from "./components/Plants/PlantPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantDetailPage from "./components/Plants/PlantDetailPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<PlantPage />} />
            <Route path="/plants/:plantID" element={<PlantDetailPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
