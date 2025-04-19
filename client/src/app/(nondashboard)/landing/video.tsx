export function Video() {
  return (
   <video  src="/v1.mp4"
   
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className="object-cover object-center fill">
     
    
      Your browser does not support the video tag.
    </video>
  )
}