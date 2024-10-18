import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, json } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './updateProduct.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ProductUploadLoader } from '../../Utilities/Loader';

const ProductPurchase = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [message, setMessage] = useState('');
  const location = useLocation();
  const product = location.state?.product;
  const navigation = useNavigate();

  const viewProductList = () => {
    navigation('/admin-dashboard/product-list');
  };

  console.log('product', product);
  // const { product } = location.state || {};
  const userInformation = JSON.parse(localStorage.getItem('admininformation'));

  // console.log("product", product)
  const formik = useFormik({
    initialValues: {
      ProductName: product?.ProductName || '',
      ProductPrice: product?.ProductPrice || 0,
      ProductOrderQuantity: 1,
      productID: product?.ProductID,
      totalPrice: product?.ProductPrice || 0,
    },
    validationSchema: Yup.object({
      ProductOrderQuantity: Yup.number().min(1, 'Quantity must be at least 1').required('Required'),
    }),
    onSubmit: async values => {
      setShowLoading(true);
      let OrderTotalAmount = values.totalPrice;
      const mainArray = [];

      mainArray.push(values);

      const productDetails = {
        OrderTotalAmount,
        orderItems: mainArray,
      };

      // console.log('Form data mainArray:', productDetails);

      await axios
        .post(`http://localhost:3001/api/v1/productPurchase/orderProducts/${userInformation.UserID}`, productDetails)
        .then(res => {
          if (res && res.data.success === true) {
            setShowLoading(false);
            setShowMessage(true);
            setMessage(res.data.message);
            console.log('order product res', res);
          } else {
            setShowLoading(false);
            setShowMessage(true);
            setMessage(res.data.message);
            console.log('order product res', res);
          }
        })
        .catch(err => {
          console.log('an error occured', err);
        });
    },
    // validate: values => {
    //   const totalPrice = values.ProductPrice * values.ProductOrderQuantity;
    //   return { ...values, totalPrice };
    // },
  });

  useEffect(() => {
    formik.setFieldValue('totalPrice', formik.values.ProductPrice * formik.values.ProductOrderQuantity);
  }, [formik.values.ProductPrice, formik.values.ProductOrderQuantity, product]);
  return (
    <main className="purchaseMain">
      <div className="productPurchaseDiv">
        {showLoading ? (
          <ProductUploadLoader />
        ) : (
          <>
            <h1 className="">Product Details</h1>
            {showMessage && <p className="successMessage">{message}</p>}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 productimagediv">
                <label className="form-label">Product Image</label>
                <img src={product?.ProductImage} alt="Product" />
              </div>
              <div className="purchasefileddiv">
                <div className="mb-3 prodcutNameDiv">
                  <label className="form-label">Product Name</label>
                  <input
                    name="ProductName"
                    id="ProductName"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ProductName} // Use formik.values.productName
                    readOnly
                  />
                </div>
                <div className="mb-3 prodcutNameDiv">
                  <label className="form-label">Product Price</label>
                  <input
                    name="ProductPrice"
                    id="ProductPrice"
                    type="number"
                    className="form-control"
                    value={formik.values.ProductPrice} // Use formik.values.productPrice
                    readOnly
                  />
                </div>
              </div>
              <div className="purchasefileddiv">
                <div className="mb-3 prodcutNameDiv">
                  <label className="form-label">Adjust Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    name="ProductOrderQuantity"
                    value={formik.values.ProductOrderQuantity}
                    onChange={formik.handleChange}
                  />
                  {/* {formik.errors.ProductOrderQuantity ? <div className="error">{formik.errors.ProductOrderQuantity}</div> : null} */}
                </div>
                <div className="mb-3 prodcutNameDiv">
                  <label className="form-label">Total Price</label>
                  <input type="number" className="form-control" value={formik.values.totalPrice} readOnly />
                </div>
              </div>
              <span
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-info"
                style={{ color: 'white' }}
              >
                view product details
              </span>
              <div className="buynowDiv">
                <button onClick={viewProductList} className="btn btn-secondary">
                  Product List
                </button>
                <button type="submit" className="btn btn-primary">
                  Buy Product
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Product Details
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">{product?.ProductLongDesc}</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPurchase;
