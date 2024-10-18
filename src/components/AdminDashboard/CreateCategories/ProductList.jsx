import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './updateProduct.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ProductList = () => {
  const [allActiveProducts, setAllActiveProducts] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const navigation = useNavigate();
  // const location = useLocation();

  const handleGetAllProduct = async () => {
    const getAllProduct = await axios
      .get(`http://localhost:3001/api/v1/products/getAllProduct`)
      .then(res => {
        console.log('get all produc', res);
        setAllActiveProducts(res.data.allProducts);
      })
      .catch(err => {
        console.log('errpr fetching product', err);
      });
  };

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  const actionOnclick = async product => {
    await axios
      .delete(`http://localhost:3001/api/v1/products/deleteProduct/${product.ProductID}`)
      .then(res => {
        console.log('delete product res', res);
        handleGetAllProduct();
      })
      .catch(err => {
        console.log('an error occured', err);
      });
    // navigation('/create-products');
  };

  const encodedProductName = devices => {
    return encodeURIComponent(devices.ProductName);
  };

  const getProductDetails = product => {
    console.log('product', product);
    setProductDetails(product);
  };

  // console.log('productDetails', productDetails);

  return (
    <main className="parentProductList">
      <div className="productListMain">
        <h3>List of products (update and delete products)</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">s/n</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Category</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Quantity</th>
              <th scope="col">Created By</th>
              <th scope="col">Date Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {allActiveProducts &&
              allActiveProducts.map((product, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.ProductName}</td>
                  <td>{product.CategoryName}</td>
                  <td>{product.ProductPrice}</td>
                  <td>{product.ProductQuantity}</td>
                  <td style={{whiteSpace: "nowrap"}}>{product.UserLastName} {product.UserFirstName}</td>
                  <td style={{whiteSpace: "nowrap"}}>{moment(product.createdDate).format('MMMM Do, YYYY, h:mm A')}</td>
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
                        product options
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <Link
                            to={`/admin-dashboard/create-products/${product.ProductID}/${encodedProductName(product)}`}
                            state={{ product: product }}
                            className="dropdown-item"
                          >
                            Update product
                          </Link>
                        </li>
                        <li>
                          <span
                            className="dropdown-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => actionOnclick(product)}
                          >
                            Delete product
                          </span>
                        </li>
                        <li>
                          {product.ProductQuantity > 0 ? (
                            <Link
                              to={`/admin-dashboard/product-purchase/${product.ProductID}/${encodedProductName(
                                product
                              )}`}
                              state={{ product: product }}
                              style={{ cursor: 'pointer' }}
                              className="dropdown-item"
                            >
                              Place Order
                            </Link>
                          ) : (
                            <span className="dropdown-item" style={{ color: 'gray', cursor: 'not-allowed' }}>
                              Out of Stock
                            </span>
                          )}
                        </li>
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

export default ProductList;
