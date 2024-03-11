'use client'
import * as React from 'react'

import {Spotify} from 'react-spotify-embed'

import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/soundcloud'), {ssr: false})
const AudioBlock = ({source}: {source: string}) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
  }, [])
  // console.log(source)
  //const scID = new URLSearchParams(source.slice(73, 83))

  if (source.startsWith('https://open')) {
    return (
      <React.Suspense>
        <div className="w-full">{isClient ? <Spotify wide link={source} /> : null}</div>
      </React.Suspense>
    )
  }
  if (source.startsWith('https://on.soundcloud' || 'https://soundcloud' || 'https://w.soundcloud')) {
    return (
      <div className="w-full rounded-md">
        <React.Suspense>
          {isClient ? (
            <ReactPlayer
              url={source}
              config={{
                
                  options: {
                    width: '100%',
                    height: '300',
                    frameborder: 'no',
                    borderRadius: '15px',
                  },
                
              }}
            />
          ) : null}
        </React.Suspense>
      </div>
    )
  }
}

export default AudioBlock

{
  /* <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1669510497&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/whereisalex" title="whereisalex" target="_blank" style="color: #cccccc; text-decoration: none;">whereisalex</a> · <a href="https://soundcloud.com/whereisalex/6-28-speedin-1" title="omarion - speedin (whereisalex flip)" target="_blank" style="color: #cccccc; text-decoration: none;">omarion - speedin (whereisalex flip)</a></div> */
}
