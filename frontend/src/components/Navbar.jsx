import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navbar.css';


function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">SafeRent</h1>

        <div className="menu-icon" onClick={() => setOpen(!open)}>
          ☰
        </div>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/properties">
              Properties
            </NavLink>
          </li>

          <li>
            <NavLink to="/login">
              Login
            </NavLink>
          </li>

          <li>
            <NavLink to="/register" className="btn-primary">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
