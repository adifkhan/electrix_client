import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { BsFillBasketFill } from "react-icons/bs";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="nav__container uppercase relative ">
      <div className="flex justify-between items-center h-16 sm:mx-8 md:mx-16 px-3 bg-primary lg:hidden bg__navbar relative overflow-hidden">
        <div onClick={() => setMenuToggle(!menuToggle)}>
          <label className="navbar__toggler" htmlFor="toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </label>
        </div>

        <div>
          <img className="img w-24 sm:w-32" src={logo} alt="" />
        </div>
        <div>
          <div
            className="text-base-100 md:mr-4 tooltip tooltip-bottom z-10 cursor-pointer"
            data-tip="checkout"
          >
            <BsFillBasketFill />
          </div>
        </div>
      </div>
      <div className="bg__navbar hidden lg:flex justify-between items-center h-16 mx-28 px-10 bg-primary relative overflow-hidden">
        <section>
          <img src={logo} alt="" />
        </section>
        <section className="w-[420px]">
          <ul className="menu__list flex justify-around fs-bold text-white text-sm font-semibold">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Products</Link>
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
        <section>
          <Button>login</Button>
        </section>
      </div>
      {menuToggle && (
        <section>
          <ul className="menu__list mini__menu grid grid-cols-1 w-[30%] bg-secondary gap-3 fs-bold text-white text-sm font-semibold absolute sm:left-[32px] md:left-[64px] top-[64px] z-10 lg:hidden pl-3 sm:pl-7 py-4">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Products</Link>
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
            <Button>login</Button>
          </ul>
        </section>
      )}
    </div>
  );
};

export default Navbar;
