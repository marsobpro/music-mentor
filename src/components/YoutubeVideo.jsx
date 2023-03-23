import React from "react";

export default function YoutubeVideo({ url }) {
  let embedUrl = "";
  if (!url.includes("embed")) {
    let videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else {
    embedUrl = url;
  }

  return (
    <iframe
      className="w-full border-4 border-green-400 h-[300px] md:h-[400px] mt-3 mb-12 rounded-3xl"
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
    ></iframe>
  );
}
