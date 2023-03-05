import React from "react";
import loading from "../assets/loading.svg";

export default function Loading() {
  return (
    <div>
      <div>
        <img src={loading} alt="Loading..."></img>
      </div>
    </div>
  );
}
