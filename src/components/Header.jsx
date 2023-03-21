import React, { useEffect, useState } from "react";
import { GiMusicalScore } from "react-icons/gi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

export default function Header() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    { name: "LESSONS", link: "/lessons" },
    { name: "HOW IT WORKS", link: "/how-it-works" },
    { name: "CONTACT", link: "/contact" },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>
      user ? setIsLoggedIn(true) : setIsLoggedIn(false)
    );
  }, [auth]);

  function isCurrentRoute(route) {
    return route === location.pathname;
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("You are signed out. We hope to see you soon! 🤩");
      navigate("/");
    } catch (error) {
      toast.error("Sorry, something went wrong :( Try again!");
    }
  }

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-40 left-0 right-0 w-full max-w-[1300px] m-auto border-b shadow-sm bg-white">
      <div className="w-full m-auto px-7 py-4 items-center md:flex md:px-10 bg-white">
        <Link
          to="/"
          className="text-4xl font-pacifico cursor-pointer transition duration-150 text-green-400 hover:text-green-600"
        >
          MM
        </Link>
        <ul
          className={`absolute left-0 w-full pb-12 pl-9 z-[-1] md:flex md:items-center md:pb-0 md:static md:z-auto md:w-auto md:pl-0 transition-all duration-500 ease-in bg-white ${
            isMenuOpen ? "top-20 " : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className="my-7 md:ml-8 md:my-0 text-[1rem]">
              <Link
                to={link.link}
                className={`whitespace-nowrap text-gray-700 hover:text-gray-400 ${
                  isCurrentRoute(link.link)
                    ? "underline underline-offset-8 decoration-green-400 decoration-4 "
                    : ""
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {link.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute right-8 top-6 md:hidden text-3xl cursor-pointer"
      >
        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <div className="absolute right-20 top-6">
        {isLoggedIn ? (
          <div>
            <NavLink
              to="/profile"
              className="px-4 py-2 mr-2 duration-500 whitespace-nowrap cursor-pointer rounded border border-gray-300 text-gray-800 hover:text-gray-400"
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="text-sm hover:underline text-red-500 hover:text-red-700"
            >
              Sign out
            </button>
          </div>
        ) : (
          <NavLink
            to="/sign-in"
            className="px-4 py-2 duration-500 whitespace-nowrap cursor-pointer rounded border border-gray-300 text-gray-800 hover:text-gray-400"
          >
            SIGN IN
          </NavLink>
        )}
      </div>
    </div>
  );
}
