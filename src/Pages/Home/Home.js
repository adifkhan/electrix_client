import React from "react";
import HomeBanner from "./Banner/HomeBanner";
import Blog from "./Blog/Blog";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Features from "./Features/Features";
import HomeProduct from "./Products/HomeProduct";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeProduct />
      <BusinessSummary />
      <Features />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
