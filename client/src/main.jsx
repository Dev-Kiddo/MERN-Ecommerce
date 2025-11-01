import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import App from "./App.jsx";

import { store } from "./app/store.js";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
