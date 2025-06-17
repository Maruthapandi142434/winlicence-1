import React, { useEffect, useState } from 'react';
import { TextAnimate } from "../../@/components/ui/text-animate";
import { ShinyButton } from "../../@/components/ui/shiny-button";
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CTASection from '../section/CTASection';
import Attributes from '../section/Attributes'
import MetaTags from '../../components/MetaTags';
import Head from 'next/head';
import { organizations } from "../../lib/data/schema"
const listItems = [
    "Having the latest in web design technologies packaged for absolute success",
    "Offering online marketing (SEO) that’s on target and on time",
    "Linux & Windows server supports and Services for all type of customers in Global",
    "Nurturing a reliable technology partnership with every client of every size",
    "Developing outsourcing solutions that stand up to the competition",
  ]

function WhyMicrosoft() {
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
              {"Why Microsoft?"}
          </TextAnimate>

            <TextAnimate animation="slideLeft" by="words" className='home-head-2 '>
              {"Microsoft Products"}
          </TextAnimate>
          </div>
         
        </div>
      </div>
      
    </section>
    <div className="about-section">
      <div className="about-header">
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Why Microsoft</p>
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
          
        <TextAnimate animation="blurIn" as='h2' by='words'>
        Why Microsoft?
        </TextAnimate>
        
        <TextAnimate animation="fadeIn" by="line">
          {`It’s our promise to make your business look good by using a latest IT Technology with cost Effective - ROI. `}
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="line">
          {`We understand that you could be concerned about why you should utilize our services for your requirements. \n\n  It is but natural that you logically put these questions to yourself.   \n\n In an era where there are many others out there offering similar services claiming similar advantages, it is worth considering the following points.`}
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="line">
          {`What really makes Sixth Star Technologies special is our people-oriented culture, practices, a friendly and concerted atmosphere that exists in our office.`}
        </TextAnimate>
       
        </div>
    
      </div>
    </div>

        </section>
        <section className="about-list-sec">
        <div className="about-list-section container">
      <h3 className="about-list-title">Services</h3>
      <Attributes />
      <div className="row">
        <div className="col-md-6">

        </div>
        <div className="col-md-6">
          
        </div>
      </div>
      <TextAnimate animation="fadeIn" by="line" className='pl-5'>
          {`Our solutions portfolio, where we're located and what makes Sixth Star Technologies different from other technology companies \n\n Sixth Star Technologies have an unflinching dedication to giving the best hosting items accessible and premium client support and clients is always used to support for us without any complaints and give good reviews about the site.`}
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="line" className='pl-5'>
          {`Our extensive products, supports and services offering delivers a powerful return on investment and creates unmatched value for our customers by,`}
        </TextAnimate>
        <br/>
        <TextAnimate animation="fadeIn" by="line" className='pl-5'>
          {`SixthStar Technologies exceed the expectations of our client base
              for all types of companies. The company’s team of highly skilled
              talent is experienced at providing on- and off-site dedicated
              product development, support centre services, rigorous project
              management, flexible pricing, legacy application maintenance,
              middleware development, and data warehousing. To know more about
              our service information, contact us immediately.,`}
        </TextAnimate>
        <br/>

      <ul className="about-list p-2">
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

export default  WhyMicrosoft