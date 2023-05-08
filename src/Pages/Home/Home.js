import React from "react";
import HomeBanner from "./Banner/HomeBanner";
import Blog from "./Blog/Blog";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Features from "./Features/Features";
import About from "./About/About";
import ProductCatagories from "./ProductsCatagories/ProductCatagories";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <ProductCatagories />
      <BusinessSummary />
      <Blog />
      <Features />
      <About />
    </div>
  );
};

export default Home;
