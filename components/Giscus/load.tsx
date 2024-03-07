"use client"
import React, { memo, useState } from "react";
import Geezcuz from ".";

const Giscus = memo(function Giscus() {
  const [loadComments, setComments] = useState(false);
  let canReply = true

  return (
    <>
      { canReply && !loadComments ? (
        <>
          <div className="flex justify-center space-y-2 mt-8">
            <button
              className="text-primary hover:shadow-lg hover:bg-rose-300 hover:text-gray-50 rounded-md dark:hover:text-primary dark:hover:bg-rose-400 transition px-2 py-1 uppercase font-semibold text-xs text-center"
              onClick={ () => setComments(!loadComments) }
              //aria-label={ loadComments }
            >
              Load Comments 👺
            </button>
          </div>
        </>
      ) : (
        <Geezcuz />
      ) }
    </>
  )
})

export default Giscus;
