import { useEffect, useState } from "react";
import useProducts from "./useProducts";
import { getStoredCart } from "../Shared/Components/LocalStorage";

const useCart = () => {
  const [products] = useProducts();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const shoppingCart = getStoredCart();
    const savedCart = [];
    for (const id in shoppingCart) {
      const cartProducts = products.find((product) => product._id === id);
      if (cartProducts) {
        cartProducts.quantity = shoppingCart[id];
        savedCart.push(cartProducts);
      }
    }
    setCart(savedCart);
  }, [products]);

  return [cart, setCart];
};

export default useCart;
