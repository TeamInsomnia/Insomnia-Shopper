import React from "react";
import { useSelector } from "react-redux";
import { AllProducts } from "../";

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <>
      <h1>Insomnia Furniture</h1>
      {username && <h5>Welcome {username}</h5>}
      <img
        src="https://www.weknowboise.com/uploads/shared/images/blog/best-boise-furniture-home-decor-stores.jpg"
        className="img-fluid mb-3"
      />
      <AllProducts origin="home" />
    </>
  );
};

export default Home;
