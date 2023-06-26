import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

// import ServicesList from "./components/ServicesList.jsx"
// import Header from "./components/Header.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";

//import Loading from "./components/Loading";
import Header from "./components/Header";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AllServicesPage from "./pages/AllServicesPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ResPas from "./pages/ResetPasword.jsx";
// import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AddService from "./pages/AddService.jsx";
import Footer from "./components/Footer/index.jsx";
import Shopping from "./pages/Shopping.jsx";
import LogOut from "./pages/LogOut";
import ServiceDetail from "./pages/ServiceDetail";
//import CommentForm from "./components/CommentForm";
//import CommentCard from "./components/CommentCard";

function App() {
  return (
    <div className="app">
      {/*<CommentForm onCommentSubmit={handleCommentSubmit}*/}
      {/*<CommentCard key={index} comment={comment} />*/}
      {/* <ServicesList /> */}

      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Routes>
        {/* <Route path="/shopping" element={<Shopping />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<AllServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/passreset" element={<ResPas />} />
         <Route path="/service/:id" element={<ServiceDetail />} /> 
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addService" element={<AddService />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
