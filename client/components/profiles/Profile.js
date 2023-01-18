// VIEW PROFILE COMPONENT
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser, selectSingleUser } from "../../features";
import { useParams } from "react-router-dom";

// Profile Component begins here:
const Profile = () => {
  const dispatch = useDispatch();
  console.log("USE PARAMZ");
  console.log(useParams());
  const { userId } = useParams(); // snatch the wildcard.

  const singleUser = useSelector(selectSingleUser);
  console.log(singleUser);
  const { username, email } = singleUser;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  return (
    <div>
      {" "}
      <h2>Member Information.</h2>
      <h3>Full name and address:</h3>
      <h4>Other details coming soon.....</h4>
    </div>
  );
};
export default Profile;
