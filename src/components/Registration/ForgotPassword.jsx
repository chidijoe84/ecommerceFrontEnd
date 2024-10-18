import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../Utilities/Loader';

const ForgotPassword = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserEmail: '',
      UserPassword: '',
    },
    validationSchema: Yup.object({
      UserEmail: Yup.string().email('Invalid email address').required('Email is required'),
      UserPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: async values => {
      setShowLoading(true);
      await axios
        .post('http://localhost:3001/api/v1/userLogin/forgotPassword', values)
        .then(res => {
          console.log('res first', res);
          if (res.data.success === true) {
            setShowMessage(true);
            setShowLoading(false);
            navigation('/');
            console.log('res secon', res);
          } else {
            console.log('cant login');
            setShowLoading(false);
          }
        })
        .catch(err => console.log('error creating user', err));
    },
  });
  return (
    <div className="parentRegister">
      <div className="registerWrapper">
        <form onSubmit={formik.handleSubmit}>
          <h1>Forgot Password</h1>
          {showMessage && <p>password updated successfully</p>}

          <div className="input_box_login">
            <div className="input_field">
              <input
                value={formik.values.UserEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserEmail"
                id="UserEmail"
                type="email"
                placeholder="Email address"
                required
              />
              <i className="bx bxs-envelope"></i>
              {formik.touched.UserEmail && formik.errors.UserEmail && (
                <div className="error_message">{formik.errors.UserEmail}</div>
              )}
            </div>

            <div className="input_field">
              <input
                value={formik.values.UserPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserPassword"
                id="UserPassword"
                type="password"
                placeholder="New password"
                required
              />
              <i className="bx bxs-lock-alt"></i>
              {formik.touched.UserPassword && formik.errors.UserPassword && (
                <div className="error_message">{formik.errors.UserPassword}</div>
              )}
            </div>
          </div>

          {showLoading ? (
            <button className="btn">
              <Loader />
            </button>
          ) : (
            <button type="submit" className="btn">
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
