"use client";
import { Event } from "data/event";
import Image from "next/image";

export const HoverCard = ({ event }: { event: Event }) => {
  return (
    <a href="#" className="group relative block bg-black">
      <Image
        alt="Developer"
        src={event.cover}
        width={544}
        height={306}
        className="absolute inset-0  object-cover object-center opacity-75 transition-opacity group-hover:opacity-50 md:h-36 lg:h-48 "
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          {event.location}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">
          {event.title}
        </p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">{event.pitch}</p>
          </div>
        </div>
      </div>
    </a>
  );
};
