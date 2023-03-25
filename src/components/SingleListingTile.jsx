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
    <li className="relative w-[300px] rounded-3xl shadow-md cursor-pointer hover:scale-110 transform duration-150 ease-in-out bg-white border border-slate-500">
      <div
        className="relative"
        onClick={() =>
          navigate(
            `/lessons/${listingData.subject}/${listingData.city}/${listingId}`
          )
        }
      >
        <div className="relative mb-2">
          <img
            src={listingData.imageUrl}
            alt="Profile photo of a Mentor"
            className="w-full object-cover rounded-3xl aspect-square bg-white"
          />
          <div className="absolute bottom-2 left-3 text-white">
            <h3 className="mb-1 text-3xl font-semibold">
              {listingData?.firstName}
            </h3>
            <p className="text-sm">{listingData.subject}</p>
          </div>
        </div>

        <div className="h-44 px-3 mb-2">
          <p className="text-[0.8rem] leading-6 tracking-wide font-normal">
            {" "}
            {listingData.shortDescription}
          </p>
        </div>

        <div className="px-3">
          <ul className="flex items-center justify-between mb-2">
            <li className="px-2 py-2 rounded-3xl text-xs font-semibold bg-green-300">
              {`${listingData.price} PLN / ${listingData.lessonTime} min`}
            </li>
            <li className="px-2 py-2 rounded-3xl text-xs font-semibold bg-green-300">
              <span className="capitalize">{listingData.city}</span>
              {listingData.online ? " and Online" : ""}
            </li>
          </ul>
        </div>
      </div>{" "}
      {onEdit && onDelete ? (
        <div className="absolute top-3 right-3 px-2 py-2 flex space-x-4 rounded-2xl cursor-pointer text-md text-black bg-white">
          <FaEdit
            onClick={() => onEdit(listingId)}
            className="hover:text-red-600"
          />
          <BsFillTrashFill
            onClick={() => onDelete(listingId)}
            className="hover:text-red-600"
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
}
