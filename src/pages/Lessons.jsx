import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import SingleListingTile from "../components/SingleListingTile";
import { AppContext } from "../App";
import toast from "react-hot-toast";

export default function Lessons() {
  const [isLoading, setIsLoading] = useState(false);
  const [listingsList, setListingsList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { subjectOptions, cityOptions } = useContext(AppContext);
  const { subject, city } = params;

  function isProperValue(availableOptions, validatedValue) {
    if (!validatedValue) {
      return;
    }
    const filtered = availableOptions.filter(
      (singleItem) => singleItem.value === validatedValue
    );
    if (!filtered.length) {
      navigate("/");
      toast.error(
        "We did not find any lessons meeting the given criteria. Please try again with different data."
      );
    }
  }

  useEffect(() => {
    setIsLoading(true);
    isProperValue(subjectOptions, subject);
    isProperValue(cityOptions, city);

    async function getData() {
      try {
        let q = null;
        const lessonsRef = collection(db, "listings");

        if (city === undefined) {
          if (subject !== undefined) {
            q = query(
              lessonsRef,
              where("subject", "==", subject),
              orderBy("createdAt", "desc")
            );
          } else {
            q = query(lessonsRef, orderBy("createdAt", "desc"));
          }
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
        setListingsList([...temporaryListings]);
        setIsLoading(false);
      } catch (error) {
        toast.error("Sorry, I couldn't fetch the data. Please try again.");
        console.log(error);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1100px] px-4 mt-28 m-auto text-2xl">
      <h1 className="mx-4 text-center font-montserrat font-bold text-3xl">
        Here are our{" "}
        <span className="font-pacifico text-green-500">{subject}</span> mentors
        {city ? (
          <span>
            {" "}
            from{" "}
            <span className="capitalize font-pacifico text-green-500">
              {city}{" "}
            </span>
          </span>
        ) : (
          <span></span>
        )}
      </h1>

      {listingsList.length ? (
        <section className="mt-16 m-auto md:mt-24">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-16 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
            {listingsList.map((listing) => (
              <SingleListingTile
                key={listing.id}
                listingId={listing.id}
                listingData={listing.data}
              />
            ))}
          </ul>
        </section>
      ) : (
        <p className="mt-[30%] text-center font-montserrat">
          Unfortunately, I did not find any teachers meeting the given criteria
          in the database. Please try again with different data!
        </p>
      )}
    </main>
  );
}
