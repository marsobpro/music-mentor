import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../App";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [isOnline, setIsOline] = useState(false);

  const navigate = useNavigate();
  const { subjectOptions, cityOptions } = useContext(AppContext);

  function onSubmitHandler(e) {
    e.preventDefault();
    // Offline
    if (!isOnline && subject && city) {
      navigate(`/lessons/${subject}/${city}`);
    }
    //Online
    if (isOnline && subject) {
      navigate(`/online-lessons/${subject}`);
    }
    toast.success("Let's find you a mentor!", { icon: "🎺", duration: 2200 });
  }

  return (
    <div className="h-screen flex justify-center items-center max-w-[1600px] m-auto">
      <main>
        <div className="mb-11 font-semibold text-3xl font-mono">
          <h1>Do you want to play the instrument?</h1>
          <h3>Find your Music Mentor.</h3>
        </div>
        <div className="h-[200px] px-4 border bg-green-300 rounded-[50px] flex justify-center items-center ">
          <form
            onSubmit={onSubmitHandler}
            className="xs:space-y-4 md:flex space-x-5 "
          >
            <div>
              <select
                name="subject"
                id="subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                required
                className="rounded-2xl"
              >
                <option value="" disabled>
                  What do you want to learn?
                </option>
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                disabled={isOnline}
                required={!isOnline}
                className="rounded-2xl"
              >
                <option value="" disabled>
                  Choose the city
                </option>
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isOnline"
                id="isOnline"
                value={isOnline}
                onChange={() => {
                  setIsOline((prevState) => !prevState);
                }}
              />
              <label htmlFor="isOnline">Online</label>
            </div>
            <div className="bg-white shadow-md hover:shadow-sm text-green-400 font-bold py-2 px-4 rounded-2xl cursor-pointer transition duration-150 ease-in-out">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
