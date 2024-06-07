"use client"

import { useEffect } from "react"

const Floatingbar = ({ inView }) => {
  useEffect(() => {
    console.log(inView)
  }, [inView])
  return (
    <div
      className={`transition-all flex px-7 rounded-full fixed bottom-10 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        inView ? "h-14 w-48 sm:w-96" : "h-14 w-14"
      }`}>
      a
    </div>
  )
}

export default Floatingbar
