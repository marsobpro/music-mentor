import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function SignUp() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setSignUpFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        firsName: name,
        lastName: lastName,
      });

      const user = userCredential.user;
      const signUpFormDataCopy = { ...signUpFormData };
      delete signUpFormDataCopy.password;
      signUpFormDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), signUpFormDataCopy);
      toast.success("Sign up was succesfull", { icon: "🥳" });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { icon: "😞" });
    }
  }

  const { name, lastName, email, password } = signUpFormData;
  return (
    <section>
      <h1 className="mt-28 text-center font-bold text-4xl">Sign Up</h1>

      <div className="w-[20rem] py-8 px-3 mt-16 md:w-[30rem] md:px-20 m-auto shadow-2xl rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Your name"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded border-none bg-gray-200"
          />
          <input
            required
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            placeholder="Your last name"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded border-none bg-gray-200"
          />
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
              className="w-full h-14 rounded mb-4 border-none bg-gray-200"
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
              Create profile
            </button>
            <p className="text-sm text-center text-gray-400">
              Already have an account?&nbsp;
              <Link
                to="/sign-in"
                className="underline cursor-pointer hover:text-gray-600"
              >
                Log in instead
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
