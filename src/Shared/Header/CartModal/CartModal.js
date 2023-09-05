import React from "react";
import useCart from "../../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaCartPlus } from "react-icons/fa";
// import Loading from "../../Components/Loading";

const CartModal = () => {
  const [cart] = useCart();
  const navigate = useNavigate();
  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
  const handleNavigation = () => {
    navigate("/checkout");
  };
  const handleRemoveFromCart = (id) => {
    if (window.confirm("Do you want to remove this product from cart?")) {
      fetch(`https://electrix-server.vercel.app/mycart?id=${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  // refetch();
  return (
    <div className="max-w-xs relative">
      <input type="checkbox" id="cart-modal" className="modal-toggle" />
      <label
        htmlFor="cart-modal"
        className="modal cursor-pointer bg-black bg-opacity-5 backdrop-blur-sm"
      >
        <label className="modal-box pt-0 max-h-[80vh]" htmlFor="">
          <div className="sticky top-0 left-0 bg-white z-30">
            <div className="flex justify-between items-center p-3">
              <h3 className="font-bold text-lg text-secondary uppercase">
                Cart
              </h3>
              <label
                htmlFor="cart-modal"
                onClick={handleNavigation}
                className="btn btn-sm btn-secondary text-white"
              >
                Check-Out <FaCartPlus className="ml-2" />
              </label>
              <label htmlFor="cart-modal" className="btn btn-sm btn-circle">
                ✕
              </label>
            </div>
            <div className="w-full h-[1px] bg-[gray] my-2"></div>
          </div>

          <div>
            <div className="grid grid-cols-1">
              {cart?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row p-3 items-center bg-white border rounded-xl w-full my-2 mx-auto relative"
                >
                  <img className="w-12 h-12 mr-5" src={item.img} alt="" />
                  <div className="w-full sm:w-[75%]">
                    <p className="font-semibold text-center">{item.name}</p>
                    <div className="flex justify-between font-semibold">
                      <p>Quantity: ${item.quantity}</p>
                      <p>Total Price: ${item.price * item.quantity}</p>
                    </div>
                  </div>
                  <label
                    className="btn btn-xs btn-primary btn-circle text-white absolute right-2 top-2"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    <FaRegTrashAlt />
                  </label>
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
