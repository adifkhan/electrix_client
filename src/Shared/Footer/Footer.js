import React from "react";
import electrix from "../../images/Electrix.png";
import { FaPencilAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-secondary px-6 sm:px-12 lg:px-24 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <img src={electrix} alt="" />
        </div>
        <div>
          <h2 className="text-[#82cc33] font-semibold text-2xl mb-8 uppercase">
            Contacts
          </h2>
          <div className="text-white flex">
            <p className="mr-5">Address:</p>
            <p>
              21 Shukrabad,
              <br /> West Panthapahth, Dhaka
            </p>
          </div>
          <div className="text-white flex my-5">
            <p className="mr-5">Phone:</p>
            <p>1-888-123-4567</p>
          </div>
          <div className="text-white flex">
            <p className="mr-5">Email:</p>
            <p className="text-[#82cc33]">example@domain.com</p>
          </div>
        </div>
        <div>
          <h2 className="text-[#d1c500] font-semibold text-2xl uppercase mb-8">
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
                className="input input-bordered"
              />
              <button className="btn btn-accent btn-square">
                <FaPencilAlt className="text-xl text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[gray] my-5"></div>
      <div className="text-[gray] text-center uppercase">
        <p>&copy; Copyright {new Date().getFullYear()}. all rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
