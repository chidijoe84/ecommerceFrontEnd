import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../Utilities/Loader';

const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState('');
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
        .post('http://localhost:3001/api/v1/userLogin/', values)
        .then(res => {
          console.log('res first', res);
          if (res.data.success === true) {
            setShowLoading(false);
            // setShowMessage(true);
            setMessage(res.data.message);
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('admininformation', JSON.stringify(res.data.userInformation));
            navigation('/admin-dashboard');
            console.log('res secon', res);
          } else {
            console.log('cant login');
            console.log(res.data.message);
            setShowLoading(false);
            setShowMessage(true);
            setMessage(res.data.message);
          }
        })
        .catch(err => console.log('error creating user', err));

      // setLoader(false)
    },
  });
  return (
    <div className="parentRegister">
      <div className="registerWrapper">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          {showMessage && <p className="error">{message}</p>}
          <div className="input_box_login">
            <div className="input_field">
              <input
                value={formik.values.UserEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserEmail"
                id="UserEmail"
                type="email"
                placeholder="email address"
                required
              />
              <i class="bx bxs-envelope"></i>
            </div>
            <div className="input_field">
              <input
                value={formik.values.UserPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserPassword"
                id="UserPassword"
                type="password"
                placeholder="password"
                required
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
          </div>

          {showLoading ? (
            <button className="btn">
              <Loader />
            </button>
          ) : (
            <button type="submit" className="btn">
              Login
            </button>
          )}
          <div className="registerorlogindiv">
            <p>
              don't have an account?{' '}
              <Link className="Link" to="/registration">
                Register
              </Link>
            </p>
            <p>
              <Link className="Link" to="/forgot-password">
                forgot password ?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
