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
import Profile from "./pages/Profile";
import UpdateProfile from "./components/UpdateProfile";

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
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
