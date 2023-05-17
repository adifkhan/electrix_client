import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { BsFillBasketFill } from "react-icons/bs";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useCart from "../../Hooks/useCart";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const [user] = useAuthState(auth);
  const [cart] = useCart();

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    setAccountToggle(false);
  };

  // claculate the total amount of product in the cart //
  let totalCartProducts = 0;
  cart.forEach((item) => {
    totalCartProducts = totalCartProducts + item.quantity;
  });

  return (
    <nav className="uppercase mt-[-35px]">
      <div className="flex sm:mx-8 md:mx-16 lg:mx-28 relative">
        <div className="flex justify-between items-center bg-primary h-16 pl-2 grow">
          <section className="flex lg:flex-row-reverse grow justify-between items-center pr-14">
            <div>
              <label className="menu__toggle btn btn-primary swap swap-rotate w-10  lg:hidden">
                <input type="checkbox" />
                <svg
                  onClick={() => setMenuToggle(!menuToggle)}
                  className="swap-off fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <svg
                  onClick={() => setMenuToggle(!menuToggle)}
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
              <div
                className={`menu__dropdown absolute bg-secondary lg:bg-inherit w-full top-[64px] z-40 ease-in-out duration-200 lg:static 
                  ${menuToggle ? "left-0" : "left-[-150%]"}`}
              >
                <ul className="menu__list flex flex-col lg:flex-row md:items-center ml-10 lg:ml-0 my-3 lg:my-0 fs-bold text-white text-sm font-semibold">
                  <li className="p-2">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="p-2">
                    <Link to="/products">Products</Link>
                  </li>
                  <li className="p-2">
                    <Link>Reviews</Link>
                  </li>
                  <li className="p-2">
                    <Link>Contact us</Link>
                  </li>
                  <li className="p-2">
                    <Link>About</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="max-[490px]:hidden">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
          </section>
          <section className="flex items-center ">
            <div className="mr-10">
              <label htmlFor="cart-modal" className="indicator">
                <span className="indicator-item badge badge-neutral h-3 text-xs">
                  {totalCartProducts}
                </span>
                <div className="grid w-8 h-8 place-items-center">
                  <div
                    className="text-base-100  tooltip tooltip-left text-xl z-10 cursor-pointer"
                    data-tip="checkout"
                  >
                    <BsFillBasketFill />
                  </div>
                </div>
              </label>
            </div>
            {user ? (
              <div
                onClick={() => setAccountToggle(!accountToggle)}
                className="avatar cursor-pointer"
              >
                <div className="w-8 rounded-full ring ring-primary ring-offset-secondary ring-offset-2">
                  <img src={user.photoURL} alt="" />
                </div>

                <ul
                  className={`menu__list grid grid-cols-1 w-36 bg-secondary gap-3 fs-bold text-white text-xs font-semibold absolute top-[48px]  pl-3 sm:pl-7 py-4 ease-in-out duration-200 z-30 ${
                    accountToggle ? "right-0" : "right-[-300px] hidden"
                  }`}
                >
                  <li>
                    <Link to="">My Profile</Link>
                  </li>
                  <li>
                    <Link onClick={handleSignOut}>sign out</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Button>
                <Link to="login">login</Link>
              </Button>
            )}
          </section>
        </div>
        <div className="nav__trapezuim"></div>
      </div>
    </nav>
  );
};

export default Navbar;
