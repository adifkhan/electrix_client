import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  let shoppingCart = {};

  //get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  setCart(shoppingCart);

  return [cart, setCart];
};

export default useCart;
