import React from "react";
import choose from "../assets/choose.svg";
import contact from "../assets/contact.svg";
import play from "../assets/play.svg";

export default function AboutUs() {
  return (
    <main className="mt-32 mb-4 px-4 max-w-[1300px] m-auto ">
      <header>
        <div className="text-center mb-32">
          <h1 className="font-semibold text-3xl mb-2">How it works</h1>
          <p>you're just 3 steps from your dreams!</p>
        </div>
      </header>
      <section>
        <div className="grid grid-rows-3 gap-y-32">
          <div className="grid sm:grid-cols-2 items-center">
            {" "}
            <div
              style={{
                backgroundImage: `url(${choose})`,
              }}
              className="w-[220px] aspect-square bg-no-repeat bg-contain m-auto"
            ></div>
            <div className="text-center">
              <h2 className="font-bold text-2xl mb-3 tracking-wide ">
                1. Find your mentor
              </h2>
              <p>There are over 10 000 in Poland alone!</p>
            </div>
          </div>

          {/*  */}

          <div className="grid sm:grid-cols-2 items-center">
            {" "}
            <div className="text-center">
              <h2 className="font-bold text-2xl mb-3 tracking-wide ">
                2. Contact your mentor
              </h2>
              <p>Something smart about contacting people</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${contact})`,
              }}
              className="order-first sm:order-last w-[240px] aspect-square bg-no-repeat bg-contain m-auto"
            ></div>
          </div>

          {/*  */}

          <div className="grid sm:grid-cols-2 items-center">
            {" "}
            <div
              style={{
                backgroundImage: `url(${play})`,
              }}
              className="w-[220px] aspect-square bg-no-repeat bg-contain m-auto"
            ></div>
            <div className="text-center">
              <h2 className="font-bold text-2xl mb-3 tracking-wide ">
                3. Learn and play!
              </h2>
              <p>Something smart about having fun</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
