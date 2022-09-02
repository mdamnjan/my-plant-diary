import logo from "./logo.svg";
import "./App.css";
import PostPage from "./components/Posts/PostPage";
import LoginPage from "./components/Login/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PostPage />
      </header>
    </div>
  );
}

export default App;
