import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import './index.css';

/**
 * Importing other components
 */
import Home from './components/Home'
import TaskMng from './components/TaskMng'
import About from './components/About'
import Contact from './components/Contact'
//for ActiveClassName: https://chat.openai.com/share/62274c61-ad20-4786-b36c-89fb7c2a33d9
const App = () => {

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Router>
      <div className="container">
        <nav className="navBar">
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/taskMng" activeClassName="active">Task Manager</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <button className="backButton" onClick={handleGoBack}>back</button>
      </div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.
            Furthermore, notice how the content above always renders? On each page? */}
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/taskmng" element={<TaskMng />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App
