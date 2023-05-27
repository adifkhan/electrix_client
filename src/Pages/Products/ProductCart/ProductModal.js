import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import auth from "../../../Firebase/firebase.init";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ markedProduct, setMarkedProduct, refetch }) => {
  const [quantity, setQuantity] = useState(1);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // function for adding products to the cart starts here //
  const handleAddToCart = () => {
    if (user) {
      const cartProduct = {
        email: user.email,
        productId: markedProduct._id,
        name: markedProduct.name,
        category: markedProduct.category,
        price: markedProduct.price,
        img: markedProduct.img,
        seller: markedProduct.seller,
        sellerId: markedProduct.sellerId,
        shipping: markedProduct.shipping,
        quantity: quantity,
      };
      fetch(`http://localhost:5000/addtocart?email=${user.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(cartProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged === true) {
            toast.success(`${markedProduct.name} is added to cart!`);
            setMarkedProduct(null);
            refetch();
          }
        });
    } else {
      setMarkedProduct(null);
      navigate("/login");
    }
  };
  // function for adding products to the cart ends here //

  return (
    <div className="max-w-xs relative">
      <input type="checkbox" id="product-modal" className="modal-toggle" />
      <label
        htmlFor="product-modal"
        className="modal cursor-pointer bg-black bg-opacity-5 backdrop-blur-sm"
      >
        <label className="modal-box" htmlFor="">
          <div className="flex flex-col sm:flex-row justify-around">
            <div className="flex flex-col items-center">
              <img className="w-24" src={markedProduct.img} alt="" />
              <p className="font-semibold mb-2">{markedProduct.name}</p>
            </div>
            <div>
              <div className="flex sm:flex-col items-center justify-between mb-6">
                <div className="flex items-center sm:mb-3">
                  <div className="border-2 px-3">{quantity}</div>
                  <div className="ml-2">
                    <FaCaretUp
                      onClick={() =>
                        setQuantity(quantity === 10 ? 10 : quantity + 1)
                      }
                    />
                    <FaCaretDown
                      onClick={() => {
                        setQuantity(quantity === 1 ? 1 : quantity - 1);
                      }}
                    />
                  </div>
                </div>
                <p>
                  Price: ${markedProduct.price * quantity} /$
                  {markedProduct.price}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn btn-secondary text-white btn-xs sm:btn-sm absolute bottom-5 right-5"
              >
                add to cart
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ProductModal;
