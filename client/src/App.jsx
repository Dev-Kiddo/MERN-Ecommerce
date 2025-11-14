import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import RegisterUser from "./pages/RegisterUser";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loaduser } from "./features/user/userSlice";

import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import ShippingDetails from "./pages/ShippingDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProcessPayment from "./components/ProcessPayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyOrders from "./pages/MyOrders";
import OrderPreview from "./pages/OrderPreview";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DashboardCard from "./components/DashboardCard";
import AdminProducts from "./components/AdminProducts";
import CreateNewProduct from "./components/CreateNewProduct";
import UpdateProduct from "./components/UpdateProduct";
import About from "./pages/About";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // console.log(user);

  useEffect(
    function () {
      if (isAuthenticated) {
        dispatch(loaduser());
      }
    },
    [dispatch, isAuthenticated]
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderPreview />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute user={user} isAuthenticated={isAuthenticated} isAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardCard />} />
            <Route path="allproducts" element={<AdminProducts />} />
            <Route path="createproduct" element={<CreateNewProduct />} />
          </Route>

          <Route
            path="/shipping"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShippingDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/process/payment"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProcessPayment user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateuser"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile user={user} />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserDashboard user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/paymentsuccess"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
