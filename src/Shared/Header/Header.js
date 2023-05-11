import React from "react";
import HeaderTop from "./HeaderTop";
import Navbar from "./Navbar";
import CartModal from "./CartModal/CartModal";

const Header = () => {
  return (
    <nav>
      <HeaderTop />
      <Navbar />
      <CartModal />
    </nav>
  );
};

export default Header;
