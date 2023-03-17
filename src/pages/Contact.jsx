import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const { name, email, message } = formData;

  return (
    <main className="max-w-[1300px] px-8 mt-32 mb-4 m-auto ">
      <h1 className="text-center text-3xl font-semibold leading-6">Contact</h1>

      <div className="w-full m-auto mt-10">
        <form className="flex flex-col space-y-12">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-12">
            <input
              required
              type="text"
              name="name"
              id="name"
              min="2"
              max="20"
              placeholder="Name"
              className="w-full rounded-md"
              value={name}
              onChange={handleChange}
            />
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="w-full rounded-md"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            {" "}
            <textarea
              required
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Message"
              className="w-full rounded-md"
              value={message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[40%] m-auto sm:px-10 sm:w-auto rounded-full cursor-pointer shadow-md hover:shadow-sm bg-green-200"
          >
            Send
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-around mt-12 space-y-8 sm:flex-row sm:space-y-0 text-center ">
        <a
          href="mailto:marsobpro@gmail.com"
          className="py-2 px-4 rounded-2xl bg-green-400"
        >
          musicmentor@gmail.com
        </a>
        <a
          href="tel:123123123123123"
          className="py-2 px-4 rounded-2xl bg-green-400"
        >
          +48 123 456 789
        </a>
      </div>
    </main>
  );
}
