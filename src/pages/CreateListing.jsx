import React, { useContext, useState } from "react";
import Loading from "../components/Loading";
import { AppContext } from "../App";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

export default function CreateListing() {
  const [isLoading, setIsLoading] = useState(false);
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

  function handleChange(e) {
    //Checkboxes
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
    // console.log(e.target.id, e.target.files);
    // console.log(addLessonFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let imageUrl = null;

    if (!online && !atStudentsPlace && !atMentorsPlace) {
      toast.error("Please choose the location of your lessons.");
      return;
    }

    if (!elementarySchool && !highSchool && !college && !adults) {
      toast.error("Please choose at least one age group you are teaching.");
      return;
    }

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
    console.dir(addLessonFormDataCopy);

    const docRef = await addDoc(
      collection(db, "listings"),
      addLessonFormDataCopy
    );

    setIsLoading(false);
    toast.success("You've created a listing!", { icon: "🙌", duration: 3000 });
    navigate(
      `/lessons/${addLessonFormDataCopy.subject}/${addLessonFormDataCopy.city}/${docRef.id}`
    );

    console.log(addLessonFormDataCopy);
    console.dir(addLessonFormDataCopy);
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
    <main className="max-w-[1200px] mt-32 m-auto ">
      <div className="md:w-[700px] m-auto px-8 py-6 bg-green-200 shadow-md rounded-2xl text-left sm:text-justify ">
        {" "}
        <h1 className="font-semibold text-5xl text-center mb-12 font-mono">
          Add lesson
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center justify-center mb-4 ">
            <label htmlFor="firstName" className="text-xl ">
              Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              maxLength="50"
              required
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
            />
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
              required
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
            />
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
              className="h-10 rounded"
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
            <label htmlFor="city" className="text-xl">
              City
            </label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={handleChange}
              className="h-10 rounded"
              required
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
                min="10"
                max="400"
                onChange={handleChange}
                className="w-[25%] h-10 rounded"
                required
              />
            </span>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-8">
            <label htmlFor="lessonTime" className="text-xl ">
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
                className="w-[25%] h-10 rounded"
                required
              />
            </span>
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
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="shortDescription" className="text-xl mr-4">
              Short description{" "}
              <span className="text-xs font-normal whitespace-nowrap">
                (50 - 250 letters)
              </span>
            </label>
            <textarea
              minLength="50"
              maxLength="250"
              rows="4"
              id="shortDescription"
              name="shortDescription"
              value={shortDescription}
              onChange={handleChange}
              className="w-[100%] h-20 rounded"
              required
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="fullDescription" className="text-xl mr-4">
              Full description{" "}
              <span className="text-xs font-normal whitespace-nowrap">
                (100 - 700 letters)
              </span>
            </label>
            <textarea
              minLength="100"
              maxLength="700"
              rows="4"
              id="fullDescription"
              name="fullDescription"
              value={fullDescription}
              onChange={handleChange}
              className="w-[100%] h-40 rounded"
              required
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-8">
            <label className="text-xl mr-4" htmlFor="videoLink">
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
            <label htmlFor="teachingLevels" className="text-xl ">
              Credentials
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
                max="50"
                onChange={handleChange}
                className="w-[25%] h-10 rounded"
                required
              />
            </span>
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
              className="w-[100%] h-10 rounded"
              required
            />
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
              minLength="7"
              maxLength="20"
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
              required
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="photo" className="text-xl">
              Photo
            </label>
            <input
              type="file"
              id="photo"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white py-2 px-5 md:mr-8 mb-2 mt-4 rounded-2xl font-bold text-green-400 whitespace-nowrap"
            >
              Create lesson
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
