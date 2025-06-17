import React, { useEffect, useState } from 'react';
import { TextAnimate } from "../../@/components/ui/text-animate";
import Link from 'next/link';
import CTASection from '../section/CTASection';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import MetaTags from '../../components/MetaTags';
import Head from 'next/head';
import { organizations } from "../../lib/data/schema"

const faqs = [
    {
      question: "What services does Sixth Star provide?",
      answer:
        "We offer web hosting, domain registration, cloud solutions, and enterprise email services to businesses of all sizes.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us via email at support@sixthstar.in or call us at our 24/7 customer support helpline.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we provide a 7-day free trial on selected hosting plans. Contact our sales team for more details.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, net banking, and UPI payments.",
    },
    {
      question: "Can I upgrade my hosting plan later?",
      answer:
        "Yes, you can upgrade your hosting plan anytime without downtime.",
    },
  ];

function FaQ() {

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
            <TextAnimate animation="slideLeft" by="character" className='home-head-1'>
              {"FREQUENTLY ASK QUESTION"}
          </TextAnimate>

            <TextAnimate animation="slideLeft" by="character" className='home-head-2'>
              {"Microsoft Products"}
          </TextAnimate>
          </div>
         
        </div>
      </div>
      
    </section>
    <div className="about-section">
      <div className="about-header">
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Faq</p>
      </div>
      </div>
    

    {/* about us banner sec ends */}

    {/* about who section starts */}

  <section className="faq p-5">
  <div className="faq-container container">
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} className="faq-item" value={`faq-${index}`}>
            <AccordionTrigger className="faq-trigger">
              {faq.question}
              <ChevronDown className="faq-icon" />
            </AccordionTrigger>
            <AccordionContent className="faq-content">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>

    {/* about who section ends */}

        <CTASection />
    </div>
  )
}

export default  FaQ