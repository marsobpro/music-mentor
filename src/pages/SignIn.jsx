import React, { useEffect, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import Loading from "../components/Loading";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Welcome! Let's find you a mentor...🕵🏼‍♀️");
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Incorrect email and/or password");
      setIsLoading(false);
    }
  }

  const { email, password } = loginFormData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h1 className="text-center font-bold text-4xl mt-28">Sign In</h1>

      <div className="w-[20rem] md:w-[30rem] py-8 px-3 md:px-20 mt-16 m-auto bg-white shadow-2xl rounded-2xl">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Your E-mail"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded bg-gray-200 border-none"
          />
          <div className="relative">
            <input
              type={passwordIsVisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full h-14 rounded bg-gray-200 mb-4 border-none"
            />
            {passwordIsVisible ? (
              <VscEyeClosed
                className="absolute right-2 top-4 text-xl"
                onClick={() => setPasswordIsVisible((prevState) => !prevState)}
              />
            ) : (
              <VscEye
                className="absolute right-2 top-4 text-xl"
                onClick={() => setPasswordIsVisible((prevState) => !prevState)}
              />
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className=" w-full md:w-auto md:px-12 py-2 bg-green-400 rounded-2xl font-bold text-white mb-2 mt-4"
            >
              Login
            </button>
            <p className="text-sm text-gray-400 text-center">
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="underline hover:text-gray-600 cursor-pointer"
              >
                Reset
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="w-[20rem] md:w-[30rem] py-6 bg-green-400 mt-8 m-auto shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between flex-col md:flex-row md:text-center">
          <p className="md:ml-6 text-white text-2xl font-semibold whitespace-nowrap text-center">
            Not registered yet?
          </p>
          <Link
            to="/sign-up"
            className="bg-white py-2 px-5 md:mr-8 mb-2 mt-4 rounded-2xl font-bold text-green-400 whitespace-nowrap"
          >
            Register now
          </Link>
        </div>
      </div>
    </section>
  );
}
