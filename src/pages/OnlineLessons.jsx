import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import SingleListingTile from "../components/SingleListingTile";
import { AppContext } from "../App";
import toast from "react-hot-toast";

export default function OnlineLessons() {
  const [isLoading, setIsLoading] = useState(false);
  const [listingsList, setListingsList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { subjectOptions } = useContext(AppContext);
  const { subject } = params;

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

    let q;
    async function getData() {
      try {
        const lessonsRef = collection(db, "listings");
        if (subject) {
          q = query(
            lessonsRef,
            where("subject", "==", subject),
            where("online", "==", true),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(
            lessonsRef,
            where("online", "==", true),
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
    <main className="max-w-[1100px] mt-28 text-2xl m-auto">
      <h1 className="mx-4 text-center text-5xl font-montserrat">
        Learn to play{" "}
        {subject ? (
          <span>
            <span className="font-semibold font-pacifico text-green-500">
              {subject}
            </span>{" "}
            online!
          </span>
        ) : (
          <span>
            any instrument{" "}
            <span className="font-semibold underline decoration-dotted underline-offset-4 text-green-500">
              online!
            </span>
          </span>
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
        ""
      )}
    </main>
  );
}
