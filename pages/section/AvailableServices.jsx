import React from "react";
import { motion } from "framer-motion";
import { TextAnimate } from "../../@/components/ui/text-animate";
const services = [
  {
    title: "Lifetime Support",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648933/blog-image-1_wlgj8a.jpg",
    id: "lifetimesup-getstarted"
  },
  {
    title: "Client Management",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/client_management_mcwviw.jpg",
    id: "clientman-getstarted"
  },
  {
    title: "Easy to Use Customer",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/customer_spport_gyisbf.jpg",
    id: "easytouse-getstarted"
  },
  {
    title: "Hosting Features",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/hosting_feature_ja9xlv.jpg",
    id: "hosting-getstarted"
  },
  {
    title: "Email Hosting",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648934/email_hosting_omfyzy.jpg",
    id: "emailhosting-getstarted"
  },
  {
    title: "Powerful Hosting",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738648933/powder_hosting_tby12o.jpg",
    id: "powerhosting-getstarted"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AvailableServices;
