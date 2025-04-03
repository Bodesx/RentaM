import Image from "next/image"

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-6 rounded-lg shadow-md w-1/6 text-center">
       <Image 
                 src="/house.svg"
                 width={200}
                 height={200}
                 alt={` logo`}
               />
      </div>
    </div>
  )
}

export default Loader





