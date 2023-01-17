import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="nav">
        <strong>
          <Link to="/">Insomnia Furniture</Link>
        </strong>
        {isLoggedIn ? (
          <div>
            <Link to="/cart">Cart!</Link>
            {isAdmin && <Link to="/users">Admin: View Users</Link>}
            <button
              type="button"
              onClick={logoutAndRedirectHome}
              className="btn btn-outline-danger btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* On the other hand, navbar shows THESE links prior to log-in. */}
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            {/* /cart doesn't exist yet! ~ jw:jan 12@1120 */}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
