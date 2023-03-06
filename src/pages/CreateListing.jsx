import React, { useContext, useState } from "react";
import Loading from "../components/Loading";
import { AppContext } from "../App";
// ZROB CHECKBOXY -> VALUE, ONCHANGE ORAZ ZMIEN HANDLECHANGE

export default function CreateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const { subjectOptions, cityOptions } = useContext(AppContext);
  const [addLessonFormData, setAddLessonFormData] = useState({
    subject: "",
    lessonTime: 0,
    price: 0,
    online: false,
    atMentorsPlace: false,
    atStudentsPlace: false,
    shortDescription: "",
    fullDescription: "",
    videoLink: "",
    level: "",
    age: 0,
    yearsOfExperience: 0,
  });

  function handleChange(e) {
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setAddLessonFormData((prevState) => ({
          ...prevState,
          [e.target.id]: true,
        }));
        // console.log(addLessonFormData);
        return;
      }
      if (!e.target.checked) {
        setAddLessonFormData((prevState) => ({
          ...prevState,
          [e.target.id]: false,
        }));
        // console.log(addLessonFormData);
        return;
      }
    }
    setAddLessonFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    // console.log(e.target.id, e.target.checked);
    // console.log(addLessonFormData);
  }

  const {
    subject,
    lessonTime,
    price,
    online,
    atStudentsPlace,
    atMentorsPlace,
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
      <div className="md:w-[700px] px-8 py-2 bg-pink-300 m-auto">
        {" "}
        <h1 className="font-semibold text-5xl text-center mb-12 font-mono">
          {/* {`Online: ${online}, atMentor: ${atMentorsPlace}, atStudents: ${atStudentsPlace}`} */}
          Create a lesson
        </h1>
        <form>
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="subject" className="text-xl text-center">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="h-10 rounded"
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
          <div className="grid grid-cols-2 items-center justify-center mb-8">
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
          {/*  */}
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
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="atMentorsPlace">At Mentors' place</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="atStudentsPlace"
                  name="atStudentsPlace"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="atStudentsPlace">At students' place</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="online"
                  name="online"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="online">Online</label>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="shortDescription" className="text-xl text-center">
              Abbreviated description
            </label>
            <textarea
              minLength="10"
              maxLength="100"
              rows="4"
              id="shortDescription"
              name="shortDescription"
              value={shortDescription}
              onChange={handleChange}
              className="w-[100%] h-20 rounded"
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="fullDescription" className="text-xl text-center">
              Full description
            </label>
            <textarea
              minLength="10"
              maxLength="100"
              rows="4"
              id="fullDescription"
              name="fullDescription"
              value={fullDescription}
              onChange={handleChange}
              className="w-[100%] h-40 rounded"
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-8">
            <label className="text-xl text-center" htmlFor="videoLink">
              Enter an https:// URL:
            </label>
            <input
              type="url"
              name="videoLink"
              id="videoLink"
              value={videoLink}
              onChange={handleChange}
              placeholder="https://example.com"
              pattern="https://.*"
              size="30"
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="teachingLevels" className="text-xl text-center">
              Teaching levels
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="atMentorsPlace"
                  name="atMentorsPlace"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="atMentorsPlace">At Mentors' place</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="atStudentsPlace"
                  name="atStudentsPlace"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="atStudentsPlace">At students' place</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="online"
                  name="online"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="online">Online</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
