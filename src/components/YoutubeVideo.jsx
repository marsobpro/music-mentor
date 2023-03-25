import React from "react";
import parse from "url-parse";

export default function YoutubeVideo({ url }) {
  const parsedUrl = parse(url, true);
  const videoId = parsedUrl.query.v;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      className="w-full h-[300px] border-4 mt-3 mb-12 md:h-[400px] rounded-3xl border-green-400"
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
    ></iframe>
  );
}
