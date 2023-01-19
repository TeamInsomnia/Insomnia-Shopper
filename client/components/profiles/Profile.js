import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { username, email } = useSelector((state) => state.auth.me);

  return (
    <div>
      <h2>MEMBER INFORMATION.</h2>
      <h4>Username: {username} </h4>
      <h4>Email: {email}</h4>
    </div>
  );
};
export default Profile;
