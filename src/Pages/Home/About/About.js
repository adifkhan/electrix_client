import React from "react";
import { FaStar, FaSuitcase, FaUserTie } from "react-icons/fa";
import "./About.css";

const About = () => {
  return (
    <div className="about__container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-14">
        <div>
          <div className=" text-white w-[80%] mx-auto">
            <h2 className="uppercase text-white text-2xl">about</h2>
            <h2 className="uppercase text-white text-5xl font-bold">
              Electiri<span className="text-[aqua]">x</span>
            </h2>
            <p className="mt-12 text-justify">
              <strong>ElectriX</strong> helps manufacturers maximize the
              productivity they gain from their pneumatic tools, diaphragm
              pumps, chain hoists and related supplies. We dedicated to helping
              our customers andreduce operating costs.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div className="w-[80%] mx-auto">
            <div className="pro__details">
              <div className="flex items-center text-[aqua] text-2xl">
                <FaUserTie className="pro__icons ml-[-40px] mr-3" />
                <h3 className="font-semibold ">WE ARE PROFESSIONALS</h3>
              </div>
              <p className="text-white text-justify my-4">
                How all this mistakens idea of denouncing pleasures and
                completed account. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren.
              </p>
            </div>
            <div className="pro__details">
              <div className="flex items-center text-accent text-2xl">
                <FaSuitcase className="pro__icons ml-[-40px] mr-3" />
                <h3 className="font-semibold">WE ARE TRUSTED</h3>
              </div>
              <p className="text-white text-justify my-4">
                Idea denouncing pleasures and praisings pain was born great
                explorer. No sea takimata sanctus est Lorem ipsum dolor sit
                amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy.
              </p>
            </div>
            <div className="pro__details">
              <div className="flex items-center text-neutral text-2xl">
                <FaStar className="pro__icons ml-[-40px] mr-3" />
                <h3 className="font-semibold">WE ARE EXPERTS</h3>
              </div>
              <p className="text-white text-justify my-4">
                Denouncing pleasures and was born work will give you a complete
                masters. Eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua vero eos et accusam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
