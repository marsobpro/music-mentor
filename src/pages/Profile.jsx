import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <main>
      <div className="mt-40 w-[20rem] md:w-[30rem] py-6 bg-green-400 m-auto shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between flex-col md:flex-row md:text-center">
          <p className="md:ml-6 text-white text-2xl font-semibold whitespace-nowrap text-center">
            Start teaching now!
          </p>
          <Link
            to="/create-listing"
            className="bg-white py-2 px-5 md:mr-8 mb-2 mt-4 rounded-2xl font-bold text-green-400 whitespace-nowrap"
          >
            Add a lesson
          </Link>
        </div>
      </div>
    </main>
  );
}
