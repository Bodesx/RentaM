"use client";

import styles from "./styles/houseDetailsPage.module.css";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import QuestionsSection from "./components/QuestionsSection";
import { notFound } from "next/navigation";
import { featuredHomes } from "../components/FeaturedHomes";
import * as React from 'react';
import { Phone } from "lucide-react";
import PopWrapper from "./components/popup";
import HeroVideoDialogDemo from "./components/videoff";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
  } from 'react-icons/fa';





export default function HouseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrap the params promise using React.use()
    const { slug } = React.use(params);

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
             <main className='p-3 flex flex-col max-w-4xl mx-auto min-h-screen'>

 <div className={`${styles.first_section} first_section `}>
                    <div className={styles.first}>
                        
                        <div className={styles.slider} ref={sliderRef}>
                            
                            {
                                featuredHomes[propertyIndex.current].carousel_images.map((image,index)=>(
                                    <div key={index} 
                                        className={styles.img}
                                    >
                                    <Image
                                        src={image}
                                        alt="Placeholder Image"
                                        placeholder="blur"
                                        quality={100}                                     
                                    />
                                    </div>
                                ))
                            }
                            
                        </div>
                      <div style={{ textAlign: "center", margin: "20px" }}>

                    </div>
                        <a className={styles.prev}
                            onClick={()=>{
                                slideLeft();
                            }}
                        >&#10094;
                        </a>
                        <a className={styles.next}
                            onClick={()=>{
                                slideRight();
                            }}
                        >&#10095;
                        </a> 
                    </div>

                   
    
       <div className={`${styles.extra_info} extra_info`}>
                            <div className="pb-9">
 <HeroVideoDialogDemo/>
                    </div>
                       <ul className='text-green-200 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBed className='text-lg' />
                 <span className='text-lg'>{featuredHomes[propertyIndex.current].bed}</span>
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBath className='text-lg' />
                  <span className='text-lg'>{featuredHomes[propertyIndex.current].bath}</span>
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaParking className='text-lg' />
                  <span className='text-lg'>{featuredHomes[propertyIndex.current].pool}</span>
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaChair className='text-lg' />
                  <span className='text-lg'>{featuredHomes[propertyIndex.current].furnished}</span>
                </li>
                   <li className='flex items-center gap-1 whitespace-nowrap '>
                 <PopWrapper />
                </li>
              </ul>
        <h3 className=" justify-items-center pb-9">{featuredHomes[propertyIndex.current].description}</h3>
                  </div>

   <Tabs  defaultValue="model" className="">
  <TabsList>
    <TabsTrigger value="size">Size</TabsTrigger>
    <TabsTrigger value="specification">Specification</TabsTrigger> 
    <TabsTrigger value="Address">Address</TabsTrigger>

  </TabsList>
  <TabsContent value="size">{featuredHomes[propertyIndex.current].sqft} Square Feet</TabsContent>
  <TabsContent value="specification"> <h3>{featuredHomes[propertyIndex.current].specification}</h3></TabsContent> 
    <TabsContent value="Address"> <p style={{ textAlign: "center", margin: "10px" }}><FontAwesomeIcon icon={faLocationDot} /> {featuredHomes[propertyIndex.current].address}</p></TabsContent>   
</Tabs>
                     
                </div>

              
                  
    
                <QuestionsSection slug={JSON.stringify(featuredHomes[propertyIndex.current])}/>
                 
            </main>
        );
    }
}

