import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });
    history.push('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Tiakalo</div>
      <div className="navbar-links">
        {state.isAuthenticated ? (
          <>
            <Link to="/songs/list">Songs</Link>
            <Link to="/profile">Mon compte</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Signin</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
