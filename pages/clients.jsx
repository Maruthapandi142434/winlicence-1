import { motion } from "framer-motion";
import Image from "next/image";
import { TextAnimate } from "../@/components/ui/text-animate";
import Link from "next/link";
import MetaTags from "../components/MetaTags";
import Head from "next/head";
import { organizations } from "../lib/data/schema"

const Clients = () => {
  const clients = [
    { id: 1, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654112/voltech_enginner_d5wb5u_tkcfu7.webp", name: "Vol tech" },
    { id: 2, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654112/velammal_anzfkq_odyaqm.webp", name: "velammal" },
    { id: 3, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654111/vecura_uuxnb4_gwwqmq.webp", name: "vecura" },
    { id: 4, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654111/vcare-logo_nlya0m_tckuxx.webp", name: "vcare" },
    { id: 5, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654110/tvs_qfc2sc_firgis.webp", name: "TVS" },
    { id: 6, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654110/trlpl_vbwnq1_dz5lqf.webp", name: "trlpl" },
    { id: 7, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654110/techindia_c4xpx8_mpgpnh.webp", name: "Tech India" },
    { id: 8, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654110/spl_infra_rxefmx_ph01dn.webp", name: "SPL Infra" },
    { id: 9, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654109/sahara_courier_dtznwq_awxrft.webp", name: "Sahara" },
    { id: 10, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654109/rock_worth_yvvgu6_flazcy.webp", name: "Rock Worth" },
    { id: 11, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654107/power-groups_nbyhpz_xipywa.webp", name: "Power Groups" },
    { id: 12, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654106/nccr_zw3ouz_tlxafj.webp", name: "NCCR" },
    { id: 13, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654106/mega-global_q0fscr_m23epu.webp", name: "MGM" },
    { id: 14, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654106/marg_kg1hjk_ndxl2s.webp", name: "Marg" },
    { id: 15, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654106/letsgro_tusjbf_jkpbzi.webp", name: "GRO" },

    { id: 16, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654105/kingfa_edsqaq_lsuyfb.webp", name: "Kinfa" },
    { id: 17, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654105/ifluids_dmmvaf_ybbvvv.webp", name: "I Fluids" },
    { id: 18, logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738654105/hlflogo_ft4fca_muh6hm.webp", name: "HLF" },
    
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

  return (
    <div>
      <Head>
      <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( organizations ) }}
            />
      </Head>
    <MetaTags />
        <section className="com-banner-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-60">
            <TextAnimate animation="slideLeft" by="words" className='home-head-1'>
              {"Our Clients"}
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
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i>Clients</p>
      </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16">


      {/* Clients Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center transform transition-transform hover:shadow-xl"
            >
              <div className="relative h-20 w-40">
              <Image
  src={client.logo}
  alt={client.name}
  fill
  style={{ objectFit: "contain" }} // Use the `style` prop instead of `objectFit`
  className="filter transition-all duration-300"
/>

              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </div>
    
  );
};

export default Clients;