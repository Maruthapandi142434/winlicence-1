import React, { useEffect, useState } from 'react';
import { TextAnimate } from "../@/components/ui/text-animate";
import { ShinyButton } from "../@/components/ui/shiny-button";
import Link from 'next/link';
import { FaCheckCircle } from "react-icons/fa";
import CTASection from './section/CTASection';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import MetaTags from '../components/MetaTags';
import { organizations } from "../lib/data/schema"
import Head from 'next/head';


function Service() {
  const services = [
    {
      title: "Lifetime Support",
      description:
        "We offer lifetime support to ensure your services run smoothly without interruption. Our dedicated support team is available 24/7 to assist you with technical issues, answer questions, and guide you through any challenges that may arise.",
      image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738820997/blog-image-1_u55yx8.jpg",
      id:"lifetimesup-getstarted"
    },
    {
      title: "Client Management",
      description:
        "Manage your clients effortlessly with our user-friendly tools designed to streamline communication, track projects, and maintain records. Whether you're a small business or an enterprise, our system adapts to your needs for optimal efficiency.",
      image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738820997/client_management_jqtj79.jpg",
      id:"clientman-getstarted"
    },
    {
      title: "Easy to Use Customer",
      description:
        "Our platform is built with simplicity in mind, allowing customers to easily navigate, manage their accounts, and access the services they need. No technical knowledge required — everything is just a few clicks away.",
      image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738820997/customer_spport_ejgbz9.jpg",
      id:"easytouse-getstarted"
    },
    {
      title: "Hosting Features",
      description:
        "Enjoy a wide range of hosting features including unlimited bandwidth, fast SSD storage, one-click installations, and daily backups. We ensure high performance, reliability, and scalability for your growing business.",
      image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738820997/hosting_feature_j91afi.jpg",
      id:"hosting-getstarted"
    },
    {
      title: "Email Hosting",
      description:
        "Get professional email solutions with custom domain addresses, high-level security, spam protection, and reliable uptime. Perfect for businesses that need secure and professional communication channels.",
      image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738820997/email_hosting_rin2ha.jpg",
      id:"emailhosting-getstarted"
    },
    {
      title: "Powerful Hosting",
      description:
        "Experience powerful hosting designed for speed, security, and performance. Our servers are optimized to handle high traffic and resource-heavy applications without compromising on reliability.",
      image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738820997/powder_hosting_q4dtqg.jpg",
      id:"powerhosting-getstarted"
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const ServiceCard = ({ service }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={controls}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:shadow-xl"
      >
        <div className="relative h-48">
          <Image
            src={service.image}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="filter grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="p-6 service-card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {service.title}
          </h2>
          <p className="text-gray-600 mb-3 text-wrap3">{service.description}</p>
          <div className='service-btn'><Link href="/contact" id={service.id}><ShinyButton >Get Started</ShinyButton></Link></div>
        </div>
        

      </motion.div>
    );
  };

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
              {"Our Services"}
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
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Service</p>
      </div>
      </div>
    


    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16">
      {/* Hero Section */}

      {/* Services Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div>
            <ServiceCard key={index} service={service} />
            </div>
          ))}
          
        </div>
      </motion.div>
    </div>

        <CTASection />
    </div>
  )
}

export default  Service