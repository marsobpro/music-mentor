import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
  });

  function handleChange(e) {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const { email } = loginFormData;
  return (
    <section>
      <h1 className="text-center font-bold text-4xl mt-28">Reset Password</h1>

      <div className="w-[20rem] md:w-[30rem] py-8 px-3 md:px-20 mt-16 m-auto  bg-white shadow-2xl rounded-2xl">
        <form>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Your E-mail"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded bg-gray-200 border-none"
          />

          <div className="text-center">
            <button
              type="submit"
              className=" w-full md:w-auto md:px-12 py-2 bg-green-400 rounded-2xl font-bold text-white mb-2 mt-4"
            >
              Reset
            </button>
            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="underline hover:text-gray-600 cursor-pointer "
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
