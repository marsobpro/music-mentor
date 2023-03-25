import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import SingleListingTile from "../components/SingleListingTile";
import toast from "react-hot-toast";

export default function Profile() {
  const [listingsList, setListingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const lessonsRef = collection(db, "listings");
        const q = query(
          lessonsRef,
          where("userId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const temporaryListings = [];
        querySnapshot.forEach((doc) => {
          return temporaryListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListingsList([...temporaryListings]);
        setUserName(auth.currentUser.displayName);
        setIsLoading(false);
      } catch (error) {
        toast.error("Sorry, I couldn't fetch the data. Please try again.");
        console.log(error);
      }
    }
    getData();
  }, []);

  async function handleDelete(id) {
    if (
      window.confirm(
        "For your safety, please confirm you want to delete this lesson"
      )
    ) {
      await deleteDoc(doc(db, "listings", id));
      const updatedListingsList = listingsList.filter(
        (listing) => listing.id !== id
      );
      setListingsList(updatedListingsList);
      toast.success("Lesson successfully removed!");
    } else {
      toast.error("You didn't cancel the lesson");
    }
  }

  function handleEdit(id) {
    navigate(`/edit-listing/${id}`);
  }
  return (
    <main className="max-w-[1100px] m-auto">
      <div>
        <h1 className="mt-28 text-center font-bold text-4xl">
          Hi,{" "}
          <span className="font-pacifico text-green-500">{`${userName}`} </span>
          👋
        </h1>
        <div className="w-[20rem] py-6 m-auto mt-20 md:w-[30rem] shadow-2xl rounded-2xl bg-green-400">
          <div className="flex flex-col items-center justify-between px-6 md:flex-row md:text-center">
            <p className="text-2xl font-semibold whitespace-nowrap text-center text-white">
              Start teaching now!
            </p>
            <Link
              to="/create-listing"
              className="py-2 px-5 mb-2 mt-4 md:mr-8 rounded-2xl font-bold whitespace-nowrap shadow-md hover:shadow-none transition duration-140 bg-white text-green-400"
            >
              Add a lesson
            </Link>
          </div>
        </div>
      </div>
      <section className="mt-12 mb-8 m-auto md:mt-20">
        <h2 className="mb-20 text-center text-2xl font-semibold">
          Lessons added by you
        </h2>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-16 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {listingsList.map((listing) => (
            <SingleListingTile
              key={listing.id}
              listingData={listing.data}
              listingId={listing.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
