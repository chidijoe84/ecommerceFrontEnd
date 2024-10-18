import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './ViewProductOrder.css';
// import { format } from 'date-fns';

const ViewProductOrder = () => {
  const [allOrderedProducts, setAllOrderedProducts] = useState([]);

  const handleGetAllOrderedProduct = async () => {
    await axios
      .get(`http://localhost:3001/api/v1/productPurchase/getAllProductOrder`)
      .then(res => {
        console.log('get all order', res);
        setAllOrderedProducts(res.data.allProductOrder);
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
              <th scope="col">Number of Purchase</th>
              <th scope="col">Total Order Amount</th>

              <th scope="col">Date Created</th>

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
                  <td>{orderList.OrderCount}</td>
                  <td>{orderList.TotalOrderAmount}</td>

                  <td>{moment(orderList.OrderCreatedDate).format('MMM Do, YYYY h:m A')}</td>

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
                            to={`/admin-dashboard/user-order-list/${orderList.UserID}/${moment(orderList.OrderCreatedDate).format(
                              'yyyy-MM-Do'
                            )}`}
                            // state={{ product: product }}
                            className="dropdown-item"
                          >
                            view purchase details
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

export default ViewProductOrder;
