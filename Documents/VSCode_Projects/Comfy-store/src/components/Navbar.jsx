import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";

const themes = { winter: "winter", dracula: "dracula" };

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.winter;
};
const Navbar = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage);
  const { numItemsInCart } = useSelector((state) => state.cartState);
  const handleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    setTheme(newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="navbar bg-base-100 px-40">
      <div className="navbar-start align-element">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLinks />
          </ul>
        </div>
        <NavLink
          to={"/"}
          className="btn btn-primary text-xl hidden lg:flex items-center "
        >
          C
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        {/* Theme change*/}
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={handleTheme} />
          <BsSunFill className="swap-on h-4 w-4" />
          <BsMoonFill className="swap-off h-4 w-4" />
        </label>
        <div className="indicator">
          <NavLink
            to={"/cart"}
            className={"btn btn-ghost btn-circle btn-md ml-4"}
          >
            <BsCart3 className="h-6 w-6" />
            <span className="badge badge-sm badge-primary indicator-item">
              {numItemsInCart}
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
