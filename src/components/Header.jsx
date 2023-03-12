import React, { useEffect, useState } from "react";
import { GiMusicalScore } from "react-icons/gi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

export default function Header() {
  let Links = [
    { name: "LESSONS", link: "/lessons" },
    { name: "ABOUT US", link: "/about-us" },
    { name: "CONTACT", link: "/contact" },
  ];

  let [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function isCurrentRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, [auth]);

  function handleLogout() {
    try {
      signOut(auth);
      toast.success("You are signed out. We hope to see you soon! 🤩");
      navigate("/");
    } catch (error) {
      toast.error("Sorry, something went wrong :( Try again!");
    }
  }

  const navigate = useNavigate();

  return (
    <div className="bg-white border-b fixed w-full max-w-[1300px] top-0 z-40 left-0 right-0 m-auto shadow-sm ">
      <div className="w-full m-auto md:flex items-center  bg-white py-4 md:px-10 px-7 ">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <GiMusicalScore
            className="text-black"
            size={50}
            onClick={() => navigate("/")}
          />
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-[1rem] md:my-0 my-7">
              <Link
                to={link.link}
                className={`text-gray-700 hover:text-gray-400 duration-500 whitespace-nowrap ${
                  isCurrentRoute(link.link) && "underline  underline-offset-8"
                }`}
                onClick={() => setOpen(!open)}
              >
                {link.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <div className="absolute right-20 top-8">
        {isLoggedIn ? (
          <div>
            <NavLink
              to="/profile"
              className="text-gray-800 mr-2 hover:text-gray-400 duration-500 whitespace-nowrap cursor-pointer border border-gray-300 rounded px-4 py-2"
            >
              Profile
            </NavLink>
            <button onClick={handleLogout} className="text-red-500 text-sm">
              Sign out
            </button>
          </div>
        ) : (
          <NavLink
            to="/sign-in"
            className="text-gray-800 hover:text-gray-400 duration-500 whitespace-nowrap cursor-pointer border border-gray-300 rounded px-4 py-2"
          >
            SIGN IN
          </NavLink>
        )}
      </div>
    </div>
  );
}
