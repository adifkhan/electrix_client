import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Shared/Header/Header";
import Login from "./Pages/LogIn/Login";
import Footer from "./Shared/Footer/Footer";
import SignUp from "./Pages/LogIn/SignUp";
import Products from "./Pages/Products/Products";
import CheckOut from "./Pages/CheckOut/CheckOut";
import { ToastContainer } from "react-toastify";
import AddProduct from "./Pages/Products/AddProduct/AddProduct";

function App() {
  return (
    <div className="mx-auto max-w-[1535px]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
