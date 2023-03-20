import React, { useContext, useState } from "react";
import Loading from "../components/Loading";
import { AppContext } from "../App";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4, validate } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

export default function CreateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [foundErrors, setFoundErrors] = useState({});
  const { subjectOptions, cityOptions } = useContext(AppContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const [addLessonFormData, setAddLessonFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    lessonTime: 0,
    price: 0,
    online: false,
    city: "",
    atMentorsPlace: false,
    atStudentsPlace: false,
    shortDescription: "",
    fullDescription: "",
    videoLink: "",
    elementarySchool: false,
    highSchool: false,
    college: false,
    adults: false,
    yearsOfTeachingExperience: 0,
    phoneNumber: "",
    emailAddress: "",
    image: null,
  });

  function validateData() {
    let errors = {};

    if (!firstName) {
      errors.firstName = "Name is required!";
    } else if (firstName.length > 50) {
      errors.firstName = "The name should be max. 50 characters long";
    }

    if (!lastName) {
      errors.lastName = "Last name is required!";
    } else if (firstName.length > 50) {
      errors.lastName = "The last name should be max. 50 characters long";
    }

    if (!subject) {
      errors.subject = "What instrument do you teach?";
    }

    if (lessonTime < 30) {
      errors.lessonTime = "Lesson should last at least 30 minutes";
    } else if (lessonTime > 120) {
      errors.lessonTime = "Lesson should last max. 120 minutes";
    }

    if (price < 20) {
      errors.price = "Lesson should cost at least 20 PLN";
    } else if (price > 400) {
      errors.price = "Lesson should cost max. 400 PLN";
    }

    if (!city) {
      errors.city = "Please choose a city";
    }

    if (
      !atMentorsPlace.checked &&
      !atStudentsPlace.checked &&
      !online.checked
    ) {
      errors.lessonLocation = "Where do you teach? Choose at least 1 option";
    }

    if (shortDescription.length < 50) {
      errors.shortDescription =
        "Short description should be at least 50 characters long";
    } else if (shortDescription.length > 250) {
      errors.shortDescription =
        "Short description should be max. 250 characters long";
    }

    if (fullDescription.length < 100) {
      errors.fullDescription =
        "Full description should be min. 100 characters long";
    } else if (fullDescription.length > 700) {
      errors.fullDescription =
        "Full description should be max. 700 characters long";
    }

    if (
      !elementarySchool.checked &&
      !highSchool.checked &&
      !college.checked &&
      !adults.checked
    ) {
      errors.levelsOfTeaching = "Choose at least one level of teaching";
    }

    if (!yearsOfTeachingExperience) {
      errors.yearsOfTeachingExperience =
        "At least 1 year of experience required";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Enter your phone number";
    }

    if (!emailAddress) {
      errors.emailAddress = "Please enter email address";
    }

    if (!image) {
      errors.image = "Please upload a picture of yourself";
    }

    return errors;
  }

  function handleChange(e) {
    //Checkboxes
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setAddLessonFormData((prevState) => ({
          ...prevState,
          [e.target.id]: true,
        }));
        return;
      }
      if (!e.target.checked) {
        setAddLessonFormData((prevState) => ({
          ...prevState,
          [e.target.id]: false,
        }));
        return;
      }
    }
    // Files
    if (e.target.files) {
      setAddLessonFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    }
    setAddLessonFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    // console.dir(addLessonFormData);

    e.preventDefault();
    setIsLoading(true);
    const errors = validateData();
    if (Object.keys(errors).length) {
      setFoundErrors(errors);
      setIsLoading(false);
      toast.error("Check that you have filled out the form correctly.", {
        icon: "🔎",
      });
      console.log("errors", errors);
      return;
    }
    let imageUrl = null;

    // Upload the image and get imageUrl
    if (image != null) {
      try {
        const fileName = `listingsImages/${image.name + v4()}`;
        const imageRef = ref(storage, fileName);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.log(error);
      }
    }

    //Create the formData copy, add and delete from it
    const addLessonFormDataCopy = {
      ...addLessonFormData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      imageUrl: imageUrl,
      userId: auth.currentUser.uid,
    };
    delete addLessonFormDataCopy.image;

    const docRef = await addDoc(
      collection(db, "listings"),
      addLessonFormDataCopy
    );

    setIsLoading(false);
    toast.success("You've created a listing!", { icon: "🙌" });
    navigate(
      `/lessons/${addLessonFormDataCopy.subject}/${addLessonFormDataCopy.city}/${docRef.id}`
    );
  }

  const {
    subject,
    lessonTime,
    price,
    city,
    shortDescription,
    fullDescription,
    videoLink,
    yearsOfTeachingExperience,
    phoneNumber,
    emailAddress,
    image,
    firstName,
    lastName,
  } = addLessonFormData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1200px] mt-32 m-auto">
      <div className="m-auto px-8 py-6 md:w-[700px] shadow-md rounded-2xl text-left sm:text-justify bg-green-200">
        {" "}
        <h1 className="mb-12 font-semibold text-5xl text-center font-mono">
          Add a lesson
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="firstName" className="text-xl">
              Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className={`w-[100%] h-10 rounded ${
                foundErrors.firstName ? "border border-red-500" : ""
              }`}
            />

            {foundErrors.firstName ? (
              <p className="form-error-message">{foundErrors.firstName}</p>
            ) : (
              ""
            )}
          </div>

          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="lastName" className="text-xl ">
              Last name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              maxLength="50"
              onChange={handleChange}
              className={`w-[100%] h-10 rounded ${
                foundErrors.lastName ? "border border-red-500" : ""
              }`}
            />
            {foundErrors.lastName ? (
              <p className="form-error-message">{foundErrors.lastName}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="subject" className="text-xl ">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={subject}
              onChange={handleChange}
              className={`h-10 rounded ${
                foundErrors.subject ? "border border-red-500" : ""
              }`}
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
            {foundErrors.subject ? (
              <p className="form-error-message">{foundErrors.subject}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="city" className="text-xl">
              City
            </label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={handleChange}
              className={`h-10 rounded ${
                foundErrors.city ? "border border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                --Choose--
              </option>
              {cityOptions.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            {foundErrors.city ? (
              <p className="form-error-message">{foundErrors.city}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="price" className="text-xl ">
              Price
            </label>
            <span className="after:content-['__PLN']">
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                className={`w-[25%] h-10 rounded ${
                  foundErrors.price ? "border border-red-500" : ""
                }`}
              />
            </span>
            {foundErrors.price ? (
              <p className="form-error-message">{foundErrors.price}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-8">
            <label htmlFor="lessonTime" className="text-xl">
              Lesson time
            </label>
            <span className="after:content-['__minutes']">
              <input
                type="number"
                id="lessonTime"
                name="lessonTime"
                value={lessonTime}
                max="120"
                step="5"
                onChange={handleChange}
                className={`w-[25%] h-10 rounded ${
                  foundErrors.lessonTime ? "border border-red-500" : ""
                }`}
              />
            </span>
            {foundErrors.lessonTime ? (
              <p className="form-error-message">{foundErrors.lessonTime}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="lessonLocation" className="text-xl">
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
                <label htmlFor="atStudentsPlace">At Students' place</label>
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
            {foundErrors.lessonLocation ? (
              <p className="form-error-message">{foundErrors.lessonLocation}</p>
            ) : (
              ""
            )}
          </div>

          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="shortDescription" className=" mr-4 text-xl">
              Short description{" "}
              <span className="text-xs font-normal whitespace-nowrap">
                (50 - 250 letters)
              </span>
            </label>
            <textarea
              rows="4"
              id="shortDescription"
              name="shortDescription"
              value={shortDescription}
              onChange={handleChange}
              className={`w-[100%] h-20 rounded text-sm ${
                foundErrors.shortDescription ? "border border-red-500" : ""
              }`}
            />
            {foundErrors.shortDescription ? (
              <p className="form-error-message">
                {foundErrors.shortDescription}
              </p>
            ) : (
              ""
            )}
          </div>

          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="fullDescription" className="mr-4 text-xl">
              Full description{" "}
              <span className="text-xs font-normal whitespace-nowrap">
                (100 - 700 letters)
              </span>
            </label>
            <textarea
              rows="4"
              id="fullDescription"
              name="fullDescription"
              value={fullDescription}
              onChange={handleChange}
              className={`w-[100%] h-40 rounded text-xs ${
                foundErrors.fullDescription ? "border border-red-500" : ""
              }`}
            />
            {foundErrors.fullDescription ? (
              <p className="form-error-message">
                {foundErrors.fullDescription}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="grid grid-cols-2 items-center justify-center mb-8">
            <label className="mr-4 text-xl" htmlFor="videoLink">
              Your video URL{" "}
              <span className="text-xs font-normal whitespace-nowrap">
                (https://...)
              </span>
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
              className="w-[100%] h-10 rounded"
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="levelsOfTeaching" className="text-xl ">
              Levels Of Teaching
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="elementarySchool"
                  name="elementarySchool"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="elementarySchool">ElementarySchool</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="highSchool"
                  name="highSchool"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="highSchool">High School</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="college"
                  name="college"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="college">College</label>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <input
                  type="checkbox"
                  id="adults"
                  name="adults"
                  className="rounded"
                  onChange={handleChange}
                />
                <label htmlFor="adults">Adults</label>
              </div>
            </div>
            {foundErrors.levelsOfTeaching ? (
              <p className="form-error-message">
                {foundErrors.levelsOfTeaching}
              </p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="yearsOfTeachingExperience" className="text-xl ">
              Teaching experience
            </label>
            <span className="after:content-['__years']">
              <input
                type="number"
                id="yearsOfTeachingExperience"
                name="yearsOfTeachingExperience"
                value={yearsOfTeachingExperience}
                min="0"
                onChange={handleChange}
                className={`w-[25%] h-10 rounded ${
                  foundErrors.shortDescription ? "border border-red-500" : ""
                }`}
              />
            </span>
            {foundErrors.yearsOfTeachingExperience ? (
              <p className="form-error-message">
                {foundErrors.yearsOfTeachingExperience}
              </p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="emailAddress" className="text-xl ">
              Email:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={emailAddress}
              maxLength="50"
              onChange={handleChange}
              className={`w-[100%] h-10 rounded ${
                foundErrors.emailAddress ? "border border-red-500" : ""
              }`}
            />
            {foundErrors.emailAddress ? (
              <p className="form-error-message">{foundErrors.emailAddress}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="phoneNumber" className="text-xl ">
              Phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className={`w-[100%] h-10 rounded ${
                foundErrors.phoneNumber ? "border border-red-500" : ""
              }`}
            />
            {foundErrors.phoneNumber ? (
              <p className="form-error-message">{foundErrors.phoneNumber}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="image" className="text-xl">
              Photo of yourself
            </label>
            <input
              type="file"
              id="image"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
            />
            {foundErrors.image ? (
              <p className="form-error-message">{foundErrors.image}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-5 mb-2 mt-4 md:mr-8 rounded-2xl font-bold whitespace-nowrap bg-white text-green-400"
            >
              Create lesson
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
