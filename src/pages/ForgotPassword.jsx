import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchSignInMethodsForEmail,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import validateFormData from "../utils/validateFormData";
import { auth } from "../firebase";
import Loading from "../components/Loading";

export default function ForgotPassword() {
  const [resetFormData, setResetFormData] = useState({
    emailAddress: "",
  });
  const [emailError, setEmailError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigate("/profile");
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  }, [navigate, auth]);

  function handleChange(e) {
    setResetFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateFormData(resetFormData);
    if (errors.emailAddress) {
      setEmailError(errors.emailAddress);
      toast.error("Check if you entered the correct email");
      return;
    }
    const auth = getAuth();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        emailAddress
      );
      if (signInMethods.length) {
        await sendPasswordResetEmail(auth, emailAddress);
        toast.success(`Reset mail has been sent to ${emailAddress}`);
      } else {
        toast.error("Email not found");
      }
    } catch (error) {
      toast.error(error);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  const { emailAddress } = resetFormData;
  return (
    <section>
      <h1 className="mt-28 text-center font-bold text-4xl">Reset Password</h1>

      <div className="w-[20rem] py-8 px-3 mt-16 m-auto md:px-20 md:w-[30rem] shadow-2xl rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="email"
            name="emailAddress"
            id="emailAddress"
            value={emailAddress}
            placeholder="Your E-mail"
            onChange={handleChange}
            className="w-full h-14 mb-4 rounded border-none bg-gray-200"
          />
          {emailError ? (
            <p className="text-xs text-center text-red-700">{emailError}</p>
          ) : (
            ""
          )}

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
