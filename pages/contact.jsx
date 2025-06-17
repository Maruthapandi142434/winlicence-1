import { motion } from "framer-motion";
import Image from "next/image";
import { TextAnimate } from "../@/components/ui/text-animate";
import Link from "next/link";
import ContactUsForm from "./form/ContactUsForm";
import MetaTags from "../components/MetaTags";
import { organizations } from "../lib/data/schema"
import Head from "next/head";

const Contact = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
    <Head>
    <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( organizations ) }}
            />
    </Head>
    <MetaTags  />
    <div className="bg-gray-50 py-16">
      {/* Hero Section */}
      <section className="com-banner-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-60">
            <TextAnimate animation="slideLeft" by="words" className='home-head-1'>
              {"Contact Us"}
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
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Contact</p>
      </div>
      </div>

      {/* Contact Details and Map */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Our Office
            </h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="text-2xl text-blue-600">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">
                  1st Floor, No.3 & 4, Siri Towers, Fourrts Ave, Annani Indira Nagar, Muttukkaranchavadi, Thoraipakkam, Chennai, Tamilnadu, India – 600 097.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="text-2xl text-blue-600">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                 <p> <Link href='tel:9962107399' className="text-gray-600">+91 99621 07399</Link></p>
                 <p> <Link href='tel:9383996666' className="text-gray-600">+91 9383996666</Link></p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="text-2xl text-blue-600">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@sixthstar.in</p>
                  <p className="text-gray-600">sales@sixthstar.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31109.296778845193!2d80.23349700000001!3d12.929426!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1105717f8fe239c9%3A0x45c0f6cf503fc3ea!2sSixth%20Star%20Technologies%20-%20Web%20Hosting%20company%20in%20Chennai!5e0!3m2!1sen!2sin!4v1738828820903!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mt-12 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Let’s Get in Touch
          </h2>
          <ContactUsForm />
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Contact;