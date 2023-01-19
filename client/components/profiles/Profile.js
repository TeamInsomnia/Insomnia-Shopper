import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id, username, email } = useSelector((state) => state.auth.me);
  return (
    <div>
      <h1>MEMBER INFORMATION.</h1>
      <div>
        <strong>Username:</strong> {username}{" "}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <Link to={`/history/${id}`}>View Order History Here</Link>
    </div>
  );
};
export default Profile;
