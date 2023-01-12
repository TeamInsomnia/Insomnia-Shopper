import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../features";

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    await dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div>
      {displayName === "Login" ? <h3>Login</h3> : <h3>Join Insomnia</h3>}
      {error && <div> {error} </div>}
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
