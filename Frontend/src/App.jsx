import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import PageTitle from "./components/PageTitle";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Loading from "./components/Loading";
import Header from "./components/Header";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AllServicesPage from "./pages/AllServicesPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AddService from "./components/AddService.jsx";
import Footer from "./components/Footer/index.jsx";
import LogOut from "./components/LogOut";
import ServiceCard from "./components/ServiceCard";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div className="app">
      <PageTitle />
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<AllServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:nickname" element={<ProfilePage />} />
        <Route path="/service/:id" element={<ServiceCard />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile/:nickname" element={<ProfilePage />} />
          <Route path="/addService" element={<AddService />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
