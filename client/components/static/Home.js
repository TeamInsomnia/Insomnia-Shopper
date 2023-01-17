import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <>
      <h2>Insomnia Furniture</h2>
      {username && <h5>Welcome {username}</h5>}
      <img
        src="https://www.weknowboise.com/uploads/shared/images/blog/best-boise-furniture-home-decor-stores.jpg"
        className="img-fluid"
      />
      <h3>
        <Link to="/products">View offerings</Link>
      </h3>
    </>
  );
};

export default Home;
