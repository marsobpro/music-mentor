import React, { useRef, useState } from "react";
import emailjs, { sendForm } from "@emailjs/browser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validateFormData from "../utils/validateFormData";

export default function Contact() {
  const form = useRef();
  const navigate = useNavigate();
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    emailAddress: "",
    message: "",
  });
  const [errorsFound, setErrorsFound] = useState({});

  function handleChange(e) {
    setContactFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const sendEmail = async (e) => {
    e.preventDefault();

    const errors = validateFormData(contactFormData);
    if (errors.firstName || errors.emailAddress || errors.message) {
      setErrorsFound({
        firstName: errors.firstName,
        emailAddress: errors.emailAddress,
        message: errors.message,
      });
      toast.error("Please fill out the contact form correctly.");
      return;
    }

    try {
      await sendForm(
        "service_potbq2f",
        "template_bcsebnk",
        form.current,
        "9hRA9PusjCiOkc8QN"
      );
      toast.success("You've successfully sent the email!");
      e.target.reset();
      navigate("/");
    } catch (error) {
      toast.error("Sorry, something went wrong. Please try again!");
    }
  };

  return (
    <main className="max-w-[1300px] px-8 mt-32 mb-4 m-auto">
      <h1 className="text-center text-3xl font-semibold leading-6">Contact</h1>

      <div className="w-full m-auto mt-10">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col space-y-12"
        >
          <div className="flex flex-col space-y-10 sm:flex-row sm:space-y-0 sm:space-x-12">
            <div className="relative w-full">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Your name"
                onChange={handleChange}
                className={`w-full rounded-md ${
                  errorsFound.firstName ? "border-2 border-red-400" : ""
                }`}
              />
              {errorsFound.firstName ? (
                <p className="contact-form-error-message">
                  {errorsFound.firstName}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="relative w-full">
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                placeholder="Your email address"
                onChange={handleChange}
                className={`w-full rounded-md ${
                  errorsFound.emailAddress ? "border-2 border-red-400" : ""
                }`}
              />
              {errorsFound.emailAddress ? (
                <p className="contact-form-error-message">
                  {errorsFound.emailAddress}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="relative">
            {" "}
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Message"
              onChange={handleChange}
              className={`w-full rounded-md ${
                errorsFound.emailAddress ? "border-2 border-red-400" : ""
              }`}
            ></textarea>
            {errorsFound.message ? (
              <p className="contact-form-error-message">
                {errorsFound.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="w-[40%] m-auto sm:px-10 sm:w-auto rounded-full cursor-pointer shadow-lg hover:shadow-sm bg-green-300 hover:bg-green-400"
          >
            Send
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-around mt-12 space-y-8 sm:flex-row sm:space-y-0 text-center">
        <a
          href="mailto:marsobpro@gmail.com"
          className="py-2 px-4 rounded-2xl bg-green-400"
        >
          musicmentor@gmail.com
        </a>
        <a href="tel:799011749" className="py-2 px-4 rounded-2xl bg-green-400">
          +48 123 456 789
        </a>
      </div>
    </main>
  );
}
