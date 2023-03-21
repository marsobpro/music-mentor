import React from "react";

export default function YoutubeVideo({ url }) {
  return (
    <iframe
      className="w-full border-4 border-green-400 h-[300px] md:h-[400px] mt-3 mb-12 rounded-3xl"
      src={url}
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
    ></iframe>
  );
}
