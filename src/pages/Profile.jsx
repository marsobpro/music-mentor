import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
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
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const lessonsRef = collection(db, "listings");
        const q = query(
          lessonsRef,
          where("userId", "==", auth.currentUser.uid)
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
        <div className="mt-40 w-[20rem] md:w-[30rem] py-6 bg-green-400 m-auto shadow-2xl rounded-2xl">
          <div className="flex items-center justify-between flex-col md:flex-row md:text-center">
            <p className="md:ml-6 text-white text-2xl font-semibold whitespace-nowrap text-center">
              Start teaching now!
            </p>
            <Link
              to="/create-listing"
              className="bg-white py-2 px-5 md:mr-8 mb-2 mt-4 rounded-2xl font-bold text-green-400 whitespace-nowrap"
            >
              Add a lesson
            </Link>
          </div>
        </div>
      </div>
      <section className="mt-12 md:mt-20 m-auto mb-6">
        <h2 className="text-center text-3xl font-semibold mb-14">My lessons</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-items-center ">
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
