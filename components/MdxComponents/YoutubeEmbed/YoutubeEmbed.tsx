import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import LiteYouTubeEmbed from "react-lite-youtube-embed";

interface YoutubeEmbedProps {
  id: string;
  title: string;
}

export const YoutubeEmbed = ({ id, title }: YoutubeEmbedProps) => {
  return <LiteYouTubeEmbed id={id} title={title} />;
};
