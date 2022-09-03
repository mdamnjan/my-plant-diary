import logo from "./logo.svg";
import "./App.css";
import NotePage from "./components/Notes/NotePage";
import LoginPage from "./components/Login/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NotePage />
      </header>
    </div>
  );
}

export default App;
