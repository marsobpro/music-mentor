import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function SignIn() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const { email, password } = loginFormData;
  return (
    <section>
      <h1 className="text-center font-bold text-4xl mt-28">Sign In</h1>

      <div className="w-[30rem] py-8 px-12 bg-white mt-16 m-auto shadow-md rounded-2xl">
        <form>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 rounded bg-gray-200"
          />
          <div className="relative">
            <input
              type={passwordIsVisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full rounded bg-gray-200 mb-4"
            />
            {passwordIsVisible ? (
              <VscEyeClosed
                className="absolute right-2 top-2 text-xl"
                onClick={() => setPasswordIsVisible((prevState) => !prevState)}
              />
            ) : (
              <VscEye
                className="absolute right-2 top-2 text-xl"
                onClick={() => setPasswordIsVisible((prevState) => !prevState)}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-green-700 py-2 px-8 rounded-2xl font-bold text-white mx-36"
          >
            Login
          </button>
          <p className="text-gray-400 text-sm hover:text-gray-600 cursor-pointer text-center">
            Forgot password?
          </p>
        </form>
      </div>
    </section>
  );
}
