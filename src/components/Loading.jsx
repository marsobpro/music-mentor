import React from "react";
import loading from "../assets/loading.svg";

export default function Loading() {
  return (
    <div className="flex justify-center mt-52">
      <div>
        <img src={loading} alt="Loading..."></img>
      </div>
    </div>
  );
}
