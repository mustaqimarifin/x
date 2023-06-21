//^SPOTIFY^//
export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type PLAY = {
  isPlaying: boolean;
  album: string;
  albumImageUrl: string;
  artist: string;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

//^UI^//
export type CounterProps = {
  slug?: string;
  total?: string;
  trackView: boolean;
};

export type Exercise = {
  blockId: string;
  prompt: React.ReactNode;
  exerciseCode: string;
  solutionCode: React.ReactNode;
};

export type Bling = {
  id: number;
  avatar: string;
  username: string;
  fullname: string;
  posted_at: string;
  body: string;
};

export type SiteConfig = {
  name: string;
  siteName: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};
