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
    if (!subject) {
      toast.error("Please tell us what do you want to learn!");
      return;
    }
    if (isOnline) {
      navigate(`/online-lessons/${subject}`);
      toast.success(`Lets find ${subject} mentors who teach online!`, {
        icon: "🥳",
      });
      return;
    }
    if (city) {
      navigate(`/lessons/${subject}/${city}`);
      toast.success(`Lets find ${subject} mentors from ${city}!`, {
        icon: "🥳",
      });
    } else {
      navigate(`/lessons/${subject}`);
      toast.success(`Lets find ${subject} mentors!`, {
        icon: "🥳",
      });
    }
  }

  return (
    <main className="grid grid-rows-2 max-w-[1300px] h-[900px] mt-20 px-3 m-auto sm:px-7 mdplus:h-[700px] md:mt-28 mdplus:flex mdplus:flex-row mdplus:justify-between">
      <div className="flex flex-col justify-center md:space-y-6">
        <div className="space-y-4 mb-8 font-semibold font-montserrat tracking-widest text-center mdplus:text-left">
          <h1 className="text-2xl md:text-4xl">
            Do you want to play
            <br />
            an instrument?
          </h1>
          <h3 className="text-xl md:text-2xl">
            Find your{" "}
            <span className="block sm:inline mt-4 sm:mt-4 sm:ml-2 font-pacifico text-4xl text-green-600 ">
              Music Mentor!
            </span>
          </h3>
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
            <div className="w-full py-2 px-4 mb-4 md:mb-0 md:mx-2 shadow-md hover:shadow-sm font-bold rounded-2xl cursor-pointer text-center transition duration-150 ease-in-out text-green-400 bg-white">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>

      {/* Pictures */}

      <div className="flex justify-center mt-8 space-x-4">
        <div>
          <div
            style={{
              backgroundImage: `url(src/assets/teacher1.jpg)`,
            }}
            className="mentor-photo"
            role="img"
            aria-label="A young woman, one of our mentors, looking at the camera and smiling."
          >
            <div className="mentor-photo__info bottom-[15%]">
              <h2 className="mentor-photo__info-header">Erin</h2>
              <p className="mentor-photo__info-paragraph">Piano mentor</p>
              <div className="mentor-photo__info-location">
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
            className="mentor-photo mt-20"
            role="img"
            aria-label="Another young woman, one of our mentors, looking at the camera and smiling."
          >
            <div className="mentor-photo__info top-[15%]">
              <h2 className="mentor-photo__info-header">Pam</h2>
              <p className="mentor-photo__info-paragraph">Cello mentor</p>
              <div className="mentor-photo__info-location">
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
            className="mentor-photo"
            role="img"
            aria-label="A middle-aged man, one of our mentors, looks into the camera and smiles"
          >
            <div className="mentor-photo__info bottom-[15%]">
              <h2 className="mentor-photo__info-header">Jim</h2>
              <p className="mentor-photo__info-paragraph">Violin mentor</p>
              <div className="mentor-photo__info-location">
                {<MdLocationOn className="mr-1 text-green-600" />} Warsaw
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
