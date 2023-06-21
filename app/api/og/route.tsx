/* eslint-disable @next/next/no-img-element */
// App router includes @vercel/og.
// No need to install it.

import { ImageResponse } from "next/server.js";

export const runtime = "edge";

const font = fetch(
  new URL("../../../public/fonts/kaisei-tokumin-bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  let slug: string;
  try {
    const { searchParams } = new URL(req.url);
    const postTitle = searchParams.get("title");
    slug = searchParams.get("slug");
    if (!slug) {
      const url = new URL(req.url);
      slug = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    }

    // ?title=<title>
    const fontData = await font;

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "white",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height={70}
            >
              <path
                fill="#2d2c28"
                d="M629.07 24.98c43.71 1.59 74.27 20.57 96.78 53.83 2.23 3.29 4.15 6.8 6.66 9.85 10.97 13.26 16.44 29.23 22.08 45.04.45 1.16.69 2.37.74 3.62.57 16.67 2.23 33.38 1.35 49.96-.86 15.63-4.43 31.11-6.72 46.59-1.21 8.21-.74 17.02-3.6 24.66-5 13.4-3.1 27.41-6.25 41.1-3.15 13.71-6.27 27.82-9.31 41.73-3.51 16.12-10.97 31.05-12.44 47.9-1.55 17.47-5.8 34.64-8.66 52.07-1.02 6.31-1.47 12.71-2.06 19.18-.14 1.63-.33 4 .57 4.84 8.44 7.78 3.78 18.32 5.21 27.41 3.15 19.65 3.21 39.79 5 59.69 1.82 19.9-3.06 38.61-11.15 56.79-1.39 3.15-.16 8.21 1.29 11.81 3.1 7.68 7.54 14.79 10.72 22.47 4.51 10.97 8.21 22.08 12.58 33.05 2.06 5.15 5.62 9.78 7.15 15.05 2.59 9.09 3.86 18.59 6.23 27.76 3.88 15.26 10.25 30.15 11.85 45.68 2.94 27.68 5.27 56.17-11.17 82.02-9.87 15.42-11.54 33.4-14.63 51.05-3.47 19.83-2.02 39.98-5.84 59.75-4.31 22.14-20.41 32.4-39.26 38.98-7.56 2.23-15.65-.9-19.73-7.64-7.21-12.05-13.22-24.82-19.51-37.44-4.43-8.91-7.95-18.36-12.99-26.9-5.05-8.54-13.71-13.13-23.57-14.95-24.59-4.6-49.64-6.21-74.62-4.82-13.83.78-25.84 6.58-36.99 14.99a33.707 33.707 0 0 0-13.13 21.29 152.286 152.286 0 0 1-12.79 35.62c-6.05 11.87-17.73 17.67-30.6 20.24-5.27 1.06-10.74.96-16.12 1.59-7.05.82-12.13-2.74-17.49-6.72-12.79-9.31-17.38-22.74-19.63-37.4-2.74-18.43-5.47-36.85-8.21-55.26-.98-6.6-5.68-9.64-12.09-7.37-15.05 5.29-30.01 10.83-44.96 16.44-9.15 3.35-18.28 5.64-27.9 1.78-1-.31-2.02-.45-3.06-.43-23.1-1.31-35.11-23.86-23.51-43.84 6.97-12.01 13.09-24.49 20.39-36.26 5.47-8.99 3.84-17.83 2.98-27.41-1.21-13.54-.47-27.27-.39-40.9 0-2.74 1.1-5.47.96-8.03-.55-11.56 2.41-22.49 5.27-33.54 2.17-8.21 1.78-17.51 4.68-25.51a137.243 137.243 0 0 1 40.51-58.87c18.53-15.81 40.47-23.98 63.04-31.38 6.54-2.21 12.03-6.8 15.34-12.85.65-1.06.94-2.55 1.86-3.21 10.27-7.46 4.25-17.65 4.51-26.72.14-3.68-.94-7.37-1.14-10.97-1.18-17.81-2.06-35.62-3.39-53.46-.94-12.66 3.78-23.21 11.21-32.89 1.25-1.29 2.9-2.1 4.68-2.31 2.88-.35 5.84 0 8.74 0 5.62-.22 8.01-3.06 7.01-8.44-2.49-13.71-5.31-27.21-7.46-40.92-1.92-12.28-2.74-24.66-4.82-36.97-.86-5.21-3.94-10.03-4.88-15.22-2.96-16.75-5.47-33.52-7.97-50.33-1.37-9.4-3.88-19.04-2.9-28.27 1.31-12.38-2-24.04-2.43-36.05-.61-17.12 3.76-33.13 8.48-49.33 10.19-35.4 25.25-68.51 48.51-96.85 17.42-21.33 35.62-42.45 61.61-54.81 16.63-7.58 34.3-12.66 52.42-15.08 11.87-2.23 23.82-3.39 33.03-4.49h-.04ZM433.95 592.24c-4.25 5.47-7.31 8.97-10.03 12.79a181.79 181.79 0 0 0-11.34 17.12c-10.77 19.81-21.67 39.61-31.56 59.87-4.21 9.44-7.5 19.26-9.85 29.31-2.8 8.91-4.6 18.1-5.31 27.41-.41 11.89 1.35 23.86 2.19 35.79 1.82 24.04 5.7 47.88 11.58 71.25 3.51 14.2 8.21 28.09 11.26 42.35a251.53 251.53 0 0 1 4.25 32.77c1.29 15.79 2.74 31.44 8.05 46.59 3.7 10.42 9.62 18.53 19.96 22.65 14.26 5.7 39.96-4.51 45.96-18.79 4.53-10.05 7.86-20.61 9.93-31.44a43.825 43.825 0 0 1 19.51-30.52c18.59-12.77 39.22-16.08 61.22-12.93 3.88.76 7.84 1.06 11.81.9 16.44-1.68 31.95 2.19 47.57 5.76 10.68 2.43 20.49 8.05 25.57 17.55 7.72 14.42 13.48 29.91 19.79 45.04 3.39 8.21 7.54 15.79 14.91 21.12 4 2.88 8.21 4.11 12.69 1.02 7.31-5.07 14.67-10.11 21.92-15.26a6.34 6.34 0 0 0 2.74-3.35 226.99 226.99 0 0 0 3.76-25.17c.78-12.99 0-26.09.9-39.1.69-8.72 2.04-17.36 4.02-25.86 2.57-11.79 4.19-24.17 9.23-34.85 4.23-8.93 8.97-16.85 10.72-27.19 2.51-14.85 3.62-29.54.71-44.04-4.47-22.22-9.62-44.35-15.89-66.12a440.722 440.722 0 0 0-28.7-73.52c-1.43-2.74-2.74-5.72-4.25-8.97-1.47 1.39-2.47 2.17-3.29 3.06-7.05 7.95-14.01 15.97-21.1 23.9-12.52 13.97-29.52 21.33-45.1 30.89-12.62 7.72-26.72 8.56-40.59 10.83-2.7.37-5.43.2-8.09-.43-17.18-3.72-34.34-7.68-51.52-11.46-26.98-5.94-48.13-22.29-68.84-39.18a24.987 24.987 0 0 1-5.47-8.84c-6.33-12.97-12.3-25.98-19.32-41v.04Zm262.88-128.79c.39-4.17.41-6.64.88-9.05 5.47-29.58 8.6-59.55 17.16-88.59 4.31-14.99 7.84-30.19 10.54-45.55 4.76-25.9 11.54-51.42 14.71-77.64 2.19-17.89 4.96-35.62 7.31-53.6.25-2.92.2-5.84-.14-8.74-.61-9.54-1.31-19.18-1.94-28.58.12-3.53-.08-7.07-.65-10.54-2.98-11.26-4.33-22.96-13.05-32.32-7.01-7.54-12.2-16.75-18.47-24.98-8.4-10.97-21.2-10.6-32.89-11.15-8.52-.43-17.26 1.76-25.82 3.27-16.18 2.88-32.72 4.58-48.23 9.52-29.62 9.34-57.03 23.33-78.79 46.45a276.257 276.257 0 0 0-53.66 85.22c-7.21 17.55-11.21 36.44-15.99 54.81-7.05 27.07-6.88 54.81-6.15 82.55.16 5.8 1.12 11.58 1.68 17.38 1.37 14.69 2.51 29.39 4.17 44.06 1.53 13.83 3.62 27.62 5.47 41.43.98 7.56 3.23 14.52 9.62 19.71.98-.63 1.78-1.29 2.74-1.76 16.59-8.21 32.72-17.4 49.9-24.06 13.09-4.7 26.68-7.86 40.51-9.4 10.77-1.45 21.92-.39 32.89 0 7.44.27 14.79 1.61 22.22 2.06 19.51 1.18 39.16.98 56.95 11.3 6.15 3.17 12.5 5.96 19.02 8.33v-.08l.02-.04Zm-217.86 90.43-1.18.18c1.27 7.7 1.18 15.95 4.07 22.96a284.723 284.723 0 0 0 18.43 36.12c2.92 4.78 7.01 8.74 11.89 11.5 12.85 7.27 26.09 13.91 39.47 20.14 5.41 2.64 11.3 4.19 17.32 4.56 16.83.55 33.21 1.23 49.96-5.47 17.24-6.86 33.4-16.16 47.98-27.62 16.26-12.79 24.47-29.37 28.97-48.29 2.41-9.07 2.92-18.53 1.45-27.78-1.92-9.54-7.62-18.32-11.89-27.41a7.004 7.004 0 0 0-3.64-3.1c-6.74-2.74-13.48-5.47-20.45-7.7-23.49-7.17-47.68-5.11-71.74-5.62-16.91-.39-32.64 4.15-47.96 9.15-17.49 5.72-33.81 14.87-50.7 22.39-9.23 4.11-13.95 10.54-12.01 21.02.16 1.65.18 3.31.06 4.96l-.02.02Zm-77.28 63.04-1.1-1.51c-13.22 1.68-25.51 5.64-35.77 14.91-3.7 3.37-7.37 6.76-11.32 9.85a115.787 115.787 0 0 0-32.58 38.36c-3.84 7.33-6.82 15.08-8.89 23.1-1.78 7.09-.39 15.08-2.57 21.92-6.01 18.85-4.31 38.36-6.17 57.54-.55 5.8 1.45 11.87 2.14 17.83.63 5.47 2.74 11.64 1.23 16.44a353.075 353.075 0 0 1-15.67 35.3c-3.78 7.86-9.17 15.05-12.26 23.12-3.64 9.62-1.63 20.37 6.88 24.08 7.99 4 16.93 5.72 25.84 4.96 8.64-1.06 15.63-5.07 23.29-8.03 13.71-5.47 27.6-9.93 42.22-15.08-1.74-6.84-3.98-14.79-5.78-22.88-3.35-14.99-7.07-29.95-9.46-45.14-2.47-15.75-3.31-31.78-5.19-47.66-2.59-22.33-1.55-44.2 7.15-65.24 1.92-4.6 3.51-9.38 5.47-13.91 9.25-20.22 18.61-40.4 28.03-60.53 1.35-2.57 2.98-4.9 4.43-7.35v-.1h.06ZM433.8 501.2v7.84c-1.23 21.24 2.74 41.86 7.48 62.36 6.8 29.93 18.92 56.75 44.67 75.48.16 0 .31.27.47.41 12.5 10.42 25.98 18.79 42.45 21.29 5.96.9 11.97 1.76 17.83 3.1 17.73 4.11 35.2 10.01 53.85 7.29 4.68-.69 9.87-.41 14.01-2.35 13.32-6.19 26.29-13.18 39.32-19.96 2-1.1 3.9-2.43 5.62-3.94 20.04-16.85 36.83-36.09 45.92-61.24a50.85 50.85 0 0 0 1.51-32.48c-.98 3.51-.78 7.31-1.92 10.64-9.34 26.94-21.16 51.29-48.64 65.78-10.97 5.72-21.92 11.64-32.68 17.57-10.42 5.62-21.1 6.27-32.44 7.01-21.04 1.37-40.02-3.55-58.95-12.5-20.86-9.85-39.02-21.37-49.05-43.35-6.97-15.24-13.89-30.15-14.46-47.39-.57-17.59 2.25-35.4-3.21-52.74-2.55-8.09-3.86-16.61-7.09-24.39a16.043 16.043 0 0 0-9.48-7.7c-10.36-3.1-15.5 9.64-12.34 20.08 2.94-1.82 5.47-3.64 8.48-5.19 4.47-2.68 10.3-1.23 12.97 3.27.65 1.1 1.08 2.33 1.25 3.6.51 6.43.51 12.91 0 19.34-.69 8.82-5.47 10.81-12.99 5.78-1.27-.69-2.41-1.63-3.35-2.74-2.74-4.19-5.39-8.64-9.21-14.75v-.1l-.02-.02ZM613.34 38.06c1.43 2.49 2.98 4.92 4.23 7.54 3.53 7.37 2.74 10.97-4.51 14.87a160.11 160.11 0 0 1-22.8 9.93c-10.25 3.39-16.44.78-22.49-8.21-5.21-7.62-2.9-12.91 6.15-14.63 3.55-.65 6.99-1.94 10.46-2.94-16.44-1.92-55.77 17.26-57.93 26.96 1.12-.49 2.06-.78 2.74-1.23 6.6-3.6 9.29-2.96 13.5 3.15 3.55 5.13 3.8 15.91-.88 20.37-8.48 8.03-17.79 15.18-26.94 22.88-4.23-4.84-7.23-8.56-10.54-11.97-2.23-1.78-2.57-5.03-.8-7.25.12-.14.25-.29.39-.43 1.76-2.39 3.13-5.03 4.68-7.54l-1.98-1.06c-36.75 34.42-53.91 79.46-66.37 126.71-6.31 23.98-5.03 86.28 1.12 93.7.43-.69.74-1.43.96-2.23 1.31-10.52 2.41-21.08 3.86-31.56 4.51-32.17 13.71-62.77 30.15-90.98 10.74-18.3 21.04-36.77 35.28-52.89 10.97-12.42 21.67-25.19 36.65-32.5 13.32-6.52 25.27-16.26 40.53-18.63.98-.16 1.86-.98 2.74-1.27 13.32-3.84 26.56-7.95 40.02-11.26 7.91-1.7 15.89-2.92 23.92-3.68 6.56-.82 13.18-1.31 19.81-1.68 3.78-.18 7.64.22 11.46.14 2.27-.18 4.51-.49 6.74-.96-19.12-25.02-60.18-33.62-80.09-23.21v-.14l-.04-.02Zm79.67 462.08c1.35-7.52 2.74-13.48 3.39-19.55.25-1.86-.35-5.13-1.53-5.68-14.3-6.56-27.11-17.02-43.35-18.59-23.16-2.25-46.39-3.76-69.6-5.47-2.29 0-4.58.35-6.76.98-5.47 1.14-10.97 2.94-16.44 3.55-28.25 3.1-52.42 16.75-76.72 29.86-4.09 2.19-9.95 4.82-5.92 11.87.41.69-1.04 2.27-1.04 3.43.14 7.21-1.18 14.69 2.88 21.29 8.21-3.51 16.2-6.58 23.86-10.13 41.32-19.18 84.16-30.15 130.14-24 14.93 1.94 30.44.65 44.37 8.21 2.55 1.35 5.27 2.35 8.09 2.94 2.86.63 5.74 1.1 8.66 1.39v-.14l-.02.04Zm10.83 2.27c-10.19 9.31-4.76 18.47 2.06 27.41-.71-9.15-1.39-18.59-2.06-27.27v-.14Z"
              />
              <path
                fill="#ffda9f"
                d="M433.97 592.19c7.01 15.01 12.99 28.03 19.18 40.98 1.18 3.31 3.04 6.31 5.47 8.84 20.71 16.91 41.86 33.23 68.84 39.18 17.18 3.78 34.34 7.72 51.52 11.46 2.64.65 5.39.8 8.09.43 13.87-2.27 27.94-3.1 40.59-10.83 15.59-9.56 32.58-16.91 45.1-30.89 7.09-7.93 14.05-15.95 21.1-23.9.82-.9 1.82-1.68 3.29-3.06 1.53 3.23 2.74 6.11 4.25 8.97a440.384 440.384 0 0 1 28.7 73.52c6.27 21.92 11.42 43.84 15.89 66.12 2.9 14.5 1.82 29.19-.71 44.04-1.76 10.34-6.5 18.24-10.72 27.19-5.05 10.68-6.66 23.08-9.23 34.85-2 8.52-3.35 17.16-4.02 25.86-.82 13.01 0 26.11-.9 39.1-.78 8.46-2.02 16.85-3.76 25.17-.49 1.41-1.47 2.57-2.74 3.35-7.27 5.15-14.61 10.19-21.92 15.26-4.49 3.1-8.68 1.86-12.69-1.02-7.37-5.35-11.5-12.91-14.91-21.12-6.31-15.16-12.05-30.64-19.79-45.04-5.07-9.48-14.87-15.1-25.57-17.55-15.63-3.55-31.23-7.44-47.57-5.76-3.96.16-7.93-.14-11.81-.9-21.92-3.15-42.63.16-61.22 12.93a43.846 43.846 0 0 0-19.51 30.52c-2 10.83-5.27 21.37-9.76 31.44-6.01 14.28-31.7 24.49-45.96 18.79-10.34-4.15-16.26-12.26-19.96-22.65-5.47-15.14-6.76-30.78-8.05-46.59-.67-10.97-2.08-21.86-4.19-32.64-3.06-14.26-7.76-28.15-11.26-42.35-5.9-23.37-9.76-47.21-11.58-71.25-.86-11.93-2.74-23.9-2.19-35.79.71-9.31 2.51-18.51 5.31-27.41 2.35-10.07 5.64-19.88 9.85-29.31 9.89-20.28 20.79-40.06 31.56-59.87 3.45-5.92 7.23-11.64 11.34-17.12 2.64-4 5.7-7.6 9.95-12.97v.04Z"
              />
              <path
                fill="#c48792"
                d="M696.85 463.51c-6.56-2.33-12.97-5.09-19.18-8.21-17.79-10.3-37.44-10.11-56.95-11.3-7.44-.43-14.79-1.78-22.22-2.06-10.97-.41-22.14-1.47-32.89 0-13.83 1.53-27.41 4.7-40.51 9.4-17.18 6.66-33.32 15.91-49.9 24.06-.9.47-1.7 1.12-2.74 1.76-6.39-5.19-8.64-12.13-9.62-19.71-1.82-13.71-3.88-27.6-5.47-41.43-1.63-14.67-2.74-29.37-4.17-44.06-.55-5.78-1.51-11.56-1.68-17.38-.74-27.74-.9-55.46 6.15-82.55 4.8-18.47 8.8-37.38 15.99-54.81 12.5-31.46 30.7-60.34 53.66-85.22 21.84-23.16 49.25-36.99 78.85-46.47 15.5-4.92 32.07-6.64 48.23-9.52 8.56-1.51 17.3-3.7 25.82-3.27 11.77.55 24.66.16 32.89 11.15 6.27 8.21 11.46 17.47 18.47 24.98 8.72 9.34 10.05 21.04 13.05 32.32.57 3.49.78 7.03.65 10.54.63 9.52 1.35 19.18 1.94 28.58.33 2.9.39 5.82.14 8.74-2.35 17.89-5.13 35.62-7.31 53.6-3.19 26.23-9.95 51.74-14.71 77.64a446.64 446.64 0 0 1-10.54 45.55c-8.56 29.05-11.66 59.03-17.16 88.59-.35 2.41-.39 5.03-.78 9.05l-.02.02Zm-20.96-338.6c0-9.97-3.23-14.42-10.27-12.99-3.08 1.06-5.8 2.96-7.86 5.47-4.27 4-5 10.54-1.74 15.4 2.47 3.39 5.31 6.39 10.38 4.88 8.27-2.49 9.52-4.17 9.48-12.77h.02Zm-97.11 19.43c-.1 2.1-.1 4.21 0 6.31.74 6.05 7.46 11.17 10.97 7.95a36.8 36.8 0 0 0 8.74-13.71c.63-3.17 0-6.45-1.74-9.17-2.74-4.96-8.21-4.02-12.3-2.94-5.68 1.76-6.41 6.99-5.68 11.56Zm-75.76 196.67c6.48-.04 11.73-5.25 11.85-11.73 0-4.19-6.23-9.05-11.73-9.13-5.31-.45-9.97 3.49-10.42 8.8-.04.59-.04 1.16 0 1.76.08 6.74 3.86 10.42 10.34 10.36v-.06h-.04Zm43.82-140.6c0-7.72-3.21-12.66-8.21-12.66-4.25 0-12.01 7.78-12.03 12.09.47 6.41 5.6 11.52 12.03 11.93 4.82-.1 8.21-4.8 8.21-11.3v-.06Zm91.13-13.71c.25 8.64 3.13 12.85 8.64 12.6 6.99-.27 11.64-4.8 11.48-11.13-.16-5.47-7.09-12.3-12.09-12.05s-8.19 4.64-8.03 10.72v-.14Zm-6.72 165.5c9.17 0 15.26-3.21 15.22-8.48 0-5.84-5.47-12.17-10.34-12.26s-11.62 7.35-11.5 13.54c.06 4.25 1.27 7.6 6.64 7.31v-.14l-.02.02Zm-117.62-94.74a9.276 9.276 0 0 0-8.56 9.87c0 5.03 4.66 12.58 7.86 12.77 3.68.18 10.97-5.47 10.97-8.6.31-6.58-5.07-13.87-10.27-13.89v-.14Zm202.15-71.66c0-6.76-2.74-9.72-9.17-9.52-4.27 0-9.34.51-10.09 5.68-.94 6.66 5.62 14.99 10.97 15.26 3.15.16 8.29-6.74 8.29-11.42Zm-125.24 42.69c0 5.86 3.37 12.17 6.64 12.34 4.68.25 11.3-6.19 10.97-10.97-.22-5.35-4.84-11.5-8.74-11.58-5.23.33-9.19 4.84-8.87 10.07v.14Zm56.73 36.42c-1.68.45-3.37.78-5.11.96-3.86 0-6.84 1.63-6.88 5.47.35 2.61 1.49 5.05 3.27 6.99 1.86 2.23 3.98 4.23 6.31 5.96 1.04.82 2.88 1.86 3.72 1.47 4.02-1.84 6.88-4.82 5.92-9.7-.96-4.88-2.1-9.62-7.23-11.17v.02Zm40.02-38.36c-2.31 2.06-5.47 3.68-6.72 6.19-1.98 3.7-4.31 8.21-.35 12.11 2.74 2.74 5.47 7.95 9.95 3.72 2.92-3.17 4.84-7.15 5.47-11.42.8-5.31-3.1-9.54-8.35-10.6Zm2.74 79.97c5.47 0 10.21-3.27 10.25-6.84 0-8.01-3.84-11.89-11.66-11.73-4.8.39-8.44 4.51-8.21 9.31.63 4.94 4.64 8.76 9.6 9.17l.06.08h-.04Zm-101.77-9.54c0-6.41-4.02-11.15-8.76-10.97-3.15 0-8.6 7.44-8.74 11.87 0 3.51 5.47 7.17 10.68 7.39 6.66.06 7.31-4.02 6.76-8.4l.06.08v.02Z"
              />
              <path
                fill="#ffda9f"
                d="M478.99 553.86c.14-1.65.14-3.33 0-4.98-1.94-10.46 2.74-16.91 12.01-21.02 16.87-7.52 33.21-16.67 50.7-22.39 15.32-5.03 31.05-9.54 47.96-9.15 24.06.51 48.25-1.55 71.74 5.62 6.97 2.14 13.71 4.98 20.45 7.7a7.01 7.01 0 0 1 3.64 3.1c4.27 8.99 9.97 17.79 11.89 27.41a67.46 67.46 0 0 1-1.45 27.78c-4.49 18.92-12.71 35.48-28.97 48.29a193.756 193.756 0 0 1-47.98 27.62c-16.75 6.82-33.13 6.15-49.96 5.47a45.98 45.98 0 0 1-17.32-4.56c-13.38-6.23-26.62-12.89-39.47-20.14a32.933 32.933 0 0 1-11.89-11.5c-6.99-11.58-13.13-23.65-18.43-36.12-2.74-7.01-2.74-15.26-4.07-22.96l1.12-.16.02-.02Zm133.16 66.33c5.94-6.17 5.7-6.82 0-11.5-2.45-2.43-4.6-5.13-6.39-8.05-3.55-4.74 2.08-6.11 3.15-9.13.65-3.27.8-6.62.43-9.93-2.41 0-4.82-.16-7.21 0-5.94.31-11.89.63-17.81 1.12-2.17.18-6.01.63-6.11 1.43-.41 2.78-.06 5.62.98 8.21 1.45 2.45 3.15 4.78 5.05 6.9 2.51 3.6 2.49 6.56-1.74 9.25-4.23 2.7-8.09 6.19-12.69 9.78 14.28 9.25 19.18-4.58 27.62-9.4l14.69 11.3h.04Zm47.02-84.96c-5.17.16-10.32.8-15.38 1.86-7.46 2.23-15.32 3.98-20.57 10.74-3.64 4.72-4.68 11.17-1.92 14.12 4.29 4.82 11.66 5.27 16.48.98.27-.22.51-.47.76-.74a46.711 46.711 0 0 1 25.74-13.09c4.39-.63 5.7-3.21 5.47-7.52-.55-7.37-5.76-6.27-10.58-6.33v-.02Zm-101.09 26.45c2.74-1.59 7.39-2.74 8.21-5.05 2.74-9.01-5.78-18.96-15.26-18.85-2.47-.04-4.96-.27-7.39-.71-6.03-.96-12.03-2.57-18.12-2.94-7.95-.51-10.11 3.43-5.84 10.25 1.63 2.08 3.78 3.7 6.25 4.68 6.58 3.1 13.26 5.96 20 8.68 3.47 1.45 7.23 2.39 12.13 3.94h.02Zm-156.37 55.28c-1.45 2.43-3.1 4.76-4.31 7.35-9.42 20.1-18.75 40.28-28.03 60.53-2.08 4.56-3.68 9.31-5.47 13.91-8.82 21.02-9.85 42.94-7.27 65.24 1.86 15.87 2.74 31.91 5.19 47.66 2.39 15.18 6.11 30.15 9.46 45.14 1.82 8.09 4.07 16.04 5.78 22.88-14.63 5.15-28.58 9.72-42.22 15.08-7.68 2.96-14.67 6.97-23.29 8.03-8.91.78-17.85-.94-25.84-4.96-8.52-3.72-10.52-14.46-6.88-24.08 3.06-8.09 8.48-15.26 12.26-23.12a347.426 347.426 0 0 0 15.65-35.24c1.63-4.76-.61-10.97-1.23-16.44-.69-5.96-2.74-12.03-2.14-17.83 1.86-19.18.16-38.73 6.17-57.54 2.19-6.9.8-14.87 2.57-21.92 2.04-8.03 5.03-15.77 8.89-23.1 7.93-15.01 19.04-28.13 32.58-38.36 3.94-3.06 7.62-6.48 11.32-9.85 10.25-9.25 22.55-13.24 35.77-14.91l1.1 1.55h-.04Z"
              />
              <path
                fill="#c48792"
                d="M433.83 501.28c3.8 6.11 6.48 10.54 9.31 14.83.94 1.1 2.06 2.04 3.35 2.74 7.48 5.03 12.3 3.04 12.99-5.78.51-6.43.51-12.91 0-19.34-.69-5.17-5.45-8.8-10.64-8.11-1.27.16-2.49.59-3.6 1.25-2.74 1.53-5.47 3.37-8.48 5.19-3.19-10.44 1.98-23.18 12.34-20.08 4.04 1.23 7.46 3.98 9.48 7.7 3.23 7.78 4.56 16.44 7.09 24.39 5.47 17.34 2.74 35.16 3.21 52.74.57 17.18 7.52 32.15 14.46 47.39 10.03 21.92 28.19 33.52 49.05 43.35 18.94 8.93 37.89 13.87 58.95 12.5 11.34-.74 21.92-1.39 32.44-7.01 10.97-5.92 21.92-11.85 32.68-17.57 27.41-14.52 39.3-38.89 48.64-65.78 1.14-3.31.94-7.13 1.92-10.64 3.06 10.7 2.53 22.1-1.51 32.48-9.09 25.17-25.9 44.39-45.92 61.24a31.723 31.723 0 0 1-5.62 3.94c-13.05 6.76-26 13.71-39.32 19.96-4.15 1.94-9.31 1.68-14.01 2.35-18.67 2.74-36.12-3.19-53.85-7.29-5.86-1.35-11.87-2.19-17.83-3.1-16.44-2.49-29.95-10.97-42.45-21.29-.16-.14-.31-.31-.47-.41-25.76-18.71-37.87-45.55-44.67-75.48-4.66-20.53-8.72-41.1-7.48-62.36 0-2-.1-4.02-.1-7.8h.04ZM613.34 38.18c19.92-10.42 60.98-1.82 80.46 23.49-2.23.47-4.47.78-6.74.96-3.8 0-7.68-.33-11.46-.14-6.64.35-13.26.86-19.81 1.68-8.05.76-16.04 1.98-23.92 3.68-13.46 3.31-26.7 7.44-40.02 11.26-.98.27-1.86 1.1-2.74 1.27-15.26 2.39-27.21 12.11-40.53 18.63-14.95 7.31-25.68 20.08-36.65 32.5-14.22 16.12-24.66 34.58-35.28 52.89-16.44 28.19-25.74 58.81-30.15 90.98-1.45 10.5-2.55 21.04-3.86 31.56-.22.78-.53 1.53-.96 2.23-6.15-7.39-7.44-69.72-1.12-93.7 12.46-47.29 29.62-92.29 66.37-126.71l1.98 1.06c-1.55 2.51-2.94 5.15-4.68 7.54-2.02 2-2.02 5.27 0 7.29.14.14.29.27.43.39 3.31 3.43 6.33 7.13 10.54 11.97 9.15-7.7 18.47-14.85 26.94-22.88 4.68-4.43 4.43-15.24.88-20.37-4.23-6.11-6.9-6.74-13.5-3.15-.82.47-1.76.74-2.74 1.23 1.82-9.7 41.16-28.88 57.46-26.96-3.47.98-6.9 2.27-10.46 2.94-9.05 1.74-11.34 7.01-6.15 14.63 6.03 8.84 12.26 11.48 22.49 8.21 7.84-2.7 15.48-6.03 22.8-9.93 7.23-3.8 8.05-7.52 4.51-14.87-1.12-2.74-2.68-5.19-4.11-7.68v.02Zm-139.95 132.2c4.92.61 7.56-2.49 9.78-6.68 2.74-5.47 5.72-10.6 9.01-15.65 4.23-6.56 3.86-13.18-1.35-16.44-4.76-3.02-14.91.61-17.51 6.31-2.74 6.19-5.72 12.42-8.35 18.71-2.94 6.9 1.14 13.71 8.42 13.75Z"
              />
              <path
                fill="#c48792"
                d="M693.01 500.26a72.14 72.14 0 0 1-8.68-1.18 30.08 30.08 0 0 1-8.09-2.94c-13.91-7.62-29.44-6.33-44.37-8.21-45.98-6.01-88.82 4.84-130.14 24-7.68 3.55-15.59 6.64-23.86 10.13-4.07-6.6-2.74-14.09-2.88-21.29 0-1.14 1.45-2.74 1.04-3.43-4.02-7.05 1.84-9.68 5.92-11.87 24.31-13.13 48.47-26.78 76.72-29.86 5.47-.63 10.97-2.41 16.44-3.55 2.21-.63 4.47-.96 6.76-.98 23.21 1.7 46.59 3.21 69.6 5.47 16.26 1.55 29.05 12.03 43.35 18.59 1.18.55 1.78 3.8 1.53 5.68-.74 6.09-2.02 11.95-3.37 19.45h.02Z"
              />
              <path d="M703.84 502.55c.65 8.68 1.35 18.12 2.06 27.41-6.82-8.93-12.26-18.08-2.06-27.41Z" />
              <path
                fill="#2b2a27"
                d="M675.89 124.91c0 8.6-1.35 10.27-9.48 12.69-5.07 1.51-7.93-1.47-10.38-4.88-3.29-4.86-2.55-11.38 1.74-15.4 2.06-2.51 4.78-4.41 7.86-5.47 7.05-1.35 10.27 3.1 10.27 13.07h-.02Zm-97.11 19.43c-.78-4.64 0-9.87 5.78-11.42 4.11-1.1 9.56-2.02 12.3 2.94 1.74 2.72 2.37 6.01 1.74 9.17a36.8 36.8 0 0 1-8.74 13.71c-3.6 3.23-10.3-1.9-10.97-7.95a57.49 57.49 0 0 1-.1-6.43v-.02Z"
              />
              <path
                fill="#2e2d28"
                d="M503.02 341.07c-6.58 0-10.25-3.62-10.3-10.3-.51-5.31 3.35-10.03 8.66-10.54.59-.06 1.16-.06 1.76 0 5.47 0 11.73 4.92 11.73 9.13-.1 6.48-5.35 11.68-11.85 11.73v-.02Z"
              />
              <path
                fill="#2c2b28"
                d="M546.83 200.47c0 6.5-3.39 11.17-8.21 11.34a12.875 12.875 0 0 1-12.03-11.93c0-4.31 7.78-12.09 12.03-12.09 5 0 8.21 4.92 8.21 12.66v.02Zm91.13-13.62c-.16-6.09 3.06-10.34 8.03-10.58 4.96-.25 11.93 6.72 12.09 12.05.16 6.33-4.49 10.97-11.48 11.13-5.52.25-8.4-3.98-8.64-12.6Z"
              />
              <path
                fill="#2e2d28"
                d="M631.24 352.35c-5.47.31-6.58-3.06-6.64-7.17 0-6.19 6.33-13.71 11.5-13.54 5.17.16 10.27 6.41 10.34 12.26.06 5.27-6.03 8.58-15.22 8.48l.02-.02Z"
              />
              <path
                fill="#2c2b28"
                d="M513.62 257.61c5.21 0 10.58 7.29 10.38 14.03 0 3.13-7.39 8.8-10.97 8.6-3.21-.18-7.86-7.76-7.86-12.77-.35-5.05 3.41-9.44 8.44-9.87h.02Z"
              />
              <path
                fill="#2d2c28"
                d="M715.79 185.81c0 4.68-5.11 11.58-8.42 11.42-5.23-.27-11.79-8.6-10.97-15.26.74-5.15 5.8-5.47 10.09-5.68 6.56-.22 9.29 2.74 9.29 9.52Z"
              />
              <path
                fill="#2e2c28"
                d="M590.55 228.5c-.35-5.23 3.62-9.74 8.84-10.07h.14c3.88 0 8.52 6.25 8.74 11.58.18 4.64-6.41 10.97-10.97 10.97-3.39-.31-6.8-6.6-6.76-12.46v-.02Zm56.73 36.42c5.11 1.47 6.27 6.31 7.23 11.17.96 4.86-1.9 7.86-5.92 9.7-.86.39-2.74-.65-3.72-1.47a38.291 38.291 0 0 1-6.31-5.96 12.834 12.834 0 0 1-3.27-6.99c0-3.84 3.02-5.47 6.88-5.47 1.72-.18 3.43-.51 5.11-.96v-.02Zm40.02-38.36c5.27 1.14 9.15 5.47 8.21 10.6-.63 4.27-2.55 8.25-5.47 11.42-4.41 4.23-7.27-1.06-9.95-3.72-3.94-3.92-1.61-8.42.35-12.11 1.51-2.59 4.56-4.23 6.84-6.19h.02Z"
              />
              <path
                fill="#2f2d29"
                d="M689.97 306.45c-4.98-.45-8.97-4.31-9.56-9.25-.2-4.8 3.43-8.93 8.21-9.31 7.84-.16 11.7 3.72 11.66 11.73-.1 3.7-4.96 6.84-10.34 6.84h.02Z"
              />
              <path
                fill="#2e2c28"
                d="M588.2 296.91c.55 4.35 0 8.44-6.82 8.21-5.29-.22-10.81-3.88-10.68-7.39.14-4.43 5.47-11.85 8.74-11.87 4.82-.1 8.76 4.64 8.76 11.05Z"
              />
              <path
                fill="#2d2b28"
                d="m612.14 620.19-14.61-11.21c-8.4 4.82-13.34 18.67-27.62 9.4 4.6-3.6 8.42-7.05 12.69-9.78 4.27-2.74 4.25-5.68 1.74-9.25-1.96-2.12-3.7-4.45-5.21-6.92a15.653 15.653 0 0 1-.98-8.21c0-.8 3.94-1.23 6.11-1.43 5.92-.49 11.87-.82 17.81-1.12h7.21c.35 3.31.2 6.66-.43 9.93-1.06 3.02-6.72 4.39-3.15 9.13 1.8 2.92 3.94 5.64 6.39 8.05 5.78 4.64 6.03 5.29.08 11.46l-.04-.02Z"
              />
              <path
                fill="#2b2a27"
                d="M659.16 535.28c4.82 0 10.05-1.04 10.52 6.35.27 4.31-1.04 6.88-5.47 7.52a46.94 46.94 0 0 0-25.74 13.09c-4.41 4.7-11.81 4.92-16.51.51a8.81 8.81 0 0 1-.74-.76c-2.74-2.94-1.74-9.4 1.92-14.12 5.27-6.76 13.13-8.52 20.57-10.74 5.09-1.08 10.23-1.7 15.42-1.86h.02Z"
              />
              <path
                fill="#2b2927"
                d="M558.07 561.75c-4.9-1.55-8.66-2.49-12.26-3.92-6.74-2.74-13.42-5.47-20-8.68-2.45-.98-4.62-2.59-6.25-4.68-4.27-6.82-2.1-10.77 5.84-10.25 6.09.35 12.09 1.98 18.12 2.94 2.45.45 4.92.67 7.39.71 9.48 0 18.08 9.85 15.26 18.85-.71 2.33-5.39 3.45-8.11 5.05v-.02Z"
              />
              <path
                fill="#2c2a27"
                d="M473.4 170.39c-7.27 0-11.34-6.82-8.42-13.71 2.74-6.31 5.47-12.52 8.35-18.71 2.59-5.7 12.75-9.31 17.51-6.31 5.21 3.29 5.47 9.93 1.35 16.44-3.29 5.05-6.23 10.3-9.01 15.65-2.23 4.15-4.84 7.23-9.78 6.64Z"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "black",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {postTitle || slug || "Default Title"}
          </div>
          <div
            style={{
              fontSize: 18,
              fontStyle: "normal",
              color: "black",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            eff1gy.xyz
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 626,
        fonts: [
          {
            name: "Kaisei Tokumin",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
