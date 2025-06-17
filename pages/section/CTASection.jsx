import React from "react";
import { motion } from "framer-motion"; // For animation
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // Right arrow icon

const CTASection = () => {
  return (
    <motion.div
      className="cta-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="cta-content">
        <h2>Server builds on the strengths of Microsoft Products</h2>
        <div className="cta-button-wrapper">
          <FaArrowRight className="cta-arrow" />
          <Link href="/contact" className="cta-button" id="cta-sec-button">
            Contact Us
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CTASection;
