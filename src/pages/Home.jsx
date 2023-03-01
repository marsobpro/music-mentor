import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isOnline, setIsOline] = useState(false);
  const [choiceData, setChoiceData] = useState({
    subject: "",
    city: "",
  });
  const navigate = useNavigate();

  const subjectOptions = [
    { label: "Piano", value: "piano" },
    { label: "Guitar", value: "guitar" },
    { label: "Violin", value: "violin" },
    { label: "Cello", value: "cello" },
  ];
  const cityOptions = [
    { label: "Warsaw", value: "warsaw" },
    { label: "Poznan", value: "poznan" },
    { label: "Szczecin", value: "szczecin" },
    { label: "Gdansk", value: "gdansk" },
  ];

  function onOptionChangeHandler(e) {
    setChoiceData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    // console.log("Choice data: ", choiceData);
    // console.log(e.target.id, e.target.value);
    // console.log(isOnline);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (isOnline && choiceData.subject !== "") {
      navigate(`/${choiceData.subject}/online`);
    }
    if (!isOnline && choiceData.subject !== "" && choiceData.city !== "") {
      navigate(`/lessons/${choiceData.subject}/${choiceData.city}`);
    } else {
      alert("Please choose both subject and location");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center max-w-[1600px] m-auto">
      <main className="border border-gray-500">
        <h1>Find your Music Mentor </h1>
        <form
          onSubmit={onSubmitHandler}
          className="xs:space-y-4 md:flex space-x-5 space-y-0"
        >
          <div>
            <select
              name="subject"
              id="subject"
              onChange={onOptionChangeHandler}
              required
            >
              <option value="" disabled defaultValue hidden>
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
              onChange={onOptionChangeHandler}
              disabled={isOnline}
              required={!isOnline}
            >
              <option value="" disabled defaultValue hidden>
                Choose the city
              </option>
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <label htmlFor="isOnline">Online</label>
            <input
              type="checkbox"
              name="isOnline"
              id="isOnline"
              value={isOnline}
              onChange={() => {
                setIsOline((prevState) => !prevState);
              }}
            ></input>
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </main>
    </div>
  );
}
