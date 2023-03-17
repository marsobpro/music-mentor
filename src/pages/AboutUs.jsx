import React from "react";
import choose from "../assets/choose.svg";
import contact from "../assets/contact.svg";
import play from "../assets/play.svg";

export default function AboutUs() {
  return (
    <main className="max-w-[1300px] mt-32 mb-4 px-4 m-auto ">
      <header>
        <div className="mb-32 text-center">
          <h1 className="mb-2 font-semibold text-[3rem]">How does it work?</h1>
          <p>(you're just 3 steps from your dreams!)</p>
        </div>
      </header>
      <section>
        <div className="grid grid-rows-3 gap-y-32">
          <div className="grid items-center sm:grid-cols-2">
            {" "}
            <div
              style={{
                backgroundImage: `url(${choose})`,
              }}
              className="w-[220px] m-auto aspect-square bg-no-repeat bg-contain"
            ></div>
            <div className="text-center">
              <h2 className="mb-3 font-bold text-3xl tracking-wide">
                1. Find your mentor
              </h2>
              <p>There are over 10 000 in Poland alone!</p>
            </div>
          </div>
          {/*  */}
          <div className="grid items-center sm:grid-cols-2">
            {" "}
            <div className="text-center">
              <h2 className="mb-3 font-bold text-3xl tracking-wide ">
                2. Contact your mentor
              </h2>
              <p>By phone or email.</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${contact})`,
              }}
              className="w-[260px] m-auto order-first sm:order-last aspect-square bg-no-repeat bg-contain"
            ></div>
          </div>
          {/*  */}
          <div className="grid items-center sm:grid-cols-2">
            {" "}
            <div
              style={{
                backgroundImage: `url(${play})`,
              }}
              className="w-[220px] m-auto aspect-square bg-no-repeat bg-contain"
            ></div>
            <div className="text-center">
              <h2 className="font-bold text-3xl mb-3 tracking-wide">
                3. Learn and play!
              </h2>
              <p>Something smart about having fun!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
