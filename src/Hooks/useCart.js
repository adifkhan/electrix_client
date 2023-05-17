import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const email = user.email;

      fetch(`http://localhost:5000/product-cart?email=${email}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
    }
  }, [user]);

  return [cart];
};

export default useCart;
