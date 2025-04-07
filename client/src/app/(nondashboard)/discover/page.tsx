import Link from "next/link";
import styles from "./styles/page.module.css";
import Image from "next/image";
import Img1 from "./images/bath.jpg";
import Img2 from "./images/hotel.jpg";
import Img3 from "./images/2.jpg";
import Img4 from "./images/8.jpg";
import Img5 from "./images/1.jpg";
import Img6 from "./images/10.jpg";
import Img7 from "./images/lobby1.jpg";
import Img8 from "./images/lobby2.jpg";
import Img9 from "./images/lobby3.jpg";
import Img10 from "./images/sauna.jpg";
import Img12 from "./images/outdoor.jpg";
import Img13 from "./images/3.jpg";
import Img14 from "./images/4.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { featuredHomes } from "./components/FeaturedHomes";

export default function Home() {
  const preferences = [
    {
      img: Img3,
      desc: "Buying"
    }, {
      img: Img4,
      desc: "Selling"
    }, {
      img: Img5,
      desc: "Renting"
    }, {
      img: Img6 ,
      desc: "Leasing"
    }
  ];

  const featuredStyles2 = [
    {
      img1: Img8,
      img2: Img7,
      desc: "Apartments"
    },
  
    {
      img1: Img10,
      img2: Img9,
      desc: "Condos"
    },
    {
      img1: Img3,
      img2: Img12,
      desc: "Vacation Homes"
    },
  ];

 

  return (
    <>
      

      <div className={styles.welcome_container}>
          <Image
              src={Img1}
              alt="Welcome Image 1"
              placeholder="blur"
              quality={100}
          />
          <Image
              src={Img2}
              alt="Welcome Image 2"
              placeholder="blur"
              quality={100}
          />
          <div className={styles.overlay}>
              <div className={styles.welcome_description}>
                  <h1>LIGHTEN UP</h1> 
                  <p>Bigger, bolder and better than ever! The biggest trend in homes and home design is proof that sometimes more is more.</p>
                  <button>BROWSE NOW</button>
              </div>
          </div>
      </div>

      <div className={`${styles.short_desc} short_desc`}>
        <h2>Start Your Home Journey</h2>
        <p>Discover curated Homes to find your perfect fit</p>
      </div>

      <div className={styles.featured_styles}>
        {
          preferences.map((preference, index)=>
            <Link key={index} href="/search" className={styles.featured_style}>
              <Image
                  src={preference.img}
                  alt={`Featured Image ${index}`}
                  placeholder="blur"
                  quality={40}
              />
              <div className={styles.overlay}>
                <h1>{preference.desc}</h1>
              </div>
          </Link>
          )
        }
      </div>

      <div className={`${styles.short_desc} short_desc`}>
        <h2>What are you interested in?</h2>
        <p>From subtle elegance to bold statements.</p>
      </div>

      <div className={`${styles.featured_styles} ${styles.featured_styles_second}`}>
        {
          featuredStyles2.map((featuredStyle, index)=>
            <Link key={index} href="/search" className={`${styles.featured_style} ${styles.big_feature}`}>
              <Image
                src={featuredStyle.img1}
                alt="Lobby Image 1"
                placeholder="blur"
                quality={40}
              />
              <Image
                src={featuredStyle.img2}
                alt="Lobby Image 2"
                placeholder="blur"
                quality={40}
              />

              <div className={styles.overlay}>
                <h1>{featuredStyle.desc}</h1>
                <button>Browse</button>
              </div>
            </Link>
          )
        }
      </div>

     
      <div className={`${styles.short_desc} short_desc`}>
        <h2>Featured Houses for Sale</h2>
        <p>Check out some of our featured homes available for purchase or rent</p>
      </div>

      <div className={`${styles.search_results} search_results`}>
        {
          featuredHomes.map((home, index)=>
            <div key={index} className={`${styles.search_result} search_result`}>
              <Link href={`/discover/property-${index + 1}`} className={styles.search_result_image_container}>
                <Image
                  src={home.img1}
                  alt="Lobby Image 2"
                  placeholder="blur"
                  quality={40}
                />
                <Image
                  src={home.img2}
                  alt="Lobby Image 2"
                  placeholder="blur"
                  quality={40}
                />
                <div className={styles.image_overlay_info}>
                  <p>{home.time_posted} days ago</p>
                </div>
              </Link>
              <h3>${home.price}</h3>
              
              <div className={`${styles.bottom_section} bottom_section`}>
                <p><span style={{fontWeight: "bold"}}>{home.bed}</span> beds | <span style={{fontWeight: "bold"}}>{home.bath}</span> ba | <span style={{fontWeight: "bold"}}>{home.sqft}</span> sqft - {home.specification}</p>
               
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}
