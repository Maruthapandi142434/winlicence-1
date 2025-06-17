import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import fadeIn from 'react-animations/lib/fade-in';
import slideInUp from 'react-animations/lib/slide-in-up';
import slideInDown from 'react-animations/lib/slide-in-down';
import tada from 'react-animations/lib/tada';
import zoomInDown from 'react-animations/lib/zoom-in-down';
import slideInLeft from 'react-animations/lib/slide-in-left';
import { TextAnimate } from "../@/components/ui/text-animate";
import { ShinyButton } from "../@/components/ui/shiny-button";
import Link from 'next/link';
import ProductFeatures from './section/ProductFeatures';
import StatsSection from './section/Counter'
import  Homeproducts from './section/Homeproducts'
import { motion } from "framer-motion";
import AvailableServices from './section/AvailableServices';
import Testimonials from './section/Testimonials';
import Client from './section/Client';
import MetaTags from '../components/MetaTags';
import ClientSlider from './section/ClientSlider';
import ProductGrid from './section/product-grid'
import { HomeLocalSchema, organizations } from '../lib/data/schema'
import Head from 'next/head';

const styles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '2s',
  },
  slideInUp: {
    animationName: slideInUp,
    animationDuration: '2s',
  },
  slideInDown: {
    animationName: slideInDown,
    animationDuration: '2s',
  },
  tada: {
    animationName: tada,
    animationDuration: '15s',
  },
  zoomInDown: {
    animationName: zoomInDown,
    animationDuration: '4s',
  },
  slideInLeft: {
    animationName: slideInLeft,
    animationDuration: '4s',
  },
});

function Index() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures code runs only on the client-side
    setIsClient(true);
  }, []);

  return (
    <div>
      <Head>
      <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( HomeLocalSchema ) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( organizations ) }}
            />
      </Head>
      <MetaTags />
      {/* home banner sec starts */}
      <section className="">
      <div className="w-full rounded-md flex md:items-center md:justify-center home-banner-sec">
        <div className="container p-0">
          <div className="row px-2 py-4 md:p-1 max-w-7xl mx-auto relative z-10  w-full pt-30 ">
            <div className="col-12 col-md-5 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 p-0 bg-opacity-60 align-content-center">
              {/* <h1 className={isClient ? css(styles.slideInUp) : ''}>We Provide Best</h1> */}
              <TextAnimate animation="slideLeft" by="words" className='home-head'>
  {"We Provide Best"}
</TextAnimate>

<TextAnimate animation="slideLeft" by="words" className='home-head2 '>
  {"Microsoft Products"}
</TextAnimate>
<div className="but font-normal text-base text-neutral-300 max-w-lg text-left ">
            <div className='but-1'> <Link href="contact" className='text-black' ><ShinyButton id='hm-top-contactus'> Contact Us</ShinyButton></Link></div>
            <div className='but-2'><Link href="#products"><ShinyButton id='getstarted'>Get Started</ShinyButton></Link></div>
            </div>
            </div>
              <div className="col-12 col-md-7">
              <ClientSlider />
              </div>
          </div>
        </div>
        </div>
      </section>
      {/* home banner sec ends */}

          {/* home product sec ends */}


    {/* home products section starts */}

    {/* home product sec starts */}
  <section className="home-product-sec" id='products'>
  <ProductGrid />
</section>


    <section className="home-cta">
    <StatsSection />
    </section>

    {/* home product sec ends */}

    {/* home product sec starts */}
    <section className="home-feat-sec">
      <div className="container">
        <div className="row home-feat">
          <div className="col-12">
            <h2>
            <TextAnimate animation="scaleUp" by="text">
            Products Features
    </TextAnimate>
            </h2>
          
            <ProductFeatures />
          </div>
        </div>
      </div>
    </section>



    {/* home cta section starts */}

    <section className="home-cta">
    <div className="cta-container">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="cta-heading">REQUEST A CALLBACK OR SEND MAIL</h2>
        <a href="/contact" className="home-cta-button" id='hm-mid-contactus'>
          Contact Us
        </a>
      </motion.div>
    </div>
    </section>
    {/* home cta section ends */}

    {/* home services section starts */}

    <section className="home-services-sec">
    <div className="container">
        <div className="row home-services">
          <div className="col-12">
          <TextAnimate animation="scaleUp" by="text" as='h2'>
          Available Services
    </TextAnimate>

    <AvailableServices />
          </div>
        </div>
      </div>
    </section>

    {/* home serbices section ends */}

    {/* home testimonial section starts */}

    <section className="home-testi-sec">
    <div className="container">
        <div className="row home-testi">
          <div className="col-12">
          
    <Testimonials />

          </div>
        </div>
        </div>
    </section>

    {/* home testimonial section ends */}

    </div>
    
  );
}

export default Index;

