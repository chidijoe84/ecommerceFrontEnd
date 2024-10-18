import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateCategories from './components/AdminDashboard/CreateCategories/CreateCategories';
import ProductList from './components/AdminDashboard/CreateCategories/ProductList';
import ProductPurchase from './components/AdminDashboard/CreateCategories/ProductPurchase';
import CreateProducts from './components/AdminDashboard/CreateProducts/CreateProducts';
import Main from './components/AdminDashboard/main/Main';
import CustomerPurchaseDetails from './components/AdminDashboard/ViewProductOrder/CustomerPurchaseDetails';
import ViewProductOrder from './components/AdminDashboard/ViewProductOrder/ViewProductOrder';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/Registration/ForgotPassword';
import Login from './components/Registration/Login';
import Registration from './components/Registration/Registration';
import { Routes, Route, Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Main />} />
          <Route path="create-products/:productId?/:name?" element={<CreateProducts />} />
          <Route path="create-products-category" element={<CreateCategories />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product-order-list" element={<ViewProductOrder />} />
          <Route path="user-order-list/:userId/:date" element={<CustomerPurchaseDetails />} />
          <Route path="product-purchase/:productId/:productname" element={<ProductPurchase />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
