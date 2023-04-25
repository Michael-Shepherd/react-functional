import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Board from "./components/Board";
import ProjectsPage from "./projects/ProjectsPage";
import './styles.css';
import HomePage from "./home/HomePage";
import ProjectPage from "./projects/ProjectPage";

function App() {
  return (
    <Router>
      <header className="sticky">
        <span className="logo">
          <img src="/src/assets/react.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/projects" element={<ProjectsPage />}></Route>
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
