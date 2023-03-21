import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import validateFormData from "../utils/validateFormData";

export default function SignUp() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [errorsFound, setErrorsFound] = useState({});
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
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
    // Validate form
    const errors = validateFormData(signUpFormData);
    if (
      errors.firstName ||
      errors.lastName ||
      errors.emailAddress ||
      errors.password
    ) {
      setErrorsFound({
        firstName: errors.firstName,
        lastName: errors.lastName,
        emailAddress: errors.emailAddress,
        password: errors.password,
      });
      toast.error("Check that you have filled out the form correctly.");
      return;
    }
    // Check if email already exists
    const signInMethods = await fetchSignInMethodsForEmail(auth, emailAddress);
    if (signInMethods.length) {
      toast.error(
        "This email already exists in our database. Try to log in instead."
      );
      navigate("/sign-in");
      return;
    }
    // Create an account
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: firstName,
        lastName,
      });

      const user = userCredential.user;
      const signUpFormDataCopy = { ...signUpFormData };
      delete signUpFormDataCopy.password;
      signUpFormDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), signUpFormDataCopy);
      toast.success("Your account has been successfully created", {
        icon: "🥳",
      });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { icon: "😞" });
    }
  }

  const { firstName, lastName, emailAddress, password } = signUpFormData;
  return (
    <section>
      <h1 className="mt-28 text-center font-bold text-4xl">Sign Up</h1>

      <div className="w-[20rem] py-8 px-3 mt-16 md:w-[30rem] md:px-20 m-auto shadow-2xl rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            placeholder="Name"
            onChange={handleChange}
            className={`w-full h-14 mb-4 rounded border-none bg-gray-200 ${
              errorsFound.firstName ? "bg-red-200" : ""
            }`}
          />
          {errorsFound.firstName ? (
            <p className="mt-[-10px] mb-2 text-xs text-center text-red-700">
              {errorsFound.firstName}
            </p>
          ) : (
            ""
          )}

          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            placeholder="Last name"
            onChange={handleChange}
            className={`w-full h-14 mb-4 rounded border-none bg-gray-200 ${
              errorsFound.lastName ? "bg-red-200" : ""
            }`}
          />
          {errorsFound.lastName ? (
            <p className="mt-[-10px] mb-2 text-xs text-center text-red-700">
              {errorsFound.lastName}
            </p>
          ) : (
            ""
          )}

          <input
            type="text"
            autoComplete="email"
            name="emailAddress"
            id="emailAddress"
            value={emailAddress}
            placeholder="E-mail"
            onChange={handleChange}
            className={`w-full h-14 mb-4 rounded border-none bg-gray-200 ${
              errorsFound.emailAddress ? "bg-red-200" : ""
            }`}
          />
          {errorsFound.emailAddress ? (
            <p className="mt-[-10px] mb-2 text-xs text-center text-red-700">
              {errorsFound.emailAddress}
            </p>
          ) : (
            ""
          )}

          <div className="relative">
            <input
              type={passwordIsVisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              className={`w-full h-14 rounded mb-4 border-none bg-gray-200 ${
                errorsFound.password ? "bg-red-200" : ""
              }`}
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

            {errorsFound.password ? (
              <p className="mt-[-10px] mb-2 text-xs text-center text-red-700">
                {errorsFound.password}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full mb-4 mt-4 py-2 md:w-auto md:px-12 rounded-2xl font-bold shadow-lg hover:shadow-none bg-green-500 text-white"
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
