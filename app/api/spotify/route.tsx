import { getNowPlaying } from "lib/spotify";
import { NextResponse } from "next/server";
import { PLAY } from "types";
//import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 60;

export async function GET() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return new NextResponse(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const song = await response.json();

  if (song.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  );
}
