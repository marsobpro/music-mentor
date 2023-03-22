import React from "react";
import loading from "../assets/loading.svg";

export default function Loading() {
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <img src={loading} alt="Loading animation"></img>
      </div>
    </div>
  );
}
