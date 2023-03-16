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
    toast.success("Let's find you a mentor!", { icon: "🎺", duration: 2600 });
  }

  return (
    <main className="grid grid-rows-2 mdplus:flex mdplus:flex-row mdplus:justify-between mt-16 md:mt-28 px-3 sm:px-7 max-w-[1300px] h-[900px] md:h-[700px] m-auto">
      <div className="flex flex-col justify-center md:space-y-6">
        <div className="space-y-4 mb-4 font-semibold font-sans tracking-widest text-center mdplus:text-left ">
          <h1 className="text-2xl leading-snug md:text-[3.6rem]">
            Do you want to play
            <br />
            an instrument?
          </h1>
          <h3 className="text-sm md:text-2xl">Find your Music Mentor!</h3>
        </div>
        <div className="flex justify-center px-4 py-7 mx-4 md:w-[700px] xl:w-auto md:m-auto bg-green-400 rounded-[50px] shadow-md border border-slate-300">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start md:flex-row space-y-4 md:space-y-0 md:space-x-2"
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
                className="rounded-2xl w-full md:w-auto"
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
            <div className="w-full py-2 px-4 mx-2 mb-4 md:mb-0 bg-white shadow-md hover:shadow-sm text-green-400 font-bold rounded-2xl cursor-pointer transition duration-150 ease-in-out text-center">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>

      {/* Pictures */}

      <div className="flex justify-center space-x-2 md:space-x-8 mt-2">
        <div className="">
          <div
            style={{
              backgroundImage: `url(src/assets/teacher1.jpg)`,
            }}
            className="w-[100px] sm:w-[170px] h-full bg-no-repeat bg-cover bg-center rounded-[100px] flex justify-center relative"
          >
            <div className="absolute bottom-[15%] w-[85%] sm:w-[75%] bg-white rounded-3xl p-[7px] sm:p-4">
              <h2 className="text-xl sm:text-2xl font-bold">Erin</h2>
              <p className=" hidden sm:block text-sm">Piano mentor</p>
              <div className="flex items-center mt-1 mb-1 sm:mb-0 text-sm">
                {<MdLocationOn className="text-green-600 mr-1" />} Poznań
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div
            style={{
              backgroundImage: `url(src/assets/teacher2.jpg)`,
            }}
            className="w-[100px] sm:w-[170px] h-full bg-no-repeat bg-cover bg-center rounded-[100px] mt-20 flex justify-center relative"
          >
            <div className="absolute top-[15%] w-[85%] sm:w-[75%] bg-white rounded-3xl  p-[7px] sm:p-4">
              <h2 className="text-2xl font-bold">Pam</h2>
              <p className="hidden sm:block text-sm">Cello mentor</p>
              <div className="flex items-center mt-1 mb-1 sm:mb-0 text-sm">
                {
                  <HiOutlineStatusOnline className="text-green-600 text-lg mr-1" />
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
            className="w-[100px] sm:w-[170px] bg-no-repeat bg-center bg-cover rounded-[100px] flex justify-center relative"
          >
            <div className="absolute bottom-[15%] w-[85%] sm:w-[75%] bg-white rounded-3xl p-[7px] sm:p-4">
              <h2 className="text-2xl font-bold">Jim</h2>
              <p className="hidden sm:block text-sm">Violin mentor</p>
              <div className="flex items-center mt-1 mb-1 sm:mb-0 text-sm">
                {<MdLocationOn className="text-green-600 mr-1" />} Warsaw
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
