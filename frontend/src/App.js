import logo from './logo.svg';
import './App.css';
import PostPage from './components/PostPage';
import LoginPage from './components/Login/LoginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage/>
      </header>
    </div>
  );
}

export default App;
