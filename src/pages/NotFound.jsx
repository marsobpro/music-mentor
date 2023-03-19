import React from "react";

export default function NotFound() {
  return (
    <main className="grid place-items-center w-screen h-screen">
      <div className="flex flex-col space-x-0 space-y-12 items-center justify-center md:flex-row md:space-x-24 md:space-y-0">
        <div className="text-center">
          <h1 className="mb-9 text-5xl text-red-600">Agent 404</h1>
          <div className="space-y-1 text-xl">
            {" "}
            <p>
              My name is <span className="font-bold">Found</span>.
            </p>
            <p className="font-bold">Not Found.</p>
          </div>
        </div>
        <div>
          <img
            src="../src/assets/james.png"
            alt=""
            className="w-[300px] object-cover rounded-3xl aspect-square bg-white"
          />
        </div>
      </div>
    </main>
  );
}
