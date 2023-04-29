"use client";
import { cx } from "lib/utils";
import Image from "next/image";
import React, { type FC } from "react";

export interface AvatarProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
  src: string;
  size?: "sm" | "lg";
  isLoading?: boolean;
  error?: any;
}

const Avatar: FC<AvatarProps> = ({
  src,
  className,
  size = "sm",
  isLoading,
  error,

  ...otherProps
}) => {
  //const image = useImage({ srcList: src || [], useSuspense: false });

  return (
    <div
      {...otherProps}
      className={cx(
        size === "sm" ? "h-6 w-6" : "h-10 w-10",
        "bg-alpha-10 relative inline-block overflow-hidden rounded-full",
        className
      )}
    >
      {src && (
        <Image
          className="h-full w-full rounded-full object-cover"
          src={src}
          alt=""
          width={24}
          height={24}
        />
      )}

      {isLoading && <div className="absolute inset-0"></div>}
      {error && (
        <div className="absolute inset-0">
          <svg
            className="text-alpha-60"
            viewBox="0 0 128 128"
            role="img"
            aria-label="avatar"
          >
            <path
              fill="currentColor"
              d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
            ></path>
            <path
              fill="currentColor"
              d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Avatar;
