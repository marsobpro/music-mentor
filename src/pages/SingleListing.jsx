import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { db } from "../firebase";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { CiPhone, CiMail } from "react-icons/ci";

export default function SingleListing() {
  const params = useParams();
  const [singleListing, setSingleListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function getData() {
  //     setIsLoading(true);
  //     const docRef = doc(db, "listings", params.id);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setSingleListing(docSnap);
  //       setIsLoading(false);
  //       console.dir(docSnap.data());
  //     } else {
  //       console.log("Docsnap just does not exist!");
  //     }
  //   }
  //   getData();
  // }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-w-[1000px] m-auto">
      <div className="bg-green-200 rounded-3xl mt-[90px] py-4 px-4 mb-4">
        <div className="mb-10 w-40 m-auto">
          <img
            src="https://picsum.photos/200/300"
            alt="Mentor's profile picture"
            loading="lazy"
            className="bg-white p-1 object-cover w-full h-40 rounded-3xl mb-4"
          />
          <p className="text-center font-semibold text-4xl font-mono">Marcin</p>
          <p className="text-center text-xs">Last seen: 2 days ago</p>
        </div>

        <div className="bg-white rounded-full py-4">
          {" "}
          <ul className="flex items-center justify-around w-[90%] m-auto text-center">
            <li className="flex flex-col justify-center text-center ">
              <span className="font-semibold">2 years</span>
              <span className="text-xs">Experience</span>
            </li>
            <li className="flex flex-col justify-center text-center">
              <span className="font-semibold">50 PLN</span>
              <span className="text-xs">Hourly rate</span>
            </li>
            <li className="flex flex-col justify-center text-center">
              <span className="font-semibold">23</span>
              <span className="text-xs">Students</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="ml-4 px-6 leading-8 mb-12 bg-green-200 text-red-500 inline-block rounded-2xl">
        <p>Piano</p>
      </div>

      <div className="px-4 mb-12">
        <p className="font-bold text-2xl leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolore
          neque consequuntur nulla laudantium praesentium. Officia hic, dolore
          explicabo a suscipit aut unde distinctio sunt veniam pariatur enim
          labore assumenda ex quasi. Voluptatem, voluptatum consequuntur
          deleniti placeat exercitationem ab atque. Placeat vero molestiae
          explicabo facilis.
        </p>
      </div>

      <div className="shadow-md rounded-3xl px-5 py-2 space-y-4 mb-12">
        <h3 className="text-lg font-semibold">Where?</h3>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            <GiConfirmed />
          </span>
          <p className="inline-block">At Mentors' place (Gdynia)</p>
        </div>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            <GiCancel />
          </span>
          <p className="inline-block">
            At Students' place (Gdynia +-{" "}
            <span className="font-semibold">20</span> km)
          </p>
        </div>
        <div className="text-sm w-full flex">
          <span className="inline-block text-xl mr-4">
            <GiConfirmed />
          </span>
          <p className="inline-block">Online</p>
        </div>
      </div>

      {/* lorem 140 */}
      <div className="px-5 font-semibold leading-7 mb-12">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          amet voluptates quas, dolorum est harum adipisci similique itaque eum
          ducimus laudantium velit fuga nam autem facilis ipsum perferendis
          quaerat reprehenderit nemo. Atque, ex tempora suscipit, molestiae non
          at aliquam ipsum explicabo facere et quasi odit officiis harum, dolor
          voluptates autem voluptas quos distinctio fugit. Consequatur fugiat
          ullam iusto beatae suscipit cupiditate reiciendis at eius accusantium.
          Deserunt asperiores non delectus fuga et necessitatibus labore
          aspernatur fugit ex, aliquam tenetur perspiciatis officiis, ipsa quae
          eos molestiae alias odit illo. Quas earum mollitia doloribus aliquid!
          Alias qui ipsa, nam aperiam ipsam distinctio aliquid a esse et
          dignissimos repudiandae ea fuga ratione dolores corporis, magnam
          recusandae pariatur neque fugit eligendi? Dolorum eius fugit earum.
          Tempore alias molestiae rerum dolorem! Ducimus perspiciatis sunt
          consectetur, incidunt repellat explicabo esse in, eos ratione quasi
          consequatur veniam facere.
        </p>
      </div>

      <div className="shadow-md rounded-3xl px-5 py-2 space-y-4 mb-12 transition duration-100">
        <h3 className="text-lg font-semibold">Levels</h3>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            <GiConfirmed />
          </span>
          <p className="inline-block">Elementary school</p>
        </div>
        <div className="text-sm flex">
          <span className="inline-block text-xl mr-4">
            <GiCancel />
          </span>
          <p className="inline-block">High school</p>
        </div>
        <div className="text-sm w-full flex">
          <span className="inline-block text-xl mr-4">
            <GiConfirmed />
          </span>
          <p className="inline-block">College</p>
        </div>
        <div className="text-sm w-full flex">
          <span className="inline-block text-xl mr-4">
            <GiConfirmed />
          </span>
          <p className="inline-block">Adults</p>
        </div>
      </div>

      <div className="flex justify-around flex-col sm:flex-row mb-12">
        <button className="flex space-x-4 items-center mx-2 py-4 px-6 border border-slate-400  shadow-lg rounded-full">
          <span className="inline-block">
            <CiPhone />
          </span>
          +48 123 123 123
        </button>

        <button className="flex space-x-4 items-center mx-2 py-4 px-6 border border-slate-400  shadow-lg rounded-full">
          <span className="inline-block">
            <CiMail />
          </span>
          marsobpro@gmail.com
        </button>
      </div>
    </main>
  );
}
