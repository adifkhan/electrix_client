import React from "react";
import useCart from "../../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const CartModal = () => {
  const [cart] = useCart();
  const navigate = useNavigate();

  const customNavigation = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-xs relative">
      <input type="checkbox" id="cart-modal" className="modal-toggle" />
      <label
        htmlFor="cart-modal"
        className="modal cursor-pointer bg-black bg-opacity-5 backdrop-blur-sm"
      >
        <label className="modal-box pt-0" htmlFor="">
          <div className="sticky top-0 left-0 bg-white">
            <div className="flex justify-between items-center p-3">
              <label
                htmlFor="cart-modal"
                onClick={customNavigation}
                className="btn btn-sm btn-secondary text-white"
              >
                Check Out
              </label>
              <h3 className="font-bold text-lg text-secondary uppercase">
                Cart Products
              </h3>
              <label htmlFor="cart-modal" className="btn btn-sm btn-circle">
                ✕
              </label>
            </div>
            <div className="w-full h-[1px] bg-[gray] my-2"></div>
          </div>

          <div>
            <div className="grid grid-cols-1">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-around items-center bg-white border rounded-xl w-full my-2 mx-auto "
                >
                  <img className="w-20" src={item.img} alt="" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex justify-between font-semibold">
                      <div className="flex">
                        <div className="border w-10 text-center">
                          {item.quantity}
                        </div>
                        <div>
                          <FaCaretUp />
                          <FaCaretDown />
                        </div>
                      </div>
                      <p>
                        Price: ${item.price * item.quantity} /${item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default CartModal;
