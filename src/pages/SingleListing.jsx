import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function SingleListing() {
  const params = useParams();
  const [singleListing, setSingleListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSingleListing(docSnap);
        setIsLoading(false);
        console.dir(docSnap.data());
      } else {
        console.log("it just does not exist!");
      }
    }
    getData();
  }, [params.id]);

  return <div className="mt-40">Single Listing</div>;
}
