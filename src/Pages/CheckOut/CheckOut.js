import React from "react";
import "./CheckOut.css";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import { FaCaretUp, FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Button from "../../Shared/Components/Button";

const CheckOut = () => {
  const [cart] = useCart();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //Calculation of the total amount to pay for user orders  starts here //
  let subTotal = 0;
  let shippingCost = 0;
  cart.forEach((item) => {
    const total = item.quantity * item.price;
    const shipping = item.shipping * 1;
    subTotal = subTotal + total;
    shippingCost = shippingCost + shipping;
  });
  const tax = (subTotal / 100) * 15;
  const grandTotal = subTotal + shippingCost + tax;
  //Calculation of the total amount to pay for user orders  ends here //

  return (
    <div>
      <section className="breadCrumbs text-accent flex flex-col items-center pt-16 pb-10 mt-[-30px]">
        <p className="text-3xl font-semibold uppercase">Check Out</p>
        <div className="text-sm font-medium  breadcrumbs">
          <ul>
            <li>
              <Link>Products</Link>
            </li>
            <li>
              <Link>Cart</Link>
            </li>
            <li>Checkout</li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-around w-full p-5">
        <section className="grid grid-cols-1 w-full">
          <h2 className="text-center font-semibold text-xl my-3">
            Your Orders
          </h2>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center bg-white border-2  w-full max-w-sm my-2 mx-auto relative"
            >
              <img className="w-20 mr-10" src={item.img} alt="" />
              <div>
                <p className="font-semibold mb-2">{item.name}</p>
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
                  <label className="btn btn-xs btn-primary btn-circle text-white absolute right-2 top-2">
                    <FaRegTrashAlt />
                  </label>
                </div>
              </div>
            </div>
          ))}
          <div className="mx-auto w-[70%]">
            <h2 className="font-medium text-xl my-3">Amount To Pay</h2>
            <div className="border-2 w-full my-3 p-3">
              <p className="font-normal mb-1">
                Cart Subtotal:
                <span className="text-secondary font-medium">${subTotal}</span>
              </p>
              <p className="font-normal mb-1">
                {" "}
                Shipping Cost:{" "}
                <span className="text-secondary font-medium">
                  ${shippingCost}
                </span>{" "}
              </p>
              <p className="font-normal  mb-1">
                {" "}
                VAT & SD:{" "}
                <span className="text-secondary font-medium">${tax}</span>
              </p>
              <p className="font-semibold">
                {" "}
                Grand Total:{" "}
                <span className="text-secondary">${grandTotal}</span>{" "}
              </p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col">
          <div className="mx-auto my-5">
            <h2 className="text-lg font-medium">Discount Code</h2>
            <input
              className="bg-white border-2 border-gray-400 h-10 w-48 my-3 mr-4"
              type="text"
            />
            <input
              className="btn btn-secondary"
              type="submit"
              value="Apply Coupon"
            />
          </div>
          <section>
            <h3 className="text-center font-semibold text-xl my-3">
              Please fill up the Form
            </h3>
            <form className="w-full flex flex-col items-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "name is required",
                    },
                    minLength: {
                      value: 4,
                      message: "Must be longer than 4 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Must be shorter than 20 characters",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                  {errors.name?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                    maxLength: {
                      value: 16,
                      message: "Maximum Characters 16",
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              <input
                className="btn btn-secondary text-white w-full max-w-xs"
                type="submit"
                value="proceed"
              />
            </form>
          </section>
        </section>
      </section>
    </div>
  );
};

export default CheckOut;
