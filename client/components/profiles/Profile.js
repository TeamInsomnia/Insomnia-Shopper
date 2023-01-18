// VIEW PROFILE COMPONENT
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser, selectSingleUser } from "../../features";
import { Link, useParams } from "react-router-dom";

// Profile Component begins here:
const Profile = () => {
  const dispatch = useDispatch();
  const { id, username, email } = useSelector((state) => state.auth.me);
  return (
    <div>
      {" "}
      <h2>MEMBER INFORMATION.</h2>
      <h4>Username: {username} </h4>
      <h4>Email: {email}</h4>
      <Link to={`/history/${id}`}>View Order History Here</Link>
    </div>
  );
};
export default Profile;
