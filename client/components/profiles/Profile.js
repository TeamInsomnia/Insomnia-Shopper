import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id, username, email } = useSelector((state) => state.auth.me);
  return (
    <div>
      <h2>MEMBER INFORMATION.</h2>
      <h4>Username: {username} </h4>
      <h4>Email: {email}</h4>
      <Link to={`/history/${id}`}>View Order History Here</Link>
    </div>
  );
};
export default Profile;
