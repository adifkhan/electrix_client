import React from "react";
import electrix from "../../images/Electrix.png";
import { FaPencilAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-secondary px-6 sm:px-12  py-12">
      <div className="flex flex-col lg:flex-row lg:justify-around items-center gap-4">
        <div>
          <img src={electrix} alt="" />
        </div>
        <div className="flex flex-col md:flex-row md:justify-around gap-4 mt-4 lg:ml-4">
          <div className="md:w-1/2">
            <h2 className="text-accent font-semibold text-2xl mb-3 text-center uppercase">
              Contacts
            </h2>
            <div className="text-white flex">
              <p className="mr-5">Address:</p>
              <p>
                West Panthapahth,
                <br />
                Dhanmondi, Dhaka
              </p>
            </div>
            <div className="text-white flex my-5">
              <p className="mr-5">Phone:</p>
              <p>1-888-123-4567</p>
            </div>
            <div className="text-white flex">
              <p className="mr-5">Email:</p>
              <p className="text-accent">example@domain.com</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-neutral font-semibold text-2xl uppercase text-center mb-3">
              Newslatter
            </h2>
            <p className="text-white mb-5">
              Subscribe to our mailing list to receive new updates and special
              offers:
            </p>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-neutral btn-square">
                  <FaPencilAlt className="text-xl text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[gray] my-5"></div>
      <div className="text-[gray] text-center uppercase">
        <p>
          Copyright &copy; {new Date().getFullYear()} || all rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
