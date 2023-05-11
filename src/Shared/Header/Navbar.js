import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { BsFillBasketFill } from "react-icons/bs";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { getStoredCart } from "../Components/LocalStorage";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
    setAccountToggle(false);
  };

  // claculate the total amount of product in the cart //
  const shopppingCart = getStoredCart();
  const cartProducts = Object.values(shopppingCart);
  const totalCartProducts = cartProducts.reduce((a, b) => a + b, 0);

  return (
    <div className="nav__container uppercase relative z-20">
      <div className="flex justify-between items-center h-16 sm:mx-8 md:mx-16 px-3 bg-primary lg:hidden bg__navbar relative overflow-hidden">
        <div onClick={() => setMenuToggle(!menuToggle)}>
          <label className="navbar__toggler" htmlFor="toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </label>
        </div>

        <div>
          <Link to="/">
            <img className="img w-24 sm:w-32" src={logo} alt="" />
          </Link>
        </div>
        <div className="mr-8">
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
      </div>
      <div className="bg__navbar hidden lg:flex justify-between items-center h-16 mx-28 px-10 bg-primary relative overflow-hidden">
        <section>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </section>
        <section className="w-[420px]">
          <ul className="menu__list flex justify-around fs-bold text-white text-sm font-semibold">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link>Reviews</Link>
            </li>
            <li>
              <Link>Contact us</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
          </ul>
        </section>
        <section className="flex items-center ">
          <div className="mr-8">
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
            </div>
          ) : (
            <Button>
              <Link to="login">login</Link>
            </Button>
          )}
        </section>
      </div>
      {menuToggle && (
        <section>
          <ul className="menu__list grid grid-cols-1 w-full sm:w-[50%] bg-secondary gap-4 fs-bold text-white text-xs font-semibold absolute sm:left-[32px] md:left-[64px] top-[64px] lg:hidden pl-10 py-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link>Reviews</Link>
            </li>
            <li>
              <Link>Contact us</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            {user ? (
              <Button>sign out</Button>
            ) : (
              <Button>
                <Link to="login">login</Link>
              </Button>
            )}
          </ul>
        </section>
      )}
      {accountToggle && (
        <section>
          <ul className="menu__list hidden lg:grid grid-cols-1 w-36 bg-secondary gap-3 fs-bold text-white text-xs font-semibold absolute right-28 top-[64px]  pl-3 sm:pl-7 py-4">
            <li>
              <Link to="">My Profile</Link>
            </li>
            <li>
              <Link onClick={handleSignOut}>sign out</Link>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

export default Navbar;
