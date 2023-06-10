import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Services from "./pages/Services.jsx";
import SignUp from "./pages/SignUp.jsx";
import NavBar from "./components/NavBar.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import ResPas from "./pages/ResetPasword.jsx";
import Footer from "./components/Footer.jsx";
import ContactPage from "./pages/Contact.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/passreset" element={<ResPas />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
