import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";

import Header from "./components/Header.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Services from "./pages/Services.jsx";
import SignUp from "./pages/SignUp.jsx";
import ResPas from "./pages/ResetPasword.jsx";
import Footer from "./components/Footer/index.jsx";
import ContactPage from "./pages/Contact.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import NewService from "./pages/NewService.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header user={user} />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/passreset" element={<ResPas />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/newService" element={<NewService />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
