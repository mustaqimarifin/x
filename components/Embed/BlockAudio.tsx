"use client"

const AudioBlock = ({ source }: { source: string }) => {
return (
  <div className=""><iframe width="100%" height="166" src={source}></iframe></div>
)}

export default AudioBlock