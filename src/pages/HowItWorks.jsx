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
          <div className="step-container">
            <div
              style={{
                backgroundImage: `url(${choose})`,
              }}
              className="step-container__image"
              role="img"
              aria-label="Graphics, a person makes a choice from the various options available."
            ></div>
            <div className="step-container__description">
              <h2 className="step-container__description-header">
                1. <span className="text-green-500">Find</span> your mentor
              </h2>
              <p className="text-xl">There are over 10 000 in Poland alone!</p>
            </div>
          </div>

          <div className="step-container">
            <div className="step-container__description">
              <h2 className="step-container__description-header">
                2. <span className="text-green-500">Contact</span> your mentor
              </h2>
              <p className="text-xl">By phone or email.</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${contact})`,
              }}
              className="step-container__image sm:order-last"
              role="img"
              aria-label="Graphics, a person is trying to contact the mentor via email."
            ></div>
          </div>

          <div className="step-container">
            <div
              style={{
                backgroundImage: `url(${play})`,
              }}
              className="step-container__image"
              role="img"
              aria-label="A man enjoys playing the guitar."
            ></div>
            <div className="step-container__description">
              <h2 className="step-container__description-header">
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
