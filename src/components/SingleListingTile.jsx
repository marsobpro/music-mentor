import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

export default function SingleListingTile({
  listingId,
  listingData,
  onDelete,
  onEdit,
}) {
  const navigate = useNavigate();
  return (
    <li className="bg-white border border-slate-500 rounded-3xl w-[300px] shadow-md relative cursor-pointer">
      <div
        className="relative"
        onClick={() =>
          navigate(
            `/lessons/${listingData.subject}/${listingData.city}/${listingId}`
          )
        }
      >
        <div className="mb-2 relative">
          <img
            src={listingData.imageUrl}
            alt=""
            className="bg-white rounded-3xl object-cover w-full aspect-square"
          />
          <div className="absolute text-white bottom-2 left-3">
            <h3 className="text-3xl font-semibold mb-1">
              {listingData?.firstName}
            </h3>
            <p className="text-sm">{listingData.subject}</p>
          </div>
        </div>
        <div className="px-3 mb-2 h-44">
          <p className="text-[0.8rem] leading-6 tracking-wide font-normal">
            {" "}
            {listingData.shortDescription}
          </p>
        </div>
        <div className="px-3">
          <ul className="flex items-center justify-between mb-2">
            <li className="px-2 py-2 bg-green-300 rounded-3xl text-xs">
              {`${listingData.price} PLN / ${listingData.lessonTime} min`}
            </li>
            <li className="px-2 py-2 bg-green-300 rounded-3xl text-xs">
              <span className="capitalize">{listingData.city}</span>
              {listingData.online ? " and Online" : ""}
            </li>
          </ul>
        </div>
      </div>{" "}
      {onEdit && onDelete ? (
        <div className="absolute top-3 right-3 flex bg-white space-x-4 px-2 py-2 rounded-2xl text-black cursor-pointer">
          <FaEdit
            onClick={() => onEdit(listingId)}
            className="text-md hover:text-red-600"
          />
          <BsFillTrashFill
            onClick={() => onDelete(listingId)}
            className="text-md hover:text-red-600"
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
}
