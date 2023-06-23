"use client";
import { Carousel } from "@heathmont/moon-core-tw";

import { authors } from "data/authors";
import Image from "next/image";

const IMGC = () => {
  //const items: Author[] = Array.from({ length: 5 }, (index) => index)
  return (
    <Carousel>
      <Carousel.LeftArrow>"LEFT"</Carousel.LeftArrow>
      <Carousel.Reel className="gap-10">
        {authors.map((author, index) => (
          <Carousel.Item key={author.image} className="">
            <Image
              src={author.image}
              alt="Author Photo"
              loading="eager"
              width={320}
              height={192}
            />
          </Carousel.Item>
        ))}
      </Carousel.Reel>
      <Carousel.RightArrow>"RIGHT"</Carousel.RightArrow>
    </Carousel>
  );
};

export default IMGC;
