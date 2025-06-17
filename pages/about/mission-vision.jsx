import React, { useEffect, useState } from 'react';
import { TextAnimate } from "../../@/components/ui/text-animate";
import { ShinyButton } from "../../@/components/ui/shiny-button";
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CTASection from '../section/CTASection';
import  MissionListsec  from '../section/MissionListsec';
import  VisionListsec  from '../section/VisionListsec';
import MetaTags from '../../components/MetaTags';
import Head from 'next/head';
import { organizations } from "../../lib/data/schema"
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
function AboutUs() {
  return (
    <div>
      <Head>
      <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( organizations ) }}
            />
      </Head>
<MetaTags />
    {/* about us banner sec starts */}
    <section className="com-banner-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-60">
            <TextAnimate animation="slideLeft" by="words" className='home-head-1'>
              {"Mission & Vision"}
          </TextAnimate>

            <TextAnimate animation="slideLeft" by="words" className='home-head-2'>
              {"Microsoft Products"}
          </TextAnimate>
          </div>
         
        </div>
      </div>
      
    </section>
    <div className="about-section">
      <div className="about-header">
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Mission & Vision</p>
      </div>
      </div>
    

    {/* about us banner sec ends */}

    {/* about who section starts */}



    {/* about who section ends */}
<section className="mission-sec">
<div className="container">
  <div className="row mission-con">
 <div className="col-md-6 ">
       <img src="https://res.cloudinary.com/daggx9p24/image/upload/v1738665909/mission-image_i7zklz.png" alt="" />
        </div>

         <div className="col-md-6">
                  
                <TextAnimate animation="blurIn" as='h2'>
                Mission
                </TextAnimate>
                <div className="mission-block">
                <MissionListsec />
                </div>
                </div>
    </div>
  </div>
</section>

<section className="vision-sec">
<div className="container">
  <div className="row mission-con">
  <div className="col-md-6">
                  
                  <TextAnimate animation="blurIn" as='h2'>
                  Vision
                  </TextAnimate>
                  <div className="mission-block">
                  <VisionListsec />
                  </div>
                  </div>
 <div className="col-md-6 ">
       <img src="https://res.cloudinary.com/daggx9p24/image/upload/v1738665908/vission-image_ojktqf.png" alt="" />
        </div>


    </div>
  </div>
</section>
        <CTASection />
    </div>
  )
}

export default  AboutUs