import React from "react";
import { HiPhone, HiMail, HiSearch } from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const HeaderTop = () => {
  return (
    <div className="flex bg-secondary items-center justify-around pb-10">
      <section className="flex flex-col lg:flex-row items-center justify-around lg:w-full text-base-100 py-4">
        <div className="flex items-center my-2">
          <div className="flex items-center mr-7 hover:text-primary">
            <HiPhone />
            <p className="ml-2">
              <small>+880 123456789</small>
            </p>
          </div>
          <div className="flex items-center hover:text-primary">
            <HiMail />
            <p className="ml-2">
              <small>example@domain.com</small>
            </p>
          </div>
        </div>
        <div className="flex items-center my-2">
          <div
            className="mx-3 hover:text-primary tooltip tooltip-top cursor-pointer"
            data-tip="facebook"
          >
            <FaFacebookF />
          </div>
          <div
            className="mx-3 hover:text-primary tooltip tooltip-top cursor-pointer"
            data-tip="twitter"
          >
            <FaTwitter />
          </div>
          <div
            className="mx-3 hover:text-primary tooltip tooltip-top cursor-pointer"
            data-tip="google"
          >
            <FaGoogle />
          </div>
          <div
            className="mx-3 hover:text-primary tooltip tooltip-top cursor-pointer"
            data-tip="linkedin"
          >
            <FaLinkedinIn />
          </div>
          <div
            className="mx-3 hover:text-primary tooltip tooltip-top cursor-pointer"
            data-tip="youtube"
          >
            <FaYoutube />
          </div>
        </div>
        <div className="flex items-center my-2  md:hidden lg:flex">
          <div className="ml-8 hover:text-primary relative">
            <input
              className="bg-white sm:w-[280px] h-8 rounded-full text-secondary pl-5 pr-9"
              type="text"
            />
            <span className="flex justify-center items-center text-primary h-9 cursor-pointer absolute top-[-2px]  right-1">
              <HiSearch className="w-8 h-6" />
            </span>
          </div>
        </div>
      </section>
      <section className="hidden md:flex items-center  lg:hidden">
        <div className="ml-8 hover:text-primary relative">
          <input
            className="bg-white w-[280px] h-8 rounded-full text-secondary pl-2 pr-9"
            type="text"
          />
          <span className="flex justify-center items-center text-primary h-9 cursor-pointer absolute top-[-2px]  right-[-2px]">
            <HiSearch className="w-8 h-6" />
          </span>
        </div>
      </section>
    </div>
  );
};

export default HeaderTop;
