"use client"
import dynamic from "next/dynamic"
import { useState } from "react"
import { openPane } from "../AppState"

const CodeEditor = dynamic(() => import("./CodeEditor"), { suspense: true })

export function Exercise ({
  blockId,
  prompt,
  exerciseCode,
  solutionCode,
}: {
  blockId: string
  prompt: React.ReactNode
  exerciseCode: string
  solutionCode: React.ReactNode
}) {
  const [showSolution, setShowSolution] = useState(false)
  return (
    <div className="bg-tan -mx-2 my-4 rounded-md p-2 md:-mx-4 md:p-4">
      <div className="text-sm font-semibold">Exercise</div>
      <div className="mb-4">{ prompt }</div>
      <div className="flex gap-2">
        <button
          onClick={ () => {
            openPane(
              blockId,
              <CodeEditor blockId={ blockId } initialCode={ exerciseCode } />
            )
          } }
          className="button"
        >
          Show exercise
        </button>
        <button
          onClick={ (e) => {
            setShowSolution((show) => !show)
          } }
          className="button"
        >
          { !showSolution ? "Show" : "Hide" } solution
        </button>
      </div>
      { showSolution ? <div className="mt-4">{ solutionCode }</div> : null }
    </div>
  )
}
