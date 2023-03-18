import React from "react";

export default function NotFound() {
  return (
    <main className="grid place-items-center w-screen h-screen">
      <div className="flex space-x-24 items-center">
        <div>
          <h1 className="text-5xl mb-9 text-red-600">Agent 404</h1>
          <div className="text-xl space-y-1">
            {" "}
            <p>My name is Found.</p>
            <p>Not Found.</p>
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
