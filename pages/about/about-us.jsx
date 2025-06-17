import React, { useEffect, useState } from 'react';
import { TextAnimate } from "../../@/components/ui/text-animate";
import { ShinyButton } from "../../@/components/ui/shiny-button";
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CTASection from '../section/CTASection';
import MetaTags from '../../components/MetaTags';
import Head from 'next/head';
import { organizations } from "../../lib/data/schema"

const listItems = [
    "Established in the year 2006, we have been involved in providing quality services in the development and support of some very large mission-critical projects and thus make our presence in the market.",
    "We provide end-to-end enterprise software solutions or specific applications to build your business productivity.",
    "Since our inception, we have successfully implemented more than 900+ projects on different platforms and have served many clients across different geographical locations.",
    "With our low-cost hosting packages and products, we deliver a powerful return on investment and create unmatched value for our customers.",
    "Our dedicated support team is always available to assist and aid you through live chat, phone calls, and email round the clock.",
    "Minima quo voluptate et rerum velit.",
  ]

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
              {"About Us"}
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
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> About</p>
      </div>
      </div>
    

    {/* about us banner sec ends */}

    {/* about who section starts */}

    <section className="home-product-sec">
        <div className="container">
      <div className="row ">
    
        <div className="col-md-6">
        <img src="https://res.cloudinary.com/daggx9p24/image/upload/v1738655255/about-image_cufvgi-removebg-preview_umpxaz.png" alt="" />
        </div>
    
        <div className="col-md-6">
          
        <TextAnimate animation="blurIn" by='words' as='h2'>
        Who We Are?
        </TextAnimate>
        
        <TextAnimate animation="fadeIn" by="line">
          {`Winlicense is a leading global IT solutions provider based in India. Headquarters in Chennai and branches across Germany and Malaysia.  \n\n We provide hosting and other web solutions to enhance small and medium-sized business with 10 years of expertise. \n\n We mould your business website to create a strong web presence with hassle-free and robust infrastructure features. `}
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="line">
          {`Winlicense is a leading global IT solutions provider based in India. \n\n Headquarters in Chennai and branches across Germany and Malaysia. \n\n We provide hosting and other web solutions to enhance small and medium-sized business with 10 years of expertise.  \n\n We mould your business website to create a strong web presence with hassle-free and robust infrastructure features.`}
        </TextAnimate>
       
        </div>
    
      </div>
    </div>
        </section>
        <section className="about-list-sec">
        <div className="about-list-section container">
      <h3 className="about-list-title">Why Choose Us?</h3>
      <ul className="about-list">
        {listItems.map((item, index) => (
          <li key={index} className="fade-in">
            <i className="fa-solid fa-circle-check"></i> {item}
          </li>
        ))}
      </ul>
    </div>
    </section>

    {/* about who section ends */}

        <CTASection />
    </div>
  )
}

export default  AboutUs