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
      <h1>Admin: View Users</h1>
      {allUsers.map((user) => {
        return (
          <div key={user.id} className="m-3">
            <h3>
              <strong>Username: </strong>
              {user.username}
            </h3>
            <div>
              <strong>Email: </strong>
              {user.email}
            </div>
            {user.isAdmin && <strong>Admin</strong>}
          </div>
        );
      })}
    </>
  );
};

export default AllUsers;
