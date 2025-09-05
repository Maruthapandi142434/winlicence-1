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
import { contactProduct } from '../lib/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertFormData, setExpertFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [isExpertSubmitting, setIsExpertSubmitting] = useState(false);

  useEffect(() => {
    // Ensures code runs only on the client-side
    setIsClient(true);
  }, []);

  // Expert consultation form handlers
  const handleExpertSubmit = async (e) => {
    e.preventDefault();
    setIsExpertSubmitting(true);

    const formData = {
      name: expertFormData.name,
      email: expertFormData.email,
      phone: '',
      company: '',
      message: expertFormData.query,
      subject: {
        title: 'Expert Consultation Request',
        price: 'N/A',
        description: 'Request for expert consultation',
        category: 'Consultation',
      },
    };

    try {
      await contactProduct(formData);
      toast.success('Your consultation request has been sent! Our expert will contact you soon.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setShowExpertModal(false);
      setExpertFormData({ name: '', email: '', query: '' });
    } catch (error) {
      console.error('Error submitting expert consultation:', error);
      toast.error('Failed to send consultation request. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsExpertSubmitting(false);
    }
  };

  const handleExpertFormChange = (field, value) => {
    setExpertFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
      <div className="w-full h-[80vh] rounded-md flex md:items-center md:justify-center home-banner-sec">
        <div className="container p-0">
          <div className="row px-2 py-4 md:p-1 max-w-7xl mx-auto relative z-10  w-full pt-30 ">
            <div className="col-12 col-md-12 text-center">
            <div className="hero-content max-w-6xl mx-auto text-center space-y-4 ">
            <TextAnimate
  animation="slideLeft"
  by="words"
  className=" text-center text-3xl md:text-5xl font-bold bg-clip-text text-blue-700 bg-gradient-to-b from-neutral-50 to-neutral-400"
>
  {"Empower Your Business with"} <br />
  {"an Authorized Microsoft Partner"}
</TextAnimate>


  <div className="text-lg md:text-xl text-yellow-700 max-w-3xl mx-auto leading-relaxed">
    Buy genuine Microsoft products in Chennai with WinLicense. Flexible monthly,
    yearly & perpetual licenses for Windows Server, SQL Server, and Windows 11
    & more at an affordable cost.
  </div>

  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
    <Link
      href="/contact"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      Request a Quote
    </Link>
    <button
      onClick={() => setShowExpertModal(true)}
      className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-base transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      Talk to an Expert
    </button>
  </div>
</div>

            </div>
          </div>
        </div>
        </div>
      </section>
      <ClientSlider />
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

    {/* Expert Consultation Modal */}
    {showExpertModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Talk to an Expert</h2>
            <button
              onClick={() => setShowExpertModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleExpertSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={expertFormData.name}
                  onChange={(e) => handleExpertFormChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isExpertSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={expertFormData.email}
                  onChange={(e) => handleExpertFormChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isExpertSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Query *
                </label>
                <textarea
                  value={expertFormData.query}
                  onChange={(e) => handleExpertFormChange('query', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Please describe your requirements or questions..."
                  required
                  disabled={isExpertSubmitting}
                />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={() => setShowExpertModal(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition-colors"
                disabled={isExpertSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                disabled={isExpertSubmitting}
              >
                {isExpertSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </div>
    
  );
}

export default Index;

