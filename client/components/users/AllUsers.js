import { isRejected } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features";

const AllUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <h3>ALL USERS</h3>
      {allUsers.map((user) => {
        return (
          <div key={user.id}>
            <h4>{user.username}</h4>
            <div>Email: {user.email}</div>
            {user.isAdmin && <strong>Admin</strong>}
          </div>
        );
      })}
    </>
  );
};

export default AllUsers;
