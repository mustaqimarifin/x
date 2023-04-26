import * as React from "react";
import SoundCloud from "react-custom-soundcloud";

import { AudioBlock, ExtendedRecordMap } from "notion-types";

import { Spotify } from "react-spotify-embed";

export const Audio: React.FC<{
  block: AudioBlock;
  recordMap: ExtendedRecordMap;
}> = ({ block, recordMap }) => {
  const source =
    recordMap.signed_urls[block.id] || block.properties?.source?.[0]?.[0];
  //const scID = new URLSearchParams(source.slice(73, 83))

  if (source.startsWith("https://open")) {
    return (
      <div className="w-full">
        <Spotify wide link={source} />
      </div>
    );
  }
  if (source.startsWith("https://w" || "https://soundcloud")) {
    return (
      <div className="w-full">
        <SoundCloud track={source.slice(73, 83)} mini={true} />;
      </div>
    );
  }
};
