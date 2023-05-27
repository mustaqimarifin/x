"use client";
import * as React from "react";
import ReactPlayer from "react-player/lazy";

import { AudioBlock, ExtendedRecordMap } from "notion-types";

import { Spotify } from "react-spotify-embed";

const Audio = ({
  block,
  recordMap,
}: {
  block: AudioBlock;
  recordMap: ExtendedRecordMap;
}) => {
  const source =
    recordMap.signed_urls[block.id] || block.properties?.source?.[0]?.[0];
  // console.log(source)
  //const scID = new URLSearchParams(source.slice(73, 83))

  if (source.startsWith("https://open")) {
    return (
      <div className="w-full">
        <Spotify wide link={source} />
      </div>
    );
  }
  if (source.startsWith("https://soundcloud" || "https://w.soundcloud")) {
    return (
      <div className="w-full">
        <ReactPlayer url={source} />;
      </div>
    );
  }
};

export default Audio;
