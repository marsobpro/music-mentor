import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { db } from "../firebase";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { CiPhone, CiMail } from "react-icons/ci";

export default function SingleListing() {
  const params = useParams();
  const [singleListingData, setSingleListingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSingleListingData(docSnap.data());
        setIsLoading(false);
      } else {
        console.log("Docsnap does not exist!");
      }
    }
    getData();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1000px] m-auto px-6">
      <div className="bg-green-200 rounded-3xl mt-24 py-4  mb-4">
        <div className="mb-10 w-40 m-auto">
          <img
            src={`${singleListingData?.imageUrl}`}
            alt="Mentor's profile picture"
            loading="lazy"
            className="bg-white p-1 object-cover w-full h-40 rounded-3xl mb-4"
          />
          <p className="text-center font-semibold text-4xl font-mono"></p>
          <p className="text-center text-3xl font-bold mb-4">{`${singleListingData?.firstName}`}</p>
          <p className="text-center text-sm">Last seen: 2 days ago</p>
        </div>

        <div className="bg-white rounded-full py-4 mx-2">
          {" "}
          <ul className="flex items-center justify-around w-[90%] m-auto text-center">
            <li className="flex flex-col justify-center text-center ">
              <span className="font-semibold">{`${singleListingData?.yearsOfTeachingExperience} years`}</span>
              <span className="text-xs">Experience</span>
            </li>
            <li className="flex flex-col justify-center text-center">
              <span className="font-semibold">{`${singleListingData?.price} PLN`}</span>
              <span className="text-xs">Price</span>
            </li>
            <li className="flex flex-col justify-center text-center">
              <span className="font-semibold">{`${singleListingData?.lessonTime} min`}</span>
              <span className="text-xs">Lesson duration</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex space-x-4">
        {" "}
        <div className="px-6 leading-8 mb-12 bg-green-200 text-red-500 text-xl inline-block rounded-2xl">
          <p>{singleListingData?.subject}</p>
        </div>
        <div className="px-6 leading-8 mb-12 bg-green-200 text-red-500 text-xl inline-block rounded-2xl">
          <p className="capitalize">{singleListingData?.city}</p>
        </div>
      </div>

      {/* 50 words */}
      <div className="mb-12">
        <p className="font-bold text-2xl leading-8">
          {singleListingData?.shortDescription}
        </p>
      </div>

      <div className="shadow-md rounded-3xl px-5 py-2 space-y-4 mb-12">
        <h3 className="text-lg font-semibold">Where?</h3>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.atMentorsPlace ? <GiConfirmed /> : <GiCancel />}
          </span>
          <p className="inline-block">
            At Mentors' place{" "}
            {singleListingData?.atMentorsPlace ? (
              <span>
                (in
                <span className="capitalize">{` ${singleListingData?.city})`}</span>
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.atStudentsPlace ? (
              <GiConfirmed />
            ) : (
              <GiCancel />
            )}
          </span>
          <p className="inline-block">
            At Students' place{" "}
            {singleListingData?.atStudentsPlace ? (
              <span>
                (in
                <span className="capitalize">{` ${singleListingData?.city})`}</span>
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="text-sm w-full flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.online ? <GiConfirmed /> : <GiCancel />}
          </span>
          <p className="inline-block">Online</p>
        </div>
      </div>

      <div className="font-semibold leading-7 mb-12">
        <p>{singleListingData?.fullDescription}</p>
      </div>

      <div className="shadow-md rounded-3xl px-5 py-2 space-y-4 mb-12 transition duration-100">
        <h3 className="text-lg font-semibold">Levels</h3>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.elementarySchool ? (
              <GiConfirmed />
            ) : (
              <GiCancel />
            )}
          </span>
          <p className="inline-block">Elementary school</p>
        </div>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.highSchool ? <GiConfirmed /> : <GiCancel />}
          </span>
          <p className="inline-block">High school</p>
        </div>
        <div className="text-sm w-full flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.college ? <GiConfirmed /> : <GiCancel />}
          </span>
          <p className="inline-block">College</p>
        </div>
        <div className="text-sm w-full flex">
          <span className="inline-block text-xl mr-4">
            {singleListingData?.adults ? <GiConfirmed /> : <GiCancel />}
          </span>
          <p className="inline-block">Adults</p>
        </div>
      </div>

      <div className="flex justify-around items-center flex-col sm:flex-row mb-12 space-y-4 sm:space-y-0 ">
        <button className="w-[230px] md:w-auto flex space-x-4 items-center mx-2 py-4 px-6 border border-slate-400  shadow-lg rounded-full">
          <span className="inline-block mr-1">
            <CiPhone />
          </span>
          {singleListingData?.phoneNumber}
        </button>

        <button className="w-[230px] md:w-auto flex space-x-4 items-center mx-2 py-4 px-6 border border-slate-400  shadow-lg rounded-full">
          <span className="inline-block mr-1">
            <CiMail />
          </span>
          {singleListingData?.emailAddress}
        </button>
      </div>
    </main>
  );
}
