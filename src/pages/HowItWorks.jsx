import React from "react";

export default function HowItWorks() {
  return (
    <main className="max-w-[1300px] mt-28 mb-4 px-4 m-auto">
      <header>
        <div className="mb-16 text-center font-montserrat">
          <h1 className="mb-2 font-semibold text-5xl">How it works?</h1>
          <p className="text-xl">
            (you're just 3 steps from your{" "}
            <span className="font-pacifico text-green-400">dreams</span>!)
          </p>
        </div>
      </header>

      <section>
        <div className="grid grid-rows-3 gap-y-32">
          <div className="step-container">
            <div
              style={{
                backgroundImage: "url(assets/choose.svg)",
              }}
              className="step-container__image"
              role="img"
              aria-label="Graphics, a person makes a choice from the various options available."
            ></div>
            <div className="step-container__description">
              <h2 className="step-container__description-header">
                1. <span className="text-green-500">Find</span> your mentor
              </h2>
              <p className="text-xl font-montserrat">
                There are over 10 000 in Poland alone!
              </p>
            </div>
          </div>

          <div className="step-container">
            <div className="step-container__description">
              <h2 className="step-container__description-header">
                2. <span className="text-green-500">Contact</span> your mentor
              </h2>
              <p className="text-xl font-montserrat">By phone or email.</p>
            </div>
            <div
              style={{
                backgroundImage: "url(assets/contact.svg)",
              }}
              className="step-container__image sm:order-last"
              role="img"
              aria-label="Graphics, a person is trying to contact the mentor via email."
            ></div>
          </div>

          <div className="step-container">
            <div
              style={{
                backgroundImage: "url(assets/play.svg)",
              }}
              className="step-container__image"
              role="img"
              aria-label="A man enjoys playing the guitar."
            ></div>
            <div className="step-container__description">
              <h2 className="step-container__description-header">
                3. <span className="text-green-500 ">Learn</span> and play!
              </h2>
              <p className="text-xl font-montserrat">Just have fun!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
