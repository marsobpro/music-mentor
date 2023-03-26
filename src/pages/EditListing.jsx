import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { AppContext } from "../App";
import validateFormData from "../utils/validateFormData";

export default function CreateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRenderingAllowed, setIsRenderingAllowed] = useState(false);
  const [errorsFound, setErrorsFound] = useState({});
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
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
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const { subjectOptions, cityOptions } = useContext(AppContext);

  useEffect(() => {
    async function checkAccess() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      const { userId } = docSnap.data();
      if (userId !== auth.currentUser?.uid) {
        navigate("/sign-in");
      } else setIsRenderingAllowed(true);
    }
    checkAccess();
  }, [navigate, params.id]);

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAddLessonFormData(docSnap.data());
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsRenderingAllowed(false);
        toast.error("Sorry, something went wrong. Please try again.");
        navigate("/profile");
      }
    }
    getData();
  }, [params.id, navigate]);

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
    e.preventDefault();
    setIsLoading(true);
    const errors = validateFormData(addLessonFormData);
    delete errors["password"];
    delete errors["message"];
    if (!isUpdatingPhoto) {
      delete errors["image"];
    }
    if (Object.keys(errors).length) {
      setErrorsFound(errors);
      setIsLoading(false);
      toast.error("Check that you have filled out the form correctly.", {
        icon: "🔎",
      });
      return;
    }

    let imageUrl = null;

    // Upload the image and get imageUrl
    if (isUpdatingPhoto) {
      try {
        const fileName = `listingsImages/${image.name + v4()}`;
        const imageRef = ref(storage, fileName);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.log(error);
      }
    } else {
      imageUrl = addLessonFormData?.imageUrl;
    }

    //Create the formData copy, modify it
    const addLessonFormDataCopy = {
      ...addLessonFormData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      imageUrl: imageUrl,
      userId: auth.currentUser.uid,
    };
    delete addLessonFormDataCopy.image;
    const docRef = doc(db, "listings", params.id);
    await updateDoc(docRef, addLessonFormDataCopy);

    setIsLoading(false);
    toast.success("You've successfully updated your lesson!", {
      icon: "🙌",
    });
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
    atMentorsPlace,
    atStudentsPlace,
    online,
    elementarySchool,
    highSchool,
    college,
    adults,
  } = addLessonFormData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isRenderingAllowed ? (
        <main className="max-w-[1200px] mt-28 m-auto">
          <div className="md:w-[700px] w-[95%] m-auto px-8 py-6 mb-2 text-left sm:text-justify shadow-md rounded-2xl text-black font-medium bg-green-300">
            {" "}
            <h1 className="mb-12 text-center font-semibold text-5xl font-mono">
              Edit your lesson
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="form__grid-container">
                <label htmlFor="firstName" className="text-xl">
                  Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  maxLength="50"
                  onChange={handleChange}
                  className={`form__grid-container__text-input ${
                    errorsFound.firstName ? "border border-red-500" : ""
                  }`}
                />

                {errorsFound.firstName ? (
                  <p className="form-error-message">{errorsFound.firstName}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="lastName" className="text-xl">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className={`form__grid-container__text-input ${
                    errorsFound.lastName ? "border border-red-500" : ""
                  }`}
                />
              </div>

              {errorsFound.lastName ? (
                <p className="form-error-message">{errorsFound.lastName}</p>
              ) : (
                ""
              )}

              <div className="form__grid-container">
                <label htmlFor="subject" className="text-xl">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={handleChange}
                  className={`h-10 rounded ${
                    errorsFound.subject ? "border border-red-500" : ""
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

                {errorsFound.subject ? (
                  <p className="form-error-message">{errorsFound.subject}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="city" className="text-xl">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  className={`h-10 rounded ${
                    errorsFound.city ? "border border-red-500" : ""
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

                {errorsFound.city ? (
                  <p className="form-error-message">{errorsFound.city}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
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
                    className={`form__grid-container__number-input ${
                      errorsFound.price ? "border border-red-500" : ""
                    }`}
                  />
                </span>

                {errorsFound.price ? (
                  <p className="form-error-message">{errorsFound.price}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="lessonTime" className="text-xl">
                  Lesson time
                </label>
                <span className="after:content-['__minutes']">
                  <input
                    type="number"
                    id="lessonTime"
                    name="lessonTime"
                    value={lessonTime}
                    min="0"
                    step="5"
                    onChange={handleChange}
                    className={`form__grid-container__number-input ${
                      errorsFound.lessonTime ? "border border-red-500" : ""
                    }`}
                  />
                </span>

                {errorsFound.lessonTime ? (
                  <p className="form-error-message">{errorsFound.lessonTime}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="lessonLocation" className="text-xl">
                  Lesson location
                </label>
                <div className="form__grid-container__checkbox-div">
                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="atMentorsPlace"
                      name="atMentorsPlace"
                      className="rounded"
                      checked={atMentorsPlace}
                      onChange={handleChange}
                    />
                    <label htmlFor="atMentorsPlace">At Mentors' place</label>
                  </div>
                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="atStudentsPlace"
                      name="atStudentsPlace"
                      className="rounded"
                      checked={atStudentsPlace}
                      onChange={handleChange}
                    />
                    <label htmlFor="atStudentsPlace">At Students' place</label>
                  </div>

                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="online"
                      name="online"
                      className="rounded"
                      checked={online}
                      onChange={handleChange}
                    />
                    <label htmlFor="online">Online</label>
                  </div>
                </div>

                {errorsFound.lessonLocation ? (
                  <p className="form-error-message">
                    {errorsFound.lessonLocation}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="shortDescription" className="text-xl">
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
                  className={`w-[100%] h-20 rounded text-xs sm:text-sm ${
                    errorsFound.shortDescription ? "border border-red-500" : ""
                  }`}
                />

                {errorsFound.shortDescription ? (
                  <p className="form-error-message">
                    {errorsFound.shortDescription}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="fullDescription" className="text-xl">
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
                    errorsFound.fullDescription ? "border border-red-500" : ""
                  }`}
                />

                {errorsFound.fullDescription ? (
                  <p className="form-error-message">
                    {errorsFound.fullDescription}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label className="text-xl text-left" htmlFor="videoLink">
                  Youtube link{" "}
                  <span className="text-xs font-normal block">
                    (Show how you teach or how you play!)
                  </span>
                </label>
                <input
                  type="text"
                  name="videoLink"
                  id="videoLink"
                  value={videoLink}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className={`form__grid-container__text-input ${
                    errorsFound.videoLink ? "border border-red-500" : ""
                  }`}
                />

                {errorsFound.videoLink ? (
                  <p className="form-error-message text-left">
                    {errorsFound.videoLink}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="levelsOfTeaching" className="text-xl">
                  Levels Of Teaching
                </label>
                <div className="form__grid-container__checkbox-div">
                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="elementarySchool"
                      name="elementarySchool"
                      className="rounded"
                      checked={elementarySchool}
                      onChange={handleChange}
                    />
                    <label htmlFor="elementarySchool">Elementary School</label>
                  </div>
                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="highSchool"
                      name="highSchool"
                      className="rounded"
                      checked={highSchool}
                      onChange={handleChange}
                    />
                    <label htmlFor="highSchool">High School</label>
                  </div>
                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="college"
                      name="college"
                      className="rounded"
                      checked={college}
                      onChange={handleChange}
                    />
                    <label htmlFor="college">College</label>
                  </div>
                  <div className="form__grid-container__checkbox-input">
                    {" "}
                    <input
                      type="checkbox"
                      id="adults"
                      name="adults"
                      className="rounded"
                      checked={adults}
                      onChange={handleChange}
                    />
                    <label htmlFor="adults">Adults</label>
                  </div>
                </div>

                {errorsFound.levelsOfTeaching ? (
                  <p className="form-error-message">
                    {errorsFound.levelsOfTeaching}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="yearsOfTeachingExperience" className="text-xl">
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
                    className={`form__grid-container__number-input ${
                      errorsFound.shortDescription
                        ? "border border-red-500"
                        : ""
                    }`}
                  />
                </span>

                {errorsFound.yearsOfTeachingExperience ? (
                  <p className="form-error-message">
                    {errorsFound.yearsOfTeachingExperience}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="emailAddress" className="text-xl">
                  Email
                </label>
                <input
                  type="text"
                  autoComplete="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={handleChange}
                  className={`form__grid-container__text-input ${
                    errorsFound.emailAddress ? "border border-red-500" : ""
                  }`}
                />

                {errorsFound.emailAddress ? (
                  <p className="form-error-message">
                    {errorsFound.emailAddress}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container">
                <label htmlFor="phoneNumber" className="text-xl">
                  Phone number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  className={`form__grid-container__text-input ${
                    errorsFound.phoneNumber ? "border border-red-500" : ""
                  }`}
                />

                {errorsFound.phoneNumber ? (
                  <p className="form-error-message">
                    {errorsFound.phoneNumber}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form__grid-container mb-10">
                {" "}
                <label className="text-xl">
                  Do you want to update the photo?
                </label>
                <div className="flex align-center justify-around">
                  {" "}
                  <button
                    type="button"
                    className={`px-2 py-1 rounded-2xl cursor-pointer shadow-md hover:shadow-none transition duration-120 bg-white text-black ${
                      isUpdatingPhoto ? "border-2 border-black" : ""
                    }`}
                    onClick={() => setIsUpdatingPhoto(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-1 rounded-2xl cursor-pointer shadow-md hover:shadow-none transition duration-120 bg-white text-black ${
                      isUpdatingPhoto ? "" : "border-2 border-black"
                    }`}
                    onClick={() => setIsUpdatingPhoto(false)}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="form__grid-container">
                <label htmlFor="photo" className="text-xl">
                  {isUpdatingPhoto
                    ? "Add new photo"
                    : "We'll keep your current photo:"}
                </label>
                <div>
                  {isUpdatingPhoto ? (
                    <input
                      type="file"
                      id="photo"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleChange}
                      className="w-[100%] h-10 rounded"
                      disabled={!isUpdatingPhoto}
                    />
                  ) : (
                    <div className="grid place-items-center text-center">
                      <img
                        src={`${addLessonFormData?.imageUrl}`}
                        alt="Mentor's profile picture"
                        loading="lazy"
                        className="w-[90px] p-[0.18rem] h-auto rounded-xl object-cover bg-white"
                      />
                    </div>
                  )}
                </div>

                {errorsFound.image ? (
                  <p className="form-error-message text-left">
                    {errorsFound.image}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-5 mb-2 mt-4 md:mr-8 rounded-2xl font-bold whitespace-nowrap shadow-lg hover:shadow-none bg-white text-green-400"
                >
                  Edit lesson
                </button>
              </div>
            </form>
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
}
