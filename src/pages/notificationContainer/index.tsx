import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContainer = () => {
  return (
    <ToastContainer
      transition={Slide}
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
      style={{ fontSize: "15px", fontWeight: "400" }}
    />
  );
};
