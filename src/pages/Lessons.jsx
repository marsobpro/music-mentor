import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import SingleListingTile from "../components/SingleListingTile";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";

export default function Lessons() {
  const [isLoading, setIsLoading] = useState(false);
  const [listingsList, setListingsList] = useState([]);
  const params = useParams();
  const { subject, city, id } = params;

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const lessonsRef = collection(db, "listings");

        const q = query(
          lessonsRef,
          where("subject", "==", subject),
          where("city", "==", city)
        );
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
        teachers from{" "}
        <span className="text-green-500 font-semibold underline decoration-dotted underline-offset-4">
          {city ? capitalizeFirstLetters(city) : ""}{" "}
        </span>
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
    </main>
  );
}
