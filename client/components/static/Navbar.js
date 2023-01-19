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
      <nav className="navbar navbar-expand-md mb-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Insomnia Furniture
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <div className="ms-auto">
                  <Link to="/cart">View Cart</Link>
                  <Link to="/products">View products</Link>
                  {isAdmin && <Link to="/users">Admin: View Users</Link>}
                  <Link to="/profile">Profile</Link>
                  <button
                    type="button"
                    onClick={logoutAndRedirectHome}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="ms-auto">
                  <Link to="/login">Log In</Link>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/products">View products</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
