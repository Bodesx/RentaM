import { HeroVideoDialog } from "./videopi";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { featuredHomes } from "../../components/FeaturedHomes";
import * as React from 'react';
import { Phone } from "lucide-react";



const HeroVideoDialogDemo = () => {
  const params = useParams();
  const slug = params.slug as string;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const slideValueResized = useRef<string | undefined>("0");
    const slideValue = useRef<string | undefined>("0");

    // Use the unwrapped slug here instead of params.slug
    const propertyIndex = useRef((parseInt(slug.split("-")[1]) - 1));

    function slideImage(e: React.MouseEvent<HTMLElement>, index: number){
        setSelectedIndex(index);
        sliderRef.current!.style.transition = 'all 0.7s';

        if (e !== null && e.target instanceof HTMLElement) {
            slideValueResized.current = e.target.dataset.left2;
            slideValue.current = e.target.dataset.left;

            if(sliderRef.current !== null){
                if(window.innerWidth <= 700){
                    sliderRef.current.style.left = `-${e.target.dataset.left2}vw`;
                }else{
                    sliderRef.current.style.left = `-${e.target.dataset.left}vw`;
                }
            }
        }
    }

    function slideRight(){
        if(selectedIndex === featuredHomes[propertyIndex.current].carousel_images.length - 1){
            sliderRef.current!.style.transition = 'unset';
            sliderRef.current!.animate([{opacity:'0.2'},{opacity:"1.0"}],{duration:500,fill:'forwards'});
            sliderRef.current!.style.left = `0vw`;
            slideValue.current = "0";
            setSelectedIndex(0);
        }else{
            sliderRef.current!.style.transition = 'all 0.7s';
            setSelectedIndex(prevState => prevState + 1);

            if(sliderRef.current !== null){
                if(window.innerWidth <= 700){
                    sliderRef.current.style.left = `-${(selectedIndex + 1) * 100}vw`;
                    slideValue.current = ((selectedIndex + 1) * 100).toString();
                }else{
                    sliderRef.current.style.left = `-${(selectedIndex + 1) * 70}vw`;
                    slideValue.current = ((selectedIndex + 1) * 70).toString();
                }
            }
        }
    }

    function slideLeft(){
        if(selectedIndex === 0){
            sliderRef.current!.style.transition = 'unset';
            sliderRef.current!.animate([{opacity:'0.2'},{opacity:"1.0"}],{duration:500,fill:'forwards'});
            if(window.innerWidth <= 700){
                sliderRef.current!.style.left = `-${(featuredHomes[propertyIndex.current].carousel_images.length - 1) * 100}vw`;
                slideValue.current = ((featuredHomes[propertyIndex.current].carousel_images.length - 1) * 100).toString();
            }else{
                sliderRef.current!.style.left = `-${(featuredHomes[propertyIndex.current].carousel_images.length - 1) * 70}vw`;
                slideValue.current = ((featuredHomes[propertyIndex.current].carousel_images.length - 1) * 70).toString();
            }
            setSelectedIndex(featuredHomes[propertyIndex.current].carousel_images.length - 1);
        }else{
            sliderRef.current!.style.transition = 'all 0.7s';
            setSelectedIndex(prevState => prevState - 1);

            if(sliderRef.current !== null){
                if(window.innerWidth <= 700){
                    sliderRef.current.style.left = `-${(selectedIndex - 1) * 100}vw`;
                    slideValue.current = ((selectedIndex - 1) * 100).toString();
                }else{
                    sliderRef.current.style.left = `-${(selectedIndex - 1) * 70}vw`;
                    slideValue.current = ((selectedIndex - 1) * 70).toString();
                }
            }
        }
    }

    function handleResize(){
        if(sliderRef.current !== null){
            if(window.innerWidth <= 700){
                sliderRef.current.style.left = `-${slideValueResized.current}vw`;
            }else{
                sliderRef.current.style.left = `-${slideValue.current}vw`;
            }
        }
    }

    useEffect(() => {
        if(sliderRef.current !== null){
          window.addEventListener('resize', handleResize);
        }
    }, []);

    if((parseInt(slug.split("-")[1])) > featuredHomes.length){
        notFound();
    } else {
        return (













  

    <div className="relative">
   
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc= {featuredHomes[propertyIndex.current].url}
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
       <HeroVideoDialog
              className="hidden dark:block"
              animationStyle="from-center"
              videoSrc={featuredHomes[propertyIndex.current].url}
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            />
    </div>
  );
}}

export default HeroVideoDialogDemo;