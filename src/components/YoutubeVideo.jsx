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
      className="w-full h-[300px] md:h-[400px] border-4 mt-3 mb-12 rounded-3xl border-green-400"
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
    ></iframe>
  );
}
