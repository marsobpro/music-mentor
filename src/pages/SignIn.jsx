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
      <h1 className="mt-28 text-center font-bold text-4xl">Sign In</h1>

      <div className="w-[20rem] py-8 px-3 mt-16 m-auto md:w-[30rem] md:px-20 shadow-2xl rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Your E-mail"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded border-none bg-gray-200"
          />
          <div className="relative">
            <input
              required
              type={passwordIsVisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full h-14 mb-4 border-none rounded bg-gray-200"
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
              className="w-full mb-2 mt-4 py-2 md:w-auto md:px-12 rounded-2xl font-bold bg-green-400 text-white"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-400">
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="underline cursor-pointer hover:text-gray-600"
              >
                Reset
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="w-[20rem] py-6 mt-8 m-auto md:w-[30rem] shadow-2xl rounded-2xl bg-green-400">
        <div className="flex flex-col items-center justify-between md:flex-row md:text-center">
          <p className="md:ml-6 text-2xl font-semibold whitespace-nowrap text-center text-white">
            Not registered yet?
          </p>
          <Link
            to="/sign-up"
            className="py-2 px-5 mb-2 mt-4 md:mr-8 rounded-2xl font-bold whitespace-nowrap bg-white text-green-400"
          >
            Register now
          </Link>
        </div>
      </div>
    </section>
  );
}
