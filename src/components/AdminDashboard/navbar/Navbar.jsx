import React from 'react';
import './Navbar.css';
import { FaSearch, FaBars, FaRegClock } from 'react-icons/fa';
import profileImg from '../../../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';
// import { FaBars } from "react-icons/fa";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const userInformation = JSON.parse(localStorage.getItem('admininformation'));
  const navigation = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('admininformation');
    navigation('/');
  };
  return (
    <nav className="navbar">
      <div className="navbar_icon" onClick={() => openSidebar()}>
        <FaBars className="icons" />
      </div>
      <div className="navbar_left">
        <a href="#">subscribers</a>
        <a href="#">video management</a>
        <a href="#" className="active_link">
          Admin
        </a>
      </div>
      <div className="navbar_right">
        {/* <a href="#">
          <FaSearch className="icons" />
        </a>
        <a href="#">
          <FaRegClock className="icons" />
        </a> */}
        <div className="btn-group">
          <a class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img width="30" src={profileImg} alt="avatar" />
          </a>
          <ul class="dropdown-menu">
            <li>
              <Link className="dropdown-item">{userInformation?.UserFirstName}</Link>
            </li>
            <li>
              <Link className="dropdown-item">{userInformation?.UserEmail}</Link>
            </li>
            <li>
              <Link className="dropdown-item">{userInformation?.UserPhone}</Link>
            </li>
            <li onClick={handleLogOut} className='logOutBtn'>
              <i>
                <GoSignOut />
              </i>
              <span to="/">LOG OUT</span>
            </li>
          </ul>
        </div>
        {/* <a href="#">
                <img width='30' src={profileImg} alt='avatar' />
            </a> */}
      </div>
    </nav>
  );
};

export default Navbar;
