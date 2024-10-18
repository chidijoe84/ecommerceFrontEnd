import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './ViewProductOrder.css';

const CustomerPurchaseDetails = () => {
  const [allOrderedProducts, setAllOrderedProducts] = useState([]);
  const userInformation = JSON.parse(localStorage.getItem('admininformation'));
  const { date, userId } = useParams();

  console.log(userId)

  const handleGetAllOrderedProduct = async () => {
    await axios
      .get(
        `http://localhost:3001/api/v1/productPurchase/getUserProductOrder?UserID=${userId}&date=${date}`
      )
      .then(res => {
        console.log('get all order', res);
        setAllOrderedProducts(res.data.userProductOrder);
      })
      .catch(err => {
        console.log('errpr fetching product', err);
      });
  };

  useEffect(() => {
    handleGetAllOrderedProduct();
  }, []);
  return (
    <main className="parentOrderList">
      <div className="orderListMain">
        <h3>List of ordered products </h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">s/n</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Phone </th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Purchase Qty</th>
              <th scope="col">Purchase Bill</th>
              <th scope="col">Order ID</th>
              <th scope="col">Date Created</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {allOrderedProducts &&
              allOrderedProducts?.map((orderList, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {orderList.UserFirstName} {orderList.UserLastName}
                  </td>
                  <td>{orderList.UserPhone}</td>
                  <td>{orderList.ProductName}</td>
                  <td>{orderList.ProductPrice}</td>
                  <td>{orderList.ProductOrderQuantity}</td>
                  <td>{orderList.OrderTotalAmount}</td>
                  <td>{orderList.OrderID}</td>
                  <td>{moment(orderList.OrderCreatedDate).format('MMM Do, YYYY h:m A')}</td>
                  <td>{orderList.OrderStatus}</td>
                  <td>
                    {/* <button type="button" class="btn btn-primary" onClick={() => actionOnclick(product)}>
                          Delete product
                        </button> */}
                    <div className="btn-group">
                      <button
                        class="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        order options
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <Link
                            // to={`/admin-dashboard/create-products/${product.ProductID}/${encodedProductName(product)}`}
                            // state={{ product: product }}
                            className="dropdown-item"
                          >
                            view product details
                          </Link>
                        </li>
                        <li>
                          <span
                            className="dropdown-item"
                            style={{ cursor: 'pointer' }}
                            // onClick={() => actionOnclick(product)}
                          >
                            Delete order
                          </span>
                        </li>
                        {/* <li>
                                <Link
                                  // to={`/admin-dashboard/product-purchase/${product.ProductID}/${encodedProductName(product)}`}
                                  // state={{ product: product }}
                                  style={{ cursor: 'pointer' }}
                                  className="dropdown-item"
                                >
                                  place order
                                </Link>
                              </li> */}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CustomerPurchaseDetails;
