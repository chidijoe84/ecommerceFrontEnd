import React from 'react';
import './Sidebar.css';
import { IoHome } from 'react-icons/io5';
import {
  FaUserSecret,
  FaBuildingColumns,
  FaFile,
  FaScrewdriverWrench,
  FaHandshake,
  FaBoxArchive,
  FaClipboardQuestion,
} from 'react-icons/fa6';
import { IoBriefcaseSharp } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { CiCalendarDate } from 'react-icons/ci';
import { MdOutlinePayments } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import logo from '../../../assets/ecommerlogo.webp';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const navigation = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('admininformation');
    navigation('/');
  };
  return (
    <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
      <div className="sidebar_title">
        <div className="sidebar_img">
          <img src="https://invoice.ng/blog/wp-content/uploads/2017/07/ecommerce-websites-nigeria.jpg" alt="logo" />
          <h1>codersbite</h1>
        </div>
        <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}>
          <IoClose />
        </i>
      </div>

      <div className="sidebar_menu">
        <div className="sidebar_link active_menu_link">
          <i>
            <IoHome />
          </i>
          <Link to="">Dashboard</Link>
        </div>
        <h2>MNG</h2>
        <div className="sidebar_link">
          <i>
            <FaUserSecret />
          </i>
          <a href="">Admin Management</a>
        </div>
        <div className="sidebar_link">
          <i>
            <FaBuildingColumns />
          </i>
          <Link to="create-products">Create Products</Link>
        </div>
        <div className="sidebar_link">
          <i>
            <FaScrewdriverWrench />
          </i>
          <Link to="create-products-category">Category Management</Link>
        </div>
        <div className="sidebar_link">
          <i>
            <FaBoxArchive />
          </i>
          <Link to='product-list'>Product List</Link>
        </div>
        {/* <div className="sidebar_link">
          <i>
            <FaHandshake />
          </i>
          <a href="">Contract</a>
        </div> */}
        <div className="sidebar_link">
          <i>
            <IoBriefcaseSharp />
          </i>
          <Link to='product-order-list'>Order Management</Link>
        </div>
        <h2>LEAVE</h2>
        <div className="sidebar_link">
          <i>
            <FaClipboardQuestion />
          </i>
          <a href="">Request</a>
        </div>{' '}
        <div className="sidebar_link">
          <i>
            <GoSignOut />
          </i>
          <a href="">Leave policy</a>
        </div>{' '}
        <div className="sidebar_link">
          <i>
            <CiCalendarDate />
          </i>
          <a href="">Special Days</a>
        </div>
        <div className="sidebar_link">
          <i>
            <FaFile />
          </i>
          <a href="">Apply for leave</a>
        </div>
        <h2>PAYROLL</h2>
        <div className="sidebar_link">
          <i>
            <MdOutlinePayments />
          </i>
          <a href="">Payroll</a>
        </div>
        <div className="sidebar_link">
          <i>
            <MdOutlinePayments />
          </i>
          <a href="">Paygrade</a>
        </div>
        <div className="sidebar_logout" onClick={handleLogOut}>
          <i>
            <GoSignOut />
          </i>
          <span to="/">LOG OUT</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
