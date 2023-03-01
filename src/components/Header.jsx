import React, { useState } from "react";
import { GiMusicalScore } from "react-icons/gi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="bg-white border-b fixed w-full max-w-[1600px] top-0 z-40 left-0 right-0 m-auto shadow-sm ">
      <div className="w-full m-auto md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <GiMusicalScore className="text-black" size={60} />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
