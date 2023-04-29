"use client"
import React, { useCallback } from "react"

import Image from "next/image"
import Link from "next/link"

type CLink = {
  children: React.ReactNode
  href: string
}

export default function CustomLink ({ children, href }: CLink) {
  const [imagePreview, setImagePreview] = React.useState("")
  const [isHovering, setIsHovering] = React.useState(false)
  let inImagePreview = false
  let inLink = false

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""

  const handleMouseEnterImage = () => {
    inImagePreview = true
    setIsHovering(true)
  }

  const handleMouseLeaveImage = () => {
    inImagePreview = false
    setIsHovering(inLink)
  }

  const handleMouseEnterLink = () => {
    inLink = true
    setIsHovering(true)
  }

  const handleMouseLeaveLink = () => {
    inLink = false
    setIsHovering(inImagePreview)
  }

  const handleFetchImage = useCallback(
    async (url: string) => {
      const res = await fetch(`${origin}/api/link-preview?url=${url}`)
      const data = await res.json()
      setImagePreview(data.image)
    },
    [origin]
  )

  React.useEffect(() => {
    handleFetchImage(href)

    return () => setImagePreview("")
  }, [href, handleFetchImage])

  return (
    <span>
      <span className="relative z-10 hidden md:inline-block">
        <Link
          href={ href }
          className={ `${isHovering && "underline"}` }
          onMouseEnter={ handleMouseEnterLink }
          onMouseLeave={ handleMouseLeaveLink }
          onFocus={ handleMouseEnterLink }
          onBlur={ handleMouseLeaveLink }
        >
          { children }
        </Link>
        { isHovering && (
          <Link href={ href } passHref>
            <span
              className="absolute left-1/2 top-[-195px] flex h-44 w-56 -translate-x-[7rem] translate-y-8 transform items-start justify-center"
              onMouseLeave={ handleMouseLeaveImage }
              onMouseEnter={ handleMouseEnterImage }
              onFocus={ handleMouseEnterImage }
              onBlur={ handleMouseLeaveImage }
            >
              { imagePreview ? (
                <Image
                  fill
                  className="h-40 w-56 rounded-md bg-white object-cover object-top shadow-lg hover:ring-4 hover:ring-emerald-400"
                  src={ imagePreview }
                  alt={ href }
                />
              ) : (
                <span className="flex h-40 w-56 items-center justify-center rounded-md bg-white text-slate-800 shadow-lg">
                  Loading...
                </span>
              ) }
            </span>
          </Link>
        ) }
      </span>
      <a
        href={ href }
        className={ `${isHovering && "underline"} md:hidden` }
        onMouseEnter={ handleMouseEnterLink }
        onMouseLeave={ handleMouseLeaveLink }
        onFocus={ handleMouseEnterLink }
        onBlur={ handleMouseLeaveLink }
      >
        { children }
      </a>
    </span>
  )
}
