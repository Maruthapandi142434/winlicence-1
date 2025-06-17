import { motion } from "framer-motion";

const Attributes = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white py-6 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Heading */}

        {/* Grid for Attributes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Card 1: Experienced Team */}
          <motion.div
            variants={fadeInUp}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Experienced Team
            </h3>
            <p className="text-gray-700">
              Our experienced talented Linux & Windows Engineers and web
              designers will create your online and offline masterpiece via
              frequent communication with you to understand your unique vision
              and exactly what you had imagined.
            </p>
          </motion.div>

          {/* Card 2: Flexibility */}
          <motion.div
            variants={fadeInUp}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Flexibility
            </h3>
            <p className="text-gray-700">
              Our Linux & Windows Engineers and Web designers work at your pace
              to make sure you can have the ability to maintain and manage your
              completed website.
            </p>
          </motion.div>

          {/* Card 3: Affordable */}
          <motion.div
            variants={fadeInUp}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Affordable
            </h3>
            <p className="text-gray-700">
              Everything included in every package comes as a onetime fee. Free
              domain registration, free hosting for one year.
            </p>
          </motion.div>

          {/* Card 4: Easy & Efficient */}
          <motion.div
            variants={fadeInUp}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Easy & Efficient
            </h3>
            <p className="text-gray-700">
              Simply fill out our Linux and Windows, web design questionnaire,
              supply your exact requirements and we do the rest! We even train
              you on how to manage and update your servers and website. People
              get good support from us and give good reviews with no complaints
              so far.
            </p>
          </motion.div>
         
        </motion.div>
      </div>
    </div>
  );
};

export default Attributes;