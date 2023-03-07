import React from "react";
import { useParams } from "react-router-dom";

export default function Lessons() {
  const params = useParams();
  console.log(params.subject, params.city, params.id);

  return (
    <>
      <div className="mt-24">Lessons</div>{" "}
      {/* <p>{`Params subject: ${params.subject} Params city: ${params.city}`}</p> */}
    </>
  );
}
