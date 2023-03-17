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
      <h1 className="mt-28 text-center font-bold text-4xl">Reset Password</h1>

      <div className="w-[20rem] py-8 px-3 mt-16 m-auto md:px-20 md:w-[30rem] shadow-2xl rounded-2xl bg-white">
        <form>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Your E-mail"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded border-none bg-gray-200"
          />

          <div className="text-center">
            <button
              type="submit"
              className="w-full mb-2 mt-4 py-2 md:w-auto md:px-12 rounded-2xl font-bold bg-green-400 text-white"
            >
              Reset
            </button>
            <p className="text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="underline cursor-pointer hover:text-gray-600"
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
