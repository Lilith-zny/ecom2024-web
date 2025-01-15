import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const logout = useEcomStore((state) => state.logout);
  // console.log(Boolean(user))

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log(carts.length);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/cart"}
            >
              cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full px-2 text-white">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {
            user 
            ?  <div className="flex items-center gap-4">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-200
              px-2 py-3 rounded-md"
            >
              <img
                className="w-8 h-8"
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-professor-avatars-flat-icons-pack-people-456317.png?f=webp&w=256"
              />

              <ChevronDown />
            </button>

            {isOpen && (
              <div className="absolute top-16 bg-white shadow-md z-50">
                <Link
                  to={"/user/history"}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  History
                </Link>
                <button 
                  onClick={()=>logout()}
                  className="block px-4 py-2 hover:bg-gray-200">
                  Logout
                </button>
              </div>
            )}
          </div>
            :  <div className="flex items-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/register"}
            >
              Register
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/login"}
            >
              Login
            </NavLink>
          </div>
          }


        </div>
      </div>
    </nav>
  );
};

export default MainNav;
