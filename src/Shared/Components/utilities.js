import { signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';

// function to store cart to local storage //
const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};

// functon for signout and remove token //
const logOut = () => {
  localStorage.removeItem('accessToken');
  return signOut(auth);
};

//function for remonve items from database //
const removeFromDb = (id) => {
  const storedCart = localStorage.getItem('shopping-cart');
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem('shopping-cart');
};

export { getToken, logOut, removeFromDb, deleteShoppingCart };
