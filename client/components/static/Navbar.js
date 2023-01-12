import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <h1>
        <Link to="/">
          <i>INSOMNIA FURNITURE</i>
        </Link>
      </h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/cart">Cart!</Link>
            <Link to="/products">View offerings.</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* On the other hand, navbar shows THESE links prior to log-in. */}
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            {/* /cart doesn't exist yet! ~ jw:jan 12@1120 */}
            <Link to="/products">View offerings.</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
