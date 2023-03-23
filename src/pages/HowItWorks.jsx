import React from "react";
import choose from "../assets/choose.svg";
import contact from "../assets/contact.svg";
import play from "../assets/play.svg";

export default function HowItWorks() {
  return (
    <main className="max-w-[1300px] mt-32 mb-4 px-4 m-auto">
      <header>
        <div className="mb-16 text-center">
          <h1 className="mb-2 font-semibold text-5xl">How it works?</h1>
          <p>(you're just 3 steps from your dreams!)</p>
        </div>
      </header>

      <section>
        <div className="grid grid-rows-3 gap-y-32">
          <div className="grid items-center sm:grid-cols-2 border-2 space-y-10 sm:space-y-0 border-black rounded-2xl py-9 px-3">
            <div
              style={{
                backgroundImage: `url(${choose})`,
              }}
              className="w-[220px] m-auto aspect-square bg-no-repeat bg-contain"
            ></div>
            <div className="text-center space-y-7">
              <h2 className="mb-3 font-bold text-5xl tracking-wide font-pacifico">
                1. <span className="text-green-500">Find</span> your mentor
              </h2>
              <p className="text-xl">There are over 10 000 in Poland alone!</p>
            </div>
          </div>

          <div className="grid items-center sm:grid-cols-2 border-2 space-y-10 sm:space-y-0 border-black rounded-2xl py-9 px-3">
            <div className="text-center space-y-7">
              <h2 className="mb-3 font-bold text-5xl tracking-wide font-pacifico">
                2. <span className="text-green-500">Contact</span> your mentor
              </h2>
              <p className="text-xl">By phone or email.</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${contact})`,
              }}
              className="w-[220px] m-auto order-first sm:order-last aspect-square bg-no-repeat bg-contain"
            ></div>
          </div>

          <div className="grid items-center sm:grid-cols-2 border-2 space-y-10 sm:space-y-0 border-black rounded-2xl py-9 px-3">
            <div
              style={{
                backgroundImage: `url(${play})`,
              }}
              className="w-[220px] m-auto aspect-square bg-no-repeat bg-contain"
            ></div>
            <div className="text-center space-y-7">
              <h2 className="mb-3 font-bold text-5xl tracking-wide font-pacifico">
                3. <span className="text-green-500">Learn</span> and play!
              </h2>
              <p className="text-xl">Just have fun!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
