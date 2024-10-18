import React,{useState} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const DeleteCategory = () => {
  const [allCategory, setAllCategory] = useState();

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

  const formik = useFormik({
    initialValues: {
      ProductCategoryID: '',
    },
    validationSchema: Yup.object({
      ProductCategoryID: Yup.string().required('category is required'),
    }),

    onSubmit: async values => {
      try {
        console.log('Form values', values);
        if (values.ProductCategoryID) {
          const response = await axios.delete(
            `http://localhost:3001/api/v1/category/deleteCategory/${values.ProductCategoryID}`
          );

          if (response && response.data) {
            console.log('Product category created successfully', response.data);
            getAllCategory()
          } else {
            console.log('Product category not created');
          }
        }
      } catch (err) {
        console.error('Error while creating product category:', err);
        // You can show an error message to the user
      }
    },
  });

  return (
    <form  onSubmit={formik.handleSubmit} className="categoryForm">
      <div className="inputField">
        <label className="form-label">Select Category Name</label>
        <select
          className="form-control"
          id="ProductCategoryID"
          name="ProductCategoryID"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ProductCategoryID}
          onClick={getAllCategory}
        >
          <option value="">select a category</option>
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
      <button type="submit" className="deleteCategorybtn">
        Delete
      </button>
    </form>
  );
};

export default DeleteCategory;
