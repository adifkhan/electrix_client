import React from "react";
import "./Blog.css";

import img1 from "../../../images/News/01.jpg";
import img2 from "../../../images/News/02.jpg";
import img3 from "../../../images/News/03.jpg";

const Blog = () => {
  const news = [img1, img2, img3];
  return (
    <div className="blog__container">
      <div className="flex flex-col justify-center items-center py-10">
        <p className="text-base-100 text-xl uppercase">blog</p>
        <h4 className="text-primary text-5xl  uppercase">Latest news</h4>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto pb-5 w-[75%]">
        {news.map((n, i) => (
          <div key={i} className="bg-base-100 card">
            <img src={n} alt="" className="rounded-t-2xl w-auto" />
            <div className="p-3">
              <h1 className="text-2xl text-secondary text-center font-semibold">
                At vero eos accusam et justo dolores
              </h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore.
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Blog;
