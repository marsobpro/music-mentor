import React from "react";
import choose from "../assets/choose.svg";
import contact from "../assets/contact.svg";
import play from "../assets/play.svg";

export default function AboutUs() {
  return (
    <main className="mt-24 max-w-[1100px] px-4 m-auto">
      <header>
        <div className="text-center mb-20">
          <h1 className="font-semibold text-3xl mb-2">How it works</h1>
          <p>you're just 3 steps from your dreams!</p>
        </div>
      </header>
      <section>
        <div className="grid grid-rows-3 gap-y-16 border border-red-400">
          <div className="grid grid-cols-2 border border-green-300">
            {" "}
            <div
              style={{
                backgroundImage: `url(${choose})`,
              }}
              className="w-[200px] aspect-square bg-no-repeat bg-cover border border-blue-200"
            ></div>
            <div className="border border-orange-600 flex flex-col\">
              <h2 className="font-bold text-2xl mb-3 tracking-wide ">
                1. Find your mentor
              </h2>
              <p>There are over 10 000 in Poland alone!</p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {" "}
            <div>
              {" "}
              <h2 className="font-bold text-2xl mb-3 tracking-wide">
                2. Contact your mentor
              </h2>
              <p>There are over 10 000 in Poland alone!</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${contact})`,
              }}
              className="w-[200px] aspect-square bg-no-repeat bg-cover"
            ></div>
          </div>

          <div className="grid grid-cols-2">
            <div
              style={{
                backgroundImage: `url(${play})`,
              }}
              className="w-[200px] aspect-square bg-no-repeat bg-cover"
            ></div>
            <div>
              {" "}
              <h2 className="font-bold text-2xl mb-3 tracking-wide">
                3. Learn and play!
              </h2>
              <p>There are over 10 000 in Poland alone!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
