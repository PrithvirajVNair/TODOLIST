import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import UserHome from "./users/pages/UserHome";
import ViewDetails from "./users/pages/ViewDetails";
import { Bounce, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Auth register />} />
        <Route path="/login" element={<Auth login />} />

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<UserHome />} />
        <Route path="/task/:id/details" element={<ViewDetails />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
