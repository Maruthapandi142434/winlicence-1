import React from "react";
import { motion } from "framer-motion";
import { TextAnimate } from "../../@/components/ui/text-animate";
const services = [
  {
    title: "Lifetime Support",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648933/blog-image-1_wlgj8a.jpg",
    // features: [
    //   "30 Day Money Back Guarantee",
    //   "24x7x365 Support",
    //   "Dual Quad-Core Powered Servers hardware",
    // ],
  },
  {
    title: "Client Management",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/client_management_mcwviw.jpg",
    // features: [
    //   "30 Day Money Back Guarantee",
    //   "24x7x365 Support",
    //   "Dual Quad-Core Powered Servers hardware",
    // ],
  },
  {
    title: "Easy to Use Customer",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/customer_spport_gyisbf.jpg",
    // features: [
    //   "30 Day Money Back Guarantee",
    //   "24x7x365 Support",
    //   "Dual Quad-Core Powered Servers hardware",
    // ],
  },
  {
    title: "Hosting Features",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/hosting_feature_ja9xlv.jpg",
    // features: [
    //   "30 Day Money Back Guarantee",
    //   "24x7x365 Support",
    //   "Dual Quad-Core Powered Servers hardware",
    // ],
  },
  {
    title: "Email Hosting",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/email_hosting_omfyzy.jpg",
    // features: [
    //   "30 Day Money Back Guarantee",
    //   "24x7x365 Support",
    //   "Dual Quad-Core Powered Servers hardware",
    // ],
  },
  {
    title: "Powerful Hosting",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648933/powder_hosting_tby12o.jpg",
    // features: [
    //   "30 Day Money Back Guarantee",
    //   "24x7x365 Support",
    //   "Dual Quad-Core Powered Servers hardware",
    // ],
  },
];

const AvailableServices = () => {
  return (
    <div className="services-container max-w-7xl mx-auto">
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={service.image} alt={service.title} className="service-image" />
            <h3 className="service-title text-center">{service.title}</h3>
            {/* <ul className="service-list">
              {service.features.map((feature, i) => (
                <li key={i}><i className="fa-regular fa-square-check"></i><TextAnimate animation="fadeIn" by="line">
                {feature}
              </TextAnimate> </li>
              ))}
            </ul> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AvailableServices;
