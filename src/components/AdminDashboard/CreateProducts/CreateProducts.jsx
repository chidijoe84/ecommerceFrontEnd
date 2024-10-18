import React, { useEffect, useState } from 'react';
import './CreateProducts.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductUploadLoader } from '../../Utilities/Loader';

const CreateProducts = () => {
  const [allCategory, setAllCategory] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [message, setMessage] = useState('');
  const location = useLocation();
  const { productId } = useParams();
  const userInformation = JSON.parse(localStorage.getItem('admininformation'));

  const { product } = location.state || {};

  console.log('products pass', product);

  useEffect(() => {
    const getAllCategory = async () => {
      return await axios
        .get('http://localhost:3001/api/v1/category/getcategories')
        .then(res => {
          console.log('my respons', res);
          setAllCategory(res.data.allCategories);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getAllCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      ProductName: product ? product.ProductName : '',
      ProductPrice: product ? product.ProductPrice : '',
      ProductShortDesc: product ? product.ProductShortDesc : '',
      ProductLongDesc: product ? product.ProductLongDesc : '',
      ProductImage: product ? product.ProductImage : '',
      ProductCategoryID: product ? product.ProductCategoryID : '', // Use ProductCategoryID
      ProductQuantity: product ? product.ProductQuantity : '',
      ProductLocation: product ? product.ProductLocation : '',
      CreatedBy: userInformation?.UserID,
    },
    validationSchema: Yup.object({
      ProductName: Yup.string().required('Product name is required'),
      ProductPrice: Yup.number()
        .typeError('Price must be a number')
        .min(0, 'Price must be a positive number')
        .required('Product price is required'),
      ProductShortDesc: Yup.string()
        .max(150, 'Short description must be 150 characters or less')
        .required('Short description is required'),
      ProductLongDesc: Yup.string().required('Long description is required'),
      ProductCategoryID: Yup.string().required('Product category ID is required'),
      ProductQuantity: Yup.number()
        .typeError('Quantity must be a number')
        .min(1, 'Quantity must be at least 1')
        .required('Product quantity is required'),
      ProductLocation: Yup.string().required('Product location is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setShowLoading(true);
        if (selectedImage) {
          const formData = new FormData();
          formData.append('file', selectedImage);
          formData.append('upload_preset', 'e-commerce-product-images');
          formData.append('cloud_name', 'dac04azc4');

          const cloudinaryresponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dac04azc4/image/upload',
            formData
          );

          values.ProductImage = cloudinaryresponse.data.secure_url;
        }

        console.log('Form values', values);
        if (productId) {
          // Update existing product
          const response = await axios.post(`http://localhost:3001/api/v1/products/updateProduct/${productId}`, values);
          setShowLoading(false);
          if (response && response.data.success === true) {
            setShowMessage(true);
            setMessage(response.data.message);
            console.log('Product updated successfully', response.data);
            resetForm();
          } else {
            setShowLoading(false);
            setShowMessage(true);
            setMessage(response.data.message);
            console.log('Product not updated');
          }
        } else {
          // Create new product
          const response = await axios.post('http://localhost:3001/api/v1/createProducts/', values);
          setShowLoading(false);
          if (response && response.data.success === true) {
            setShowMessage(true);
            setMessage(response.data.message);
            console.log('Product created successfully', response.data);
            // Reset form fields to initial values
            resetForm();
          } else {
            setShowLoading(false);
            setShowMessage(true);
            setMessage(response.data.message);
            console.log('Product not created');
          }
        }
      } catch (err) {
        console.error('Error while creating/updating product:', err);
      }
    },
  });

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="createProductParent">
      {showLoading ? (
        <ProductUploadLoader />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {showMessage && <p className="successMessage">{message}</p>}
          <div className="inputfieldContainer">
            <div className="inputField">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="ProductName"
                name="ProductName"
                placeholder="Enter Product Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductName}
              />
              {formik.touched.ProductName && formik.errors.ProductName ? (
                <div className="text-danger">{formik.errors.ProductName}</div>
              ) : null}
            </div>

            <div className="inputField">
              <label className="form-label">Product Category</label>
              <select
                className="form-control"
                id="ProductCategoryID"
                name="ProductCategoryID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductCategoryID}
              >
                <option value="">{product ? product.CategoryName : 'select category'}</option>
                {allCategory &&
                  allCategory.map((category, index) => (
                    <option value={category.CategoryID} key={index}>
                      {category.CategoryName}
                    </option>
                  ))}
              </select>
              {formik.touched.ProductCategoryID && formik.errors.ProductCategoryID ? (
                <div className="text-danger">{formik.errors.ProductCategoryID}</div>
              ) : null}
            </div>
          </div>

          <div className="inputfieldContainer">
            <div className="inputField">
              <label className="form-label">Product Price</label>
              <input
                type="text"
                className="form-control"
                id="ProductPrice"
                name="ProductPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductPrice}
              />
              {formik.touched.ProductPrice && formik.errors.ProductPrice ? (
                <span className="text-danger">{formik.errors.ProductPrice}</span>
              ) : null}
            </div>

            <div className="inputField">
              <label className="form-label">Product Short Description</label>
              <input
                type="text"
                className="form-control"
                id="ProductShortDesc"
                name="ProductShortDesc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductShortDesc}
              />
              {formik.touched.ProductShortDesc && formik.errors.ProductShortDesc ? (
                <div className="text-danger">{formik.errors.ProductShortDesc}</div>
              ) : null}
            </div>
          </div>

          <div className="inputfieldContainer">
            <div className="inputField">
              <label className="form-label">Product Long Description</label>
              <input
                type="text"
                className="form-control"
                id="ProductLongDesc"
                name="ProductLongDesc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductLongDesc}
              />
              {formik.touched.ProductLongDesc && formik.errors.ProductLongDesc ? (
                <div className="text-danger">{formik.errors.ProductLongDesc}</div>
              ) : null}
            </div>

            <div className="inputField">
              <label className="form-label">Product Image URL</label>
              <input
                type="file"
                className="form-control"
                id="ProductImage"
                name="ProductImage"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                // value={formik.values.ProductImage}
              />
              {formik.touched.ProductImage && formik.errors.ProductImage ? (
                <div className="text-danger">{formik.errors.ProductImage}</div>
              ) : null}
            </div>
            {imagePreview || product ? (
              <div className="previewDiv">
                {showLoading ? (
                  'Loading......'
                ) : (
                  <img src={product ? product.ProductImage : imagePreview} alt="Preview" className="img-preview" />
                )}
              </div>
            ) : null}
          </div>

          <div className="inputfieldContainer">
            <div className="inputField">
              <label className="form-label">Product Quantity</label>
              <input
                type="text"
                className="form-control"
                id="ProductQuantity"
                name="ProductQuantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductQuantity}
              />
              {formik.touched.ProductQuantity && formik.errors.ProductQuantity ? (
                <div className="text-danger">{formik.errors.ProductQuantity}</div>
              ) : null}
            </div>

            <div className="inputField">
              <label className="form-label">Product Location</label>
              <input
                type="text"
                className="form-control"
                id="ProductLocation"
                name="ProductLocation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ProductLocation}
              />
              {formik.touched.ProductLocation && formik.errors.ProductLocation ? (
                <div className="text-danger">{formik.errors.ProductLocation}</div>
              ) : null}
            </div>
          </div>

          <button type="submit" className="createprodcutbtn">
            {product ? 'update product' : 'create product'}
          </button>
        </form>
      )}
    </main>
  );
};

export default CreateProducts;
