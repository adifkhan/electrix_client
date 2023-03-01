import React from "react";
import HomeBanner from "./Banner/HomeBanner";
import Blog from "./Blog/Blog";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Features from "./Features/Features";
import HomeProduct from "./Products/HomeProduct";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeProduct />
      <BusinessSummary />
      <Features />
      <Blog />
    </div>
  );
};

export default Home;
