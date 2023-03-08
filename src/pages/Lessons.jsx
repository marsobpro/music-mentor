import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import SingleListingTile from "../components/SingleListingTile";

export default function Lessons() {
  const [isLoading, setIsLoading] = useState(false);
  const [listingsList, setListingsList] = useState([]);
  const params = useParams();
  const { subject, city, id } = params;

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      const lessonsRef = collection(db, "listings");
      const q = query(lessonsRef, where("college", "==", true));
      const querySnapshot = await getDocs(q);
      const temporaryListings = [];
      querySnapshot.forEach((doc) => {
        return temporaryListings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListingsList((prevState) => [...prevState, ...temporaryListings]);

      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
      setIsLoading(false);
    }
    getData();
  }, []);

  function capitalizeFirstLetters(string) {
    const arr = string.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const capitalized = arr.join(" ");
    return capitalized;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="mt-28 text-2xl">
      <h1 className="text-center">
        Here are some{" "}
        <span className="text-green-500 font-semibold underline decoration-dotted underline-offset-4">
          {subject}
        </span>{" "}
        teachers from{" "}
        <span className="text-green-500 font-semibold underline decoration-dotted underline-offset-4">
          {capitalizeFirstLetters(city)}{" "}
        </span>
      </h1>
      <ul>{<SingleListingTile />}</ul>
      <p>{listingsList[0].data.emailAddress}</p>
      <p>{listingsList[1].data.emailAddress}</p>
      <p></p>
    </main>
  );
}
