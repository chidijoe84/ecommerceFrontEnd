import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const UpdateCategory = () => {
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
            getAllCategory();
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

  const onHandleChange = e => {
    const selectedCategoryID = e.target.value;

    // console.log('selectedCategoryID', selectedCategoryID);

    const selectedCategory = allCategory.find(category => category.CategoryID === selectedCategoryID);

    console.log('selectedCategoryID', selectedCategory);
    // If the category is found, update the CategoryName in Formik
    if (selectedCategory) {
      formik.setFieldValue('CategoryName', selectedCategory.CategoryName);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} className="categoryForm">
      <div className="inputField">
        <label className="form-label">Select Category Name</label>
        <select
          className="form-control"
          id="ProductCategoryID"
          name="ProductCategoryID"
          onChange={e => {
            formik.handleChange(e);
            onHandleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.ProductCategoryID}
          onClick={getAllCategory}
        >
          <option value="">select old category</option>
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
      <div className="inputField">
        <label className="form-label">Enter New Category Name</label>
        <input
          type="text"
          className="form-control"
          id="CategoryName"
          name="CategoryName"
          placeholder="Enter Product Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.CategoryName}
        />
        {formik.touched.CategoryName && formik.errors.CategoryName ? (
          <div className="text-danger">{formik.errors.CategoryName}</div>
        ) : null}
      </div>
      <button type="submit" className="deleteCategorybtn">
        Update
      </button>
    </form>
  );
};

export default UpdateCategory;

// <table class="table">
//           <thead>
//             <tr>
//               <th scope="col">s/n</th>
//               <th scope="col">Product Name</th>
//               <th scope="col">Product Category</th>
//               <th scope="col">Product Price</th>
//               <th scope="col">Product Quantity</th>
//               <th scope="col">Date Created</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody class="table-group-divider">
//             {allCategory &&
//               allCategory.map((category, index) => (
//                 <tr key={index}>
//                   <th scope="row">{index + 1}</th>
               
//                   <td>{category.CategoryName}</td>
                 
//                   <td>{moment(category.createdDate).format('MMMM Do, YYYY, h:mm A')}</td>
//                   <td>
                   
//                     <div className="btn-group">
//                       <button
//                         class="btn btn-primary dropdown-toggle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         product options
//                       </button>
//                       <ul class="dropdown-menu">
//                         <li>
//                           <Link
//                             to={`/admin-dashboard/create-products/${category.ProductID}/${encodedProductName(category)}`}
//                             state={{ category: category }}
//                             className="dropdown-item"
//                           >
//                             Update category
//                           </Link>
//                         </li>
//                         <li>
//                           <span
//                             className="dropdown-item"
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => actionOnclick(category)}
//                           >
//                             Delete category
//                           </span>
//                         </li>
                       
//                       </ul>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
