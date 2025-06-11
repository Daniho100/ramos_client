import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import './style.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="/ramosLogo.png" alt="Logo" className="logo-image" />
          <span>Ramos Realty</span>
        </Link>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Menu - both desktop and mobile (controlled by CSS and state) */}
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          
          {user && (
            <>
            <Link to="/create" className="menu-item" onClick={() => setIsOpen(false)}>
              Create a Listing
            </Link>
            <Link to="/dashboard" className="menu-item" onClick={() => setIsOpen(false)}>
              My Listings
          </Link>
          </>
          )}
          {!user ? (
            <>
              <Link to="/" className="menu-item" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="menu-item" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link to="/contact" className="menu-item" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
              <Link to="/login" className="menu-item" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="menu-item" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
            <span className="menu-item greeting">Hi, {user.name}</span>
            <span className="menu-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Log out
            </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
