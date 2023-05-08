import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Shared/Header/Header";
import Login from "./Pages/LogIn/Login";
import Footer from "./Shared/Footer/Footer";
import SignUp from "./Pages/LogIn/SignUp";
import Products from "./Pages/Products/Products";

function App() {
  return (
    <div className="mx-auto max-w-[1535px]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
