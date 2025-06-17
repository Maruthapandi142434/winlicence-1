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
    "We use to make flexible policies for faster growth of our internal working environment as well as our external outsourcing business.",
    "Our processes and methods are easy to implement and for optimum utilization of company resources.",
    "Our Methodology of depicted services are well coped up with client demands as they are very elastic.",
    "Appropriate combination between fix methodological rules and flexible aspects of company rules in providing outsourcing services.",
  ]

function Methodology() {
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
              {"Methodology"}
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
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Methodology</p>
      </div>
      </div>
    

    {/* about us banner sec ends */}

    {/* about who section starts */}

    <section className="home-product-sec">
        <div className="container">
      <div className="row ">
    
        <div className="col-md-6 text-center">
        <img src="https://res.cloudinary.com/daggx9p24/image/upload/v1738758590/cogged-wheels-gear-mechanism-schema-poster_lfymp0.png" alt="" width={520} height={500} />
        </div>
    
        <div className="col-md-6">
          
        <TextAnimate animation="blurIn" as='h2'>
            Methodology
        </TextAnimate>
        
        <TextAnimate animation="fadeIn" by="line">
          {`Sixth Star Technologies methodology as an alternate delivery process, based on response and feedback received from clients. \n\n In this methodology, once the preliminary requirements are clarified, a suitable project team is allocated for the project. \n\n The next step is to quickly build the prototype of the products. From then on, \n\n  it is the continuing evolution of this prototype until it becomes the final product, fitting exactly to the needs of the client. `}
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="line">
          {`Sixthstar has been, since its first day, dedicated to defining projects through comprehensive functional and technical specifications. \n\n Anyway, we realize the importance of keeping the right balance between the competing demands of a rigorous process and the present day software scenario.`}
        </TextAnimate>
       
        </div>
    
      </div>
    </div>
        </section>
        <section className="about-list-sec">
        <div className="about-list-section container">
        <TextAnimate animation="fadeIn" by="line">
          {`Our process is focused on making the right product using the right technologies. \n\n The product has to be delivered on time and on budget. Therefore to ensure the timely and quality delivery for 100% client satisfaction we implement the following:`}
        </TextAnimate>
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

export default  Methodology