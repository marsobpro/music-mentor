import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { db } from "../firebase";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { CiPhone, CiMail } from "react-icons/ci";
import toast from "react-hot-toast";
import YoutubeVideo from "../components/YoutubeVideo";
import { HiOutlineStatusOnline } from "react-icons/hi";

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
        setIsLoading(false);
        toast.error(
          "Sorry, I could not download this lesson. Please try again."
        );
      }
    }
    getData();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1000px] m-auto px-6">
      <div className="mt-24 mb-4 py-4 rounded-3xl bg-green-200">
        <div className="w-40 mb-10 m-auto">
          <img
            src={`${singleListingData?.imageUrl}`}
            alt="Mentor's profile picture"
            loading="lazy"
            className="w-full h-40 p-1 mb-4 object-cover rounded-3xl bg-white"
          />
          <p className="text-center font-semibold text-4xl font-mono"></p>
          <p className="mb-4 text-center text-3xl font-bold">{`${singleListingData?.firstName}`}</p>
        </div>

        <div className="py-4 mx-2 rounded-full bg-white">
          {" "}
          <ul className="flex items-center justify-around w-[90%] m-auto text-center">
            <li className="flex flex-col justify-center text-center">
              <span className="font-semibold">
                {+singleListingData?.yearsOfTeachingExperience === 1
                  ? "1 year"
                  : `${singleListingData?.yearsOfTeachingExperience} years`}
              </span>
              <span className="text-xs">of experience</span>
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
      <div className="flex flex-col items-start space-y-4 mb-7 sm:space-y-0 sm:flex-row sm:space-x-4 w-auto">
        {" "}
        <div className="px-6 leading-8 inline-block text-xl rounded-2xl font-semibold border-4 border-green-300 bg-white text-black">
          <p>{singleListingData?.subject}</p>
        </div>
        <div className="px-6 leading-8 inline-block text-xl rounded-2xl font-semibold border-4 border-green-300 bg-white text-black">
          <p className="capitalize">{singleListingData?.city}</p>
        </div>
        {singleListingData?.online ? (
          <div className="px-6 leading-8 inline-block text-xl rounded-2xl font-semibold border-4 border-green-300 bg-white text-black">
            <div className="capitalize flex items-center space-x-2">
              <p>Online</p>
              <HiOutlineStatusOnline />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* 50 words */}
      <div className="mb-12">
        <p className="text-2xl leading-8 font-bold">
          {singleListingData?.shortDescription}
        </p>
      </div>

      {singleListingData?.videoLink ? (
        <div className="">
          <YoutubeVideo url={singleListingData?.videoLink} />
        </div>
      ) : (
        ""
      )}

      <div className=" px-5 py-2 mb-12 space-y-4 shadow-md rounded-3xl">
        <h3 className="text-lg font-semibold">Where?</h3>
        <div className="flex text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.atMentorsPlace ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
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
        <div className="flex text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.atStudentsPlace ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
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
        <div className="flex w-full text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.online ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
          </span>
          <p className="inline-block">Online</p>
        </div>
      </div>

      <div className="mb-12 font-semibold leading-7">
        <p>{singleListingData?.fullDescription}</p>
      </div>

      <div className="mb-12 px-5 py-2 space-y-4 shadow-md rounded-3xl duration-100">
        <h3 className="text-lg font-semibold">Levels</h3>
        <div className="flex text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.elementarySchool ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
          </span>
          <p className="inline-block">Elementary school</p>
        </div>
        <div className="flex text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.highSchool ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
          </span>
          <p className="inline-block">High school</p>
        </div>
        <div className="flex w-full text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.college ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
          </span>
          <p className="inline-block">College</p>
        </div>
        <div className="flex w-full text-sm">
          <span className="mr-4 inline-block text-xl">
            {singleListingData?.adults ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <GiCancel className="text-red-500" />
            )}
          </span>
          <p className="inline-block">Adults</p>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center mb-12 space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex items-center mx-2 py-4 px-3 md:w-auto shadow-lg text-xs md:text-md rounded-full border border-slate-400">
          <span className="inline-block mr-1">
            <CiPhone />
          </span>
          {singleListingData?.phoneNumber}
        </div>

        <div className="flex items-center mx-2 py-4 px-3 md:w-auto shadow-lg text-xs md:text-md rounded-full border border-slate-400">
          <span className="inline-block mr-1">
            <CiMail />
          </span>
          {singleListingData?.emailAddress}
        </div>
      </div>
    </main>
  );
}
