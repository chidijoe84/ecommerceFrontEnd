import React, { useEffect, useState } from 'react';
import './Main.css';
import { IoMdVideocam } from 'react-icons/io';
import { FaThumbsUp } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegUser, FaShoppingBag } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { FcMoneyTransfer } from 'react-icons/fc';
import Chart from '../charts/Chart';
import axios from 'axios';

const Main = () => {
  const [allCount, setAllCount] = useState();
  const userInformation = JSON.parse(localStorage.getItem('admininformation'));
  useEffect(() => {
    const getAllSystemCount = async () => {
      const [totalProductCount, totalUserCount, totalOrder, totalOrderRevenue] = await Promise.all([
        axios.get(`http://localhost:3001/api/v1/products/totalProductsCount`),
        axios.get(`http://localhost:3001/api/v1/userRegistration/totalUsers`),
        axios.get(`http://localhost:3001/api/v1/productPurchase/totalOrderCount`),
        axios.get(`http://localhost:3001/api/v1/productPurchase/getAllProductOrder`),
      ]);

      const totalNumberOfProduct = totalProductCount.data;
      const totalNumberOfUser = totalUserCount.data;
      const totalProductOrder = totalOrder.data;
      const totalRevenue = totalOrderRevenue.data.allProductOrder;

      let totalAmount = 0;

      for (const order of totalRevenue) {
        totalAmount += parseInt(order.TotalOrderAmount);
      }

      const combinedResults = {
        totalNumberOfProduct: totalNumberOfProduct,
        totalNumberOfUser: totalNumberOfUser,
        totalProductOrder: totalProductOrder,
        totalRevenue: totalAmount,
      };

      console.log('topupNotification', combinedResults);
      setAllCount(combinedResults);
    };
    getAllSystemCount();
  }, []);

  console.log('allCount', allCount);

  return (
    <main>
      <div className="main_container">
        <div className="main_title">
          <img src="https://img.freepik.com/free-vector/coding-concept-illustration_114360-939.jpg" alt="" />
          <div className="main_greeting">
            <h1>Hello {userInformation?.UserFirstName}</h1>
            <p>Welcom to your admin dashboard</p>
          </div>
        </div>

        <div className="main_cards">
          <div className="main_card">
            <i className="fa-2x text-lightblue">
              <FaRegUser />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Number of customers</p>
              <span className="font-bold text-title">{allCount?.totalNumberOfUser?.totalUserCounts}</span>
            </div>
          </div>

          <div className="main_card">
            <i className="fa-2x text-red">
              <FaShoppingBag />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Total inventory</p>
              <span className="font-bold text-title">{allCount?.totalNumberOfProduct?.totalProductsCounts}</span>
            </div>
          </div>

          <div className="main_card">
            <i className="fa-2x text-yellow">
              <HiShoppingCart />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Number of orders</p>
              <span className="font-bold text-title">{allCount?.totalProductOrder?.totalOrderCount}</span>
            </div>
          </div>

          <div className="main_card">
            <i className="fa-2x text-green">
              <FcMoneyTransfer />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Total Revenue</p>
              <span className="font-bold text-title">{parseInt(allCount?.totalRevenue).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="charts2">
          <div className="charts_left">
            <div className="charts_left_title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, Califonia, USA</p>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <Chart />
          </div>

          <div className="charts_right">
            <div className="charts_right_title">
              <div>
                <h1>stats Reports</h1>
                <p>Cupertino, Califonia, USA</p>
              </div>
              <i className="fa fa-usd"></i>
            </div>

            <div className="charts_right_cards">
              <div className="card1">
                <h1>Income</h1>
                <p>$75,300</p>
              </div>
              <div className="card2">
                <h1>sales</h1>
                <p>$124,000</p>
              </div>
              <div className="card3">
                <h1>Users</h1>
                <p>3900</p>
              </div>
              <div className="card4">
                <h1>Order</h1>
                <p>1881</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
