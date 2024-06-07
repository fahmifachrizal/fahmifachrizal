"use client"
import Floatingbar from "@components/Floatingbar"
import Image from "next/image"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function ContentSection() {
  const { ref, inView, entry } = useInView({ threshold: 0.1 })

  useEffect(() => {
    const track = document.getElementById("image-track")

    const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX)

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0"
      track.dataset.prevPercentage = track.dataset.percentage
      track.dataset.prevTranslateX = track.dataset.translateX
    }

    const handleOnMove = (e) => {
      if (track.dataset.mouseDownAt === "0") return
      const parentWidth = track.parentElement.offsetWidth;
      const containerWidth = track.scrollWidth
      const maxScroll = containerWidth - parentWidth;
      // console.log(parentWidth,'<<<<<<<<<<<<<') // relative to screen width e.clientX
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX
      const maxDelta = containerWidth / 2

      const percentage = (mouseDelta / maxDelta) * -100
      const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0),-100)

      const pixelMovement = (mouseDelta / containerWidth) * containerWidth;
      const nextTranslateXUnconstrained = parseFloat(track.dataset.prevTranslateX) - pixelMovement;
      const nextTranslateX = Math.max(Math.min(nextTranslateXUnconstrained, 0), -maxScroll);
      console.log(nextTranslateX)

      track.dataset.percentage = nextPercentage
      track.dataset.translateX = nextTranslateX

      track.animate(
        {
          // transform: `translate(${nextPercentage}%, 0%)`,
          transform: `translate(${nextTranslateX + ((parentWidth/2) * (nextPercentage/100))}px, 0px)`,
        },
        { duration: 1200, fill: "forwards" }
      )

      for (const image of track.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        )
      }
    }

    /* -- Had to add extra lines for touch events -- */
    window.onmousedown = (e) => handleOnDown(e)
    window.ontouchstart = (e) => handleOnDown(e.touches[0])
    window.onmouseup = (e) => handleOnUp(e)
    window.ontouchend = (e) => handleOnUp(e.touches[0])
    window.onmousemove = (e) => handleOnMove(e)
    window.ontouchmove = (e) => handleOnMove(e.touches[0])
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full bg-blue-600 flex flex-col items-center justify-center">
      <Floatingbar inView={inView} />
      <div id="about-section" className="bg-blue-600 w-full h-screen"></div>
      <div
        id="projects-section"
        className="bg-gray-600 h-screen w-full overflow-clip">
        <div
          id="image-track"
          className="flex h-full flex-col sm:flex-row gap-8"
          data-mouse-down-at="0"
          data-prev-percentage="0"
          data-prev-translate-x="0">
          <ImageContainer src="/images/1.jpg" />
          <ImageContainer src="/images/2.jpg" />
          <ImageContainer src="/images/3.jpg" />
          <ImageContainer src="/images/4.jpg" />
          <ImageContainer src="/images/5.jpg" />
        </div>
      </div>
    </div>
  )
}

function ImageContainer({ src }) {
  return (
    <div
      className="relative max-sm:w-10/12 max-sm:h-48 max-sm:left-1/2 max-sm:-translate-x-1/2 xl:w-[500px] xl:-translate-y-1/2 xl:h-5/6 xl:top-1/2 xl:left-1/2 flex-none"
      draggable={false}>
      <Image
        className="image object-cover object-right"
        src={src}
        alt="alt"
        quality={100}
        fill
        sizes="100vw"
        draggable={false}
      />
    </div>
  )
}
