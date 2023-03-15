import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
      toast.success("Sign up was succesfull", { icon: "🥳", duration: 3200 });
      navigate("/");

      console.log(auth.currentUser.name, auth.currentUser.lastName);

      // if (userCredential.user) {
      //   navigate("/");
      // }
    } catch (error) {
      toast.error("Something went wrong", { icon: "😞", duration: 3200 });
    }
  }

  const { name, lastName, email, password } = signUpFormData;
  return (
    <section>
      <h1 className="text-center font-bold text-4xl mt-28">Sign Up</h1>

      <div className="w-[20rem] md:w-[30rem] py-8 px-3 md:px-20 mt-16 m-auto bg-white shadow-2xl rounded-2xl">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Your name"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded bg-gray-200 border-none"
          />
          <input
            required
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            placeholder="Your last name"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded bg-gray-200 border-none"
          />
          <input
            required
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
              required
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
              Create profile
            </button>
            <p className="text-sm text-gray-400 text-center">
              Already have an account?&nbsp;
              <Link
                to="/sign-in"
                className="underline hover:text-gray-600 cursor-pointer "
              >
                Log in instead
              </Link>
            </p>
            {/* <p>{`Name: ${name}`}</p>
            <p>{`Last Name: ${lastName}`}</p>
            <p>{`Email: ${email}`}</p>
            <p>{`Password: ${password}`}</p> */}
          </div>
        </form>
      </div>
    </section>
  );
}
