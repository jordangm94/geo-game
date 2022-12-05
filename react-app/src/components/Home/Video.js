//This component holds the background video for the home page

import Home_Video_Pexels from './simple.mp4'

export default function Video () {

  return (
    <>
    <video src={Home_Video_Pexels} autoPlay loop muted />
    </>
  )
}