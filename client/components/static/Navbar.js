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
    navigate("/login");
  };

  return (
    <div>
      <h1>
        <i>INSOMNIA FURNITURE.</i>{" "}
      </h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in.
            (We'll need to set up authentication, of course.)
             */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* On the other hand, navbar shows THESE links prior to log-in. */}
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart!</Link>
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
