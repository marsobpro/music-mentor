import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import SingleListingTile from "../components/SingleListingTile";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";
import { AppContext } from "../App";
import toast from "react-hot-toast";

export default function Lessons() {
  const [isLoading, setIsLoading] = useState(false);
  const [listingsList, setListingsList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { subjectOptions, cityOptions } = useContext(AppContext);
  const { subject, city } = params;

  function isProperSubjectName(options, name) {
    const filtered = options.filter(
      (singleSubject) => singleSubject.value === subject
    );
    if (!filtered.length && name != undefined) {
      navigate("/");
      toast.error("Sorry, we don't have this subject in our database :(");
    }
  }
  function isProperCityName(options, city) {
    const filtered = options.filter(
      (singleSubject) => singleSubject.value === city
    );
    if (!filtered.length && city != undefined) {
      navigate("/");
      toast.error("Sorry, we don't have this city in our database :(");
    }
  }

  useEffect(() => {
    setIsLoading(true);
    isProperSubjectName(subjectOptions, subject);
    isProperCityName(cityOptions, city);
    let q;

    async function getData() {
      try {
        const lessonsRef = collection(db, "listings");

        if (city == undefined && subject != undefined) {
          q = query(
            lessonsRef,
            where("subject", "==", subject),
            orderBy("createdAt", "desc")
          );
        } else if (subject == undefined && city == undefined) {
          q = query(lessonsRef, orderBy("createdAt", "desc"));
        } else {
          q = query(
            lessonsRef,
            where("subject", "==", subject),
            where("city", "==", city),
            orderBy("createdAt", "desc")
          );
        }

        const querySnapshot = await getDocs(q);
        const temporaryListings = [];
        querySnapshot.forEach((doc) => {
          return temporaryListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // setListingsList((prevState) => [...prevState, ...temporaryListings]);
        setListingsList([...temporaryListings]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="mt-28 text-2xl max-w-[1100px] m-auto">
      <h1 className="text-center text-3xl mx-4">
        Here are some{" "}
        <span className="text-green-500 font-semibold underline decoration-dotted underline-offset-4">
          {subject}
        </span>{" "}
        teachers{" "}
        {city ? (
          <span>
            from{" "}
            <span className="text-green-500 font-semibold underline decoration-dotted underline-offset-4">
              {capitalizeFirstLetters(city)}{" "}
            </span>
          </span>
        ) : (
          <span></span>
        )}
      </h1>

      {listingsList.length > 0 && (
        <section className="mt-16 md:mt-24 m-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-items-center ">
            {listingsList.map((listing) => (
              <SingleListingTile
                key={listing.id}
                id={listing.id}
                data={listing.data}
              />
            ))}
          </ul>
        </section>
      )}
      {listingsList.length == 0 && (
        <p className="mt-24 font-semibold">
          ☹️ Unfortunately, I did not find any teachers meeting the given
          criteria in the database. Try again with different data!
        </p>
      )}
    </main>
  );
}
