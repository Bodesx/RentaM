'use client';

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { featuredHomes } from "../../components/FeaturedHomes";
import { FiAlertCircle } from "react-icons/fi";
import React, { useRef, useState } from "react";
import Image from "next/image";

interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  slug: string;
}

const PopWrapper = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-content-center ">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Contact
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} slug={slug} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, slug }: SpringModalProps) => {
  const selectedProperty = featuredHomes.find(home =>
    home.address.toLowerCase().includes(slug.toLowerCase())
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const slideValueResized = useRef<string | undefined>("0");
  const slideValue = useRef<string | undefined>("0");

  const propertyIndex = useRef(
    parseInt(slug.split("-")[1]) - 1 || 0
  );

  function slideImage(e: React.MouseEvent<HTMLElement>, index: number) {
    setSelectedIndex(index);
    if (!sliderRef.current || !(e.target instanceof HTMLElement)) return;

    slideValueResized.current = e.target.dataset.left2;
    slideValue.current = e.target.dataset.left;

    sliderRef.current.style.transition = "all 0.7s";
    const offset = window.innerWidth <= 700 ? slideValueResized.current : slideValue.current;
    sliderRef.current.style.left = `-${offset}vw`;
  }

  function slideRight() {
    const images = featuredHomes[propertyIndex.current].carousel_images;
    if (selectedIndex === images.length - 1) {
      sliderRef.current!.style.transition = "unset";
      sliderRef.current!.animate(
        [{ opacity: "0.2" }, { opacity: "1.0" }],
        { duration: 500, fill: "forwards" }
      );
      sliderRef.current!.style.left = `0vw`;
      slideValue.current = "0";
      setSelectedIndex(0);
    } else {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      if (sliderRef.current) {
        const offset = window.innerWidth <= 700 ? newIndex * 100 : newIndex * 70;
        sliderRef.current.style.left = `-${offset}vw`;
        slideValue.current = offset.toString();
        sliderRef.current.style.transition = "all 0.7s";
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
           
            <div className="relative z-10">

<div>
  <div>
    <div>
      <Image
        src={featuredHomes[propertyIndex.current].carousel_images[0]}
        alt="Property Image"
        placeholder="blur"
        quality={100}
        width={500}
        height={300}
      />
    </div>
  </div>
</div>



              
              <div className=" mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
               
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                 {featuredHomes[propertyIndex.current].phone}
              </h3>
              <p className="text-center mb-6">
                <span style={{ fontWeight: "bold" }}>
                  {featuredHomes[propertyIndex.current].bed}
                </span>{" "}
                bed |{" "}
                <span style={{ fontWeight: "bold" }}>
                  {featuredHomes[propertyIndex.current].bath}
                </span>{" "}
                bath |{" "}
                <span style={{ fontWeight: "bold" }}>
                  {featuredHomes[propertyIndex.current].sqft}
                </span>{" "}
                sqft
              </p>
               <p className="text-center mb-4">
             {featuredHomes[propertyIndex.current].description}
              </p>
              <p className="text-center mb-4">
             {featuredHomes[propertyIndex.current].address}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopWrapper;
