import React, { useEffect, useState } from 'react';
import { TextAnimate } from "../../@/components/ui/text-animate";
import { ShinyButton } from "../../@/components/ui/shiny-button";
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CTASection from '../section/CTASection';
import MetaTags from '../../components/MetaTags';
import { organizations } from "../../lib/data/schema"
import Head from 'next/head';
function BusinessModels() {
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
              {"business-models"}
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
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Business Models</p>
      </div>
      </div>
    

    {/* about us banner sec ends */}

    {/* about who section starts */}

    <section className="home-product-sec">
        <div className="container">
      <div className="row ">
      <div className="col-md-6">
          
          <TextAnimate animation="blurIn" as='h2' by='words'>
          Business Models
          </TextAnimate>
          
          <TextAnimate animation="fadeIn" by="line">
            {`Sixth Star Technologies utilizes time tested and perfect business models to effectively deliver solutions in line with client necessities. \n\n We follow only the best strategies and policies to offer the right business models for our diverse range of clients. \n\n Sometimes, clients do not have a picture of the right business model in their minds. `}
          </TextAnimate>
          <TextAnimate animation="fadeIn" by="line">
            {`At this juncture, we recommend the right business model after we carefully inspect the strategy required to execute the project, \n\n the resources needed to allot to the project and the amount of time that will be spent on it \n\n Accordingly, we advise the client to utilize one of the following models.`}
          </TextAnimate>
         
          </div>
    
        <div className="col-md-6">
        <img src="https://res.cloudinary.com/daggx9p24/image/upload/v1738758094/business-image_ncaa50.png" alt="" />
        </div>
    
        
    
      </div>
    </div>
        </section>
        <section className="about-list-sec">
        <div className="about-list-section container">
      <h3 className="about-list-title text-left">Predetermined Price Approach</h3>
      <TextAnimate animation="fadeIn" by="line">
            {`If the system requirements are clearly defined at the outset, then this is the ideal option that can be taken up by the client. \n\n At SixthStar, we quote a specific price within which we carry out the entire project development \n\n This option provides a low risk alternative for the client as we guarantee the delivery of the project on time within the budget limits as specified by the client. \n\n This model logically explains the costs involved and deliverables to be expected \n\n For any changes that can occur later during the project execution, the client is charged a rate that has been previously discussed and negotiated upon.`}
          </TextAnimate>
    </div>
    </section>

    <section className="about-list-sec">
        <div className="about-list-section container">
      <h3 className="about-list-title text-left">Time and Material Approach</h3>
      <TextAnimate animation="fadeIn" by="line">
            {`Sometimes, it happens that the client is not sure or it is not so easy to define the scope and the specification of the project at the initial phase. \n\n In this case, the time and material approach becomes the right option. \n\n Under this option, the client pays according to the number of man-hours that are put into the project. \n\n Later on, if the scope and project specifications are determined then the fixed priced approach can be selected. \n\n We thoroughly ensure complete transparency to report the exact number of hours that we dedicate to your project and still no complaints and good reviews from the customer.`}
          </TextAnimate>
    </div>
    </section>

    {/* about who section ends */}

        <CTASection />
    </div>
  )
}

export default  BusinessModels