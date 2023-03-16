import React from "react";
import loading from "../assets/loading.svg";

export default function Loading() {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <img src={loading} alt="Loading..."></img>
      </div>
    </div>
  );
}
