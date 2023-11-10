import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import BasePage from "./components/common/BasePage";
import HomePage from "./components/Home/HomePage";

import LoginForm from "./components/Login/LoginForm";
import ProfilePage from "./components/Profile/ProfilePage";
import RegistrationForm from "./components/Login/RegistrationForm";

import PlantListPage from "./components/Plants/PlantListPage/PlantListPage";
import PlantDetailPage from "./components/Plants/PlantDetails/PlantDetailPage";

import NotesPage from "./components/Notes/NotesPage";
import TasksPage from "./components/Tasks/TasksPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<RegistrationForm />} />
          </Route>
          <Route element={<BasePage />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/plants" element={<PlantListPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/plants/:slug/" element={<PlantDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
