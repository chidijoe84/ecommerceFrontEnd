import React, { useState } from 'react';
import './Registration.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../Utilities/Loader';

const Registration = () => {
  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserFirstName: '',
      UserLastName: '',
      UserEmail: '',
      UserPhone: '',
      UserPassword: '',
      UserState: '',
      UserCity: '',
      UserAddress: '',
    },
    validationSchema: Yup.object({
      UserFirstName: Yup.string().required('First name is required'),
      UserLastName: Yup.string().required('Last name is required'),
      UserEmail: Yup.string().email('Invalid email address').required('Email is required'),
      UserPhone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
      UserPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      UserState: Yup.string().required('State is required'),
      UserCity: Yup.string().required('City is required'),
      UserAddress: Yup.string().required('Address is required'),
    }),
    onSubmit: async values => {
      console.log('values', values);
      setShowLoader(true);
      await axios
        .post('http://localhost:3001/api/v1/userRegistration/registerUsers', values)
        .then(res => {
          if (res.data.success === true) {
            setShowLoader(false);
            navigation('/');
            console.log('Registration successful', res);
          } else {
            setTimeout(() => {
              setShowLoader(false);
            }, 5000);
            setShowError(true);
            console.log('Registration failed:', res.data.message);
          }
        })
        .catch(err => console.log('Error creating user:', err));
    },
  });
  return (
    <div className="parentRegister">
      <div className="registerWrapper">
        <form onSubmit={formik.handleSubmit}>
          <h1>Registration</h1>
          {showError && <div className="error">a User already exist with these details</div>}
          <div className="input_box">
            <div className="input_field">
              <input
                value={formik.values.UserFirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserFirstName"
                id="UserFirstName"
                type="text"
                placeholder="UserFirstName"
                required
              />
              <i class="bx bxs-user"></i>
            </div>
            <div className="input_field">
              <input
                value={formik.values.UserLastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserLastName"
                id="UserLastName"
                type="text"
                placeholder="UserLastName"
                required
              />
              <i class="bx bxs-user"></i>
            </div>
          </div>

          <div className="input_box">
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
                value={formik.values.UserPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserPhone"
                id="UserPhone"
                type="number"
                placeholder="phone number"
                required
              />
              <i class="bx bxs-phone"></i>
            </div>
          </div>

          <div className="input_box">
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
            <div className="input_field">
              <input
                value={formik.values.UserState}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserState"
                id="UserState"
                type="text"
                placeholder="UserState"
                required
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
          </div>
          <div className="input_box">
            <div className="input_field">
              <input
                value={formik.values.UserCity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserCity"
                id="UserCity"
                type="text"
                placeholder="UserCity"
                required
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div className="input_field">
              <input
                value={formik.values.UserAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="UserAddress"
                id="UserAddress"
                type="text"
                placeholder="UserAddress"
                required
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
          </div>

          {/* <label>
            <input type="checkbox" /> I hereby declare that the above information provided is true and correct
          </label> */}

          {showLoader ? (
            <button className="btn">
              <Loader />
            </button>
          ) : (
            <button type="submit" className="btn">
              Register
            </button>
          )}
        </form>
        <p style={{marginTop: "2%"}}>
         
          have an account? <Link className="Link" to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
