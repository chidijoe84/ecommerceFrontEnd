import React, { useEffect, useState } from 'react';
import './CreateCategories.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import DeleteCategory from './DeleteCategory';
import UpdateCategory from './UpdateCategory';
import moment from 'moment';
// import UpdateProduct from './ProductList';

const CreateCategories = () => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  // const [allCategory, setAllCategory] = useState();
  const userInformation = JSON.parse(localStorage.getItem('admininformation'));

  const formik = useFormik({
    initialValues: {
      UserID: userInformation.UserID,
      CategoryName: '',
    },
    validationSchema: Yup.object({
      CategoryName: Yup.string().required('Product name is required'),
    }),

    onSubmit: async values => {
      try {
        console.log('Form values', values);

        const response = await axios.post('http://localhost:3001/api/v1/category/createCategory', values);
        if (response && response.data) {
          console.log('Product category created successfully', response.data);
          getCategoryDetials();
        } else {
          console.log('Product category not created');
        }
      } catch (err) {
        console.error('Error while creating product category:', err);
        // You can show an error message to the user
      }
    },
  });

  const getCategoryDetials = async () => {
    const categoryDetails = await axios
      .get(`http://localhost:3001/api/v1/category/categoryDetails`)
      .then(res => {
        setCategoryDetails(res.data.categoriesDetails);
        console.log('allcateDetails', res.data);
      })
      .catch(err => console.log('an error occured ', err));
  };

  useEffect(() => {
    getCategoryDetials();
  }, []);

  const deleteCategory = async category => {
    await axios.delete(`http://localhost:3001/api/v1/category/deleteCategory/${category.CategoryID}`);

    getCategoryDetials();
  };

  // const updateCategory = async category => {
  //   try {
  //     console.log('Form values', category);
  //     if (category.CategoryID) {
  //       const response = await axios.post(
  //         `http://localhost:3001/api/v1/category/updateCategory/${category.CategoryID}`,
  //         category
  //       );

  //       if (response && response.data) {
  //         console.log('Product category updated successfully', response.data);
  //         getCategoryDetials();
  //       } else {
  //         console.log('Product category not updated');
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Error while updating product category:', err);
  //     // You can show an error message to the user
  //   }
  // };

  const onHandleChange = e => {
    const selectedCategoryID = e.target.value;

    // console.log('selectedCategoryID', selectedCategoryID);

    const selectedCategory = categoryDetails.find(category => category.CategoryID === selectedCategoryID);

    console.log('selectedCategoryID', selectedCategory);
    // If the category is found, update the CategoryName in Formik
    if (selectedCategory) {
      formik.setFieldValue('CategoryName', selectedCategory.CategoryName);
    }
  };


  const formikUpdate = useFormik({
    initialValues: {
      ProductCategoryID: '',
      CategoryName: '',
    },
    validationSchema: Yup.object({
      ProductCategoryID: Yup.string().required('category is required'),
      CategoryName: Yup.string().required('category name is required'),
    }),

    onSubmit: async values => {
      try {
        console.log('Form values', values);
        if (values.ProductCategoryID) {
          const response = await axios.post(
            `http://localhost:3001/api/v1/category/updateCategory/${values.ProductCategoryID}`,
            values
          );

          if (response && response.data) {
            console.log('Product category updated successfully', response.data);
            getCategoryDetials();
          } else {
            console.log('Product category not updated');
          }
        }
      } catch (err) {
        console.error('Error while updating product category:', err);
        // You can show an error message to the user
      }
    },
  });

  return (
    <main className="categoryMainDiv">
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <h3>Create New Category</h3>
          <div className="categoryForm">
            <div className="inputField">
              <label className="form-label">Enter Category Name</label>
              <input
                type="text"
                className="form-control"
                id="CategoryName"
                name="CategoryName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.CategoryName}
              />
              {formik.touched.CategoryName && formik.errors.CategoryName ? (
                <div className="text-danger">{formik.errors.CategoryName}</div>
              ) : null}
            </div>
            <button type="submit" className="createCategorybtn">
              Submit
            </button>
          </div>
        </form>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">s/n</th>
              <th scope="col">Category Name</th>
              <th scope="col">Created By</th>
              <th scope="col">Date Created</th>
              <th scope="col">No of Product</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {categoryDetails &&
              categoryDetails?.map((category, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.CategoryName}</td>
                  <td>
                    {category.UserFirstName} {category.UserLastName}
                  </td>
                  <td>{moment(category.createdDate).format('MMMM Do, YYYY, h:mm A')}</td>
                  <td>{category.NoOfProduct}</td>

                  <td>
                    <div className="btn-group">
                      <button
                        class="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        category options
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <span
                            style={{ cursor: 'pointer' }}
                            className="btn btn-primary dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            Update category
                          </span>
                        </li>
                        <li>
                          <span
                            className="dropdown-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => deleteCategory(category)}
                          >
                            Delete delete
                          </span>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  update category
                </h1>
              </div>
              <div class="modal-body">
                <form onSubmit={formikUpdate.handleSubmit} className="categoryForm">
                  <div className="inputField">
                    <label className="form-label">Select Category Name</label>
                    <select
                      className="form-control"
                      id="ProductCategoryID"
                      name="ProductCategoryID"
                      onChange={e => {
                        formikUpdate.handleChange(e);
                        onHandleChange(e);
                      }}
                      onBlur={formikUpdate.handleBlur}
                      value={formikUpdate.values.ProductCategoryID}
                      onClick={getCategoryDetials}
                    >
                      <option value="">select old category</option>
                      {categoryDetails &&
                        categoryDetails.map((category, index) => (
                          <option value={category.CategoryID} key={index}>
                            {category.CategoryName}
                          </option>
                        ))}
                    </select>
                    {formikUpdate.touched.ProductCategoryID && formikUpdate.errors.ProductCategoryID ? (
                      <div className="text-danger">{formikUpdate.errors.ProductCategoryID}</div>
                    ) : null}
                  </div>
                  <div className="inputField">
                    <label className="form-label">Enter New Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="CategoryName"
                      name="CategoryName"
                      placeholder="Enter Product Name"
                      onChange={formikUpdate.handleChange}
                      onBlur={formikUpdate.handleBlur}
                      value={formikUpdate.values.CategoryName}
                    />
                    {formikUpdate.touched.CategoryName && formikUpdate.errors.CategoryName ? (
                      <div className="text-danger">{formikUpdate.errors.CategoryName}</div>
                    ) : null}
                  </div>
                  <button type="submit" className="deleteCategorybtn" data-bs-dismiss="modal">
                    Update
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  cancel
                </button>
               
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <h3>Delete Existing Category</h3>
          <DeleteCategory />
        </div>

        <div>
          <h3>Update product category</h3>
          <UpdateCategory />
        </div> */}
      </div>
    </main>
  );
};

export default CreateCategories;
