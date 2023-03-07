import React, { useContext, useState } from "react";
import Loading from "../components/Loading";
import { AppContext } from "../App";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// ZROB CHECKBOXY -> VALUE, ONCHANGE ORAZ ZMIEN HANDLECHANGE

export default function CreateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const { subjectOptions, cityOptions } = useContext(AppContext);
  const navigate = useNavigate();
  const [addLessonFormData, setAddLessonFormData] = useState({
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
    toast.success("You've created a listing!", { icon: "🙌", duration: 2200 });
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
  } = addLessonFormData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1200px] mt-32 m-auto ">
      <div className="md:w-[700px] m-auto px-8 py-6 bg-green-300 shadow-md rounded-2xl ">
        {" "}
        <h1 className="font-semibold text-5xl text-center mb-12 font-mono">
          Add lesson
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="subject" className="text-xl text-center">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={subject}
              onChange={handleChange}
              className="h-10 rounded"
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
            <label htmlFor="city" className="text-xl text-center">
              City
            </label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={handleChange}
              className="h-10 rounded"
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
                max="120"
                step="5"
                onChange={handleChange}
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
              className="w-[100%] h-10 rounded"
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
            <label
              htmlFor="yearsOfTeachingExperience"
              className="text-xl text-center"
            >
              Your teaching experience
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
              />
            </span>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="emailAddress" className="text-xl text-center">
              Your email:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={emailAddress}
              maxLength="50"
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="phoneNumber" className="text-xl text-center">
              Your phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              maxLength="20"
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2 items-center justify-center mb-4">
            <label htmlFor="photo" className="text-xl text-center">
              Your photo
            </label>
            <input
              type="file"
              id="photo"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
              className="w-[100%] h-10 rounded"
            />
          </div>
          <button type="submit">Create lesson</button>
        </form>
      </div>
    </main>
  );
}
