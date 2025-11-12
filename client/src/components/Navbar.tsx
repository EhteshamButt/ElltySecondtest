import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

interface NavbarProps {
  onAuthClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthClick }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          Number Discussion
        </div>
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">Welcome, {user?.username}!</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={onAuthClick} className="btn btn-secondary">
                Login
              </button>
              <button onClick={onAuthClick} className="btn btn-primary">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

