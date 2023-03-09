import React from "react";
import { useNavigate } from "react-router-dom";

import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";

export default function SingleListingTile({ id, data }) {
  console.log(data);
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border border-slate-500 rounded-3xl w-[300px] shadow-md"
      onClick={() => navigate(`/lessons/${data.subject}/${data.city}/${id}`)}
    >
      <div className="mb-2 relative">
        <img
          src={data.imageUrl}
          alt=""
          // loading="lazy"
          className="bg-white rounded-3xl object-cover w-full aspect-square"
        />
        <div className="absolute text-white bottom-2 left-3">
          <h3 className="text-3xl font-semibold mb-1">
            {capitalizeFirstLetters(data?.firstName)}
          </h3>
          <p className="text-sm">{capitalizeFirstLetters(data?.city)}</p>
        </div>
      </div>
      <div className="px-3 mb-2 h-44">
        <p className="text-[0.8rem] leading-6 tracking-wide font-normal">
          {" "}
          {data.shortDescription}
        </p>
      </div>
      <div className="px-3">
        <ul className="flex items-center justify-between mb-2">
          <li className="px-2 py-2 bg-green-300 rounded-3xl text-xs">
            {`${data.price} PLN / ${data.lessonTime} min`}
          </li>
          <li className="px-2 py-2 bg-green-300 rounded-3xl text-xs">
            {`${data.yearsOfTeachingExperience} years of experience`}
          </li>
        </ul>
      </div>
    </div>
  );
}
