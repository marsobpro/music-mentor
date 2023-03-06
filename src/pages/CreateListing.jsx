import React, { useContext, useState } from "react";
import Loading from "../components/Loading";
import { AppContext } from "../App";

export default function CreateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const { subjectOptions, cityOptions } = useContext(AppContext);
  const [addLessonFormData, setAddLessonFormData] = useState({
    subject: "",
    lessonTime: 0,
    price: 0,
    atStudentsPlace: false,
    atMentorsPlace: false,
    online: false,
    shortDescription: "",
    fullDescription: "",
    videoLink: "",
    level: "",
    age: 0,
    yearsOfExperience: 0,
  });

  function handleChange(e) {
    setAddLessonFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const {
    subject,
    lessonTime,
    price,

    shortDescription,
    fullDescription,
    videoLink,
    level,
    age,
    yearsOfExperience,
  } = addLessonFormData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1200px] mt-32 m-auto ">
      <div className="sm:w-[400px] md:w-[700px] px-8 py-2 bg-pink-300 m-auto">
        {" "}
        <h1 className="font-semibold text-5xl text-center mb-12 font-mono">
          Add a lesson
        </h1>
        <form>
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="subject" className="text-xl text-center">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className=" h-10 rounded"
              value={subject}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                --Choose--
              </option>
              {subjectOptions.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="price" className="text-xl text-center">
              Price
            </label>
            <span className="after:content-['__PLN']">
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                min="10"
                max="400"
                onChange={handleChange}
                required
                className="w-[25%] h-10 rounded"
              />
            </span>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="lessonTime" className="text-xl text-center">
              Lesson time
            </label>
            <span className="after:content-['__minutes']">
              <input
                type="number"
                id="lessonTime"
                name="lessonTime"
                value={lessonTime}
                min="30"
                max="120"
                step="5"
                onChange={handleChange}
                required
                className="w-[25%] h-10 rounded"
              />
            </span>
          </div>
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="lessonLocation" className="text-xl text-center">
              Lesson location
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="atMentorsPlace"
                  name="atMentorsPlace"
                  value="Bike"
                  className="rounded"
                />
                <label for="vehicle1">At Mentors' place</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="atStudentsPlace"
                  name="atStudentsPlace"
                  value="Bike"
                  className="rounded"
                />
                <label for="vehicle1">At students' place</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="online"
                  name="online"
                  value="online"
                  className="rounded"
                />
                <label for="vehicle1">Online</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
