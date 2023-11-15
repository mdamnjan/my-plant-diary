import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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

import { createContext, useState } from "react";

const AuthContext = createContext();

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === true
  );

  return (
    <div className="App">
      <header className="App-header"></header>
      <AuthContext.Provider value={isLoggedIn}>
        <Router>
          <Routes>
            <Route>
              <Route
                path="/login"
                element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/signup" element={<RegistrationForm />} />
            </Route>

            <Route
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <BasePage />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/plants" element={<PlantListPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/plants/:slug/" element={<PlantDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
