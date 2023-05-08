// function to store cart to local storage //
const addToLocalStorage = (id) => {
  let shoppingCart = {};

  // get the pre-stored cart if any //
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.stringify(storedCart);
  }

  // increase quantity of that product //
  let quantity = shoppingCart[id];
  if (quantity) {
    quantity += 1;
    shoppingCart[id] = quantity;
  } else {
    shoppingCart[id] = 1;
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};
