import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Features/user/userSlice";
import { clearCart } from "../Features/cart/cartSlice";

const Header = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <header className="py-3 bg-neutral sm:justify-end text-neutral-content">
      <div className="align-element justify-center flex sm:justify-end">
        {user ? (
          <div className=" flex gap-x-6 justify-center">
            <p className="text-sm flex items-center ">
              Hello , {user.username}
            </p>
            <Link
              to="/"
              onClick={() => handleLogout()}
              className="btn btn-xs btn-outline btn-primary text-sm"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className=" flex gap-x-6 justify-center">
            <Link to="/login" className="text-xs ">
              Sign in / Guest
            </Link>
            <Link to="/register" className="text-xs">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
