import logo from "./logo.svg";
import "./App.css";
import NotePage from "./components/Notes/NotePage";
import LoginPage from "./components/Login/LoginPage";
import PlantPage from "./components/Plants/PlantPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PlantPage />
      </header>
    </div>
  );
}

export default App;
