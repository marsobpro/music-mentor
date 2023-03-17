import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../App";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [isOnline, setIsOline] = useState(false);
  const navigate = useNavigate();
  const { subjectOptions, cityOptions } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    // Offline
    if (!isOnline && subject && city) {
      navigate(`/lessons/${subject}/${city}`);
    }
    //Online
    if (isOnline && subject) {
      navigate(`/online-lessons/${subject}`);
    }
    toast.success("Let's find you a mentor!", { icon: "🎺" });
  }

  return (
    <main className="grid grid-rows-2 max-w-[1300px] h-[900px] mt-16 px-3 m-auto sm:px-7 md:h-[700px] md:mt-28 mdplus:flex mdplus:flex-row mdplus:justify-between">
      <div className="flex flex-col justify-center md:space-y-6">
        <div className="space-y-4 mb-4 font-semibold font-sans tracking-widest text-center mdplus:text-left">
          <h1 className="text-2xl leading-snug md:text-[3.6rem]">
            Do you want to play
            <br />
            an instrument?
          </h1>
          <h3 className="text-sm md:text-2xl">Find your Music Mentor!</h3>
        </div>
        <div className="flex justify-center px-4 py-7 mx-4 md:w-[700px] md:m-auto xl:w-auto rounded-[50px] shadow-md border border-slate-300 bg-green-400">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start space-y-4 md:flex-row md:space-y-0 md:space-x-2"
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
                className="w-full rounded-2xl md:w-auto"
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
                className="rounded"
              />
              <label htmlFor="isOnline">Online</label>
            </div>
            <div className="w-full py-2 px-4 mx-2 mb-4 md:mb-0 shadow-md hover:shadow-sm font-bold rounded-2xl cursor-pointer text-center transition duration-150 ease-in-out text-green-400 bg-white">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>

      {/* Pictures */}

      <div className="flex justify-center space-x-2 mt-2 md:space-x-8">
        <div className="">
          <div
            style={{
              backgroundImage: `url(src/assets/teacher1.jpg)`,
            }}
            className="relative flex justify-center w-[100px] h-full sm:w-[170px] rounded-[100px] bg-no-repeat bg-cover bg-center"
          >
            <div className="absolute bottom-[15%] w-[85%] p-[7px] sm:w-[75%] sm:p-4 rounded-3xl bg-white">
              <h2 className="text-xl font-bold sm:text-2xl">Erin</h2>
              <p className="hidden text-sm sm:block">Piano mentor</p>
              <div className="flex items-center mt-1 mb-1 sm:mb-0 text-sm">
                {<MdLocationOn className="mr-1 text-green-600" />} Poznań
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div
            style={{
              backgroundImage: `url(src/assets/teacher2.jpg)`,
            }}
            className="relative flex justify-center w-[100px] h-full mt-20 sm:w-[170px] rounded-[100px] bg-no-repeat bg-cover bg-center"
          >
            <div className="absolute top-[15%] w-[85%] p-[7px] sm:w-[75%] sm:p-4 rounded-3xl bg-white">
              <h2 className="text-2xl font-bold">Pam</h2>
              <p className="hidden sm:block text-sm">Cello mentor</p>
              <div className="flex items-center mt-1 mb-1 sm:mb-0 text-sm">
                {
                  <HiOutlineStatusOnline className="mr-1 text-lg text-green-600" />
                }{" "}
                Online
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            style={{
              backgroundImage: `url(src/assets/teacher3.jpg)`,
            }}
            className="relative flex justify-center w-[100px] sm:w-[170px] rounded-[100px] bg-no-repeat bg-center bg-cover"
          >
            <div className="absolute bottom-[15%] w-[85%] p-[7px] sm:w-[75%] sm:p-4 rounded-3xl bg-white">
              <h2 className="text-2xl font-bold">Jim</h2>
              <p className="hidden sm:block text-sm">Violin mentor</p>
              <div className="flex items-center mt-1 mb-1 sm:mb-0 text-sm">
                {<MdLocationOn className="mr-1 text-green-600" />} Warsaw
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
