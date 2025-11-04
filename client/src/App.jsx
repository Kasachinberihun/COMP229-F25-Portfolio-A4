import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Home from './components/home.jsx';
import Register from './components/register.jsx';
import Login from './components/login.jsx';

function App() {

  const getUserFromStorage = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return token && username ? { username } : null;
  }

  const [user, setUser] = useState(getUserFromStorage());

  useEffect(() => {
    setUser(getUserFromStorage());
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  }


  return (
    <>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className='navbar-brand' to="/">My Portfolio</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className='nav-link' to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/services">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/projects">Projects</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/contact">Contact</Link>
                </li>
              </ul>
              {user ? (
                <div className="navbar-nav ms-auto d-flex align-items-center">
                  <span className="navbar-text me-3">Welcome, {user.username}</span>
                  <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className='nav-link' to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link' to="/login">Login</Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
