import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import LogOut from './logout';
import { clearErrors } from '../actions/requestUsers';

const Nav = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);

  function handleClick() {
    dispatch(clearErrors());
  };


  if (userState.loggedIn) {
    return (
      <div id="nav-links" className="pl-3 py-2 w-100 border-bottom d-flex justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            &nbsp;<i className="fas fa-bars"></i>&nbsp;&nbsp;
          </Dropdown.Toggle>
        
          <Dropdown.Menu>
            <Link className="menu-item" to="/" key="places">
              <li id="home">Places</li>
            </Link>
            <Link className="menu-item" to="/rent_dates" key="rentEvents">
              <li id="dates">Schedule Rents</li>
            </Link>
            <Link className="menu-item"
              to="/add-place"
              key="add-place"
            >
              <li id="add-place">Add a Rent Place</li>
            </Link>
            <LogOut />
          </Dropdown.Menu>
        </Dropdown>
        <div className="mr-4 align-self-center">
          Welcome <b>{userState.user.username}</b> !
        </div>
      </div>
    );
  }

  return (
    <nav className="py-2 w-100 border-bottom">
      <ul id="nav-links" className="d-flex list-nav justify-content-between w-100">
        <Link className="list-nav-item" to="/login" key="login">
          <li onClick={() => handleClick()} id="login">Log In</li>
        </Link>
        <Link className="list-nav-item" to="/register" key={userState.loggedIn}>
          <li onClick={() => handleClick()} id="register">Sign Up</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;