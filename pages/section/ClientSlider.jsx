import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ClientSlider = () => {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1, // Ensure smooth scrolling
        autoplay: true,
        speed: 3000, 
        autoplaySpeed: 500, 
        cssEase: "linear", 
        arrows: false,
        initialSlide: 0,
        pauseOnHover: false,
        rtl: false, // Prevent direction reversal
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            }
        ]
    };

    const logos = [
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496948/butterfly-logo_lihzni.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496948/mtutor_ax0010.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496947/imc-logo_gt8kwt.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496946/kshema_ivekpp.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496946/dahnay-logo_wnik6h.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496945/nccr-logo_ucqyqo.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496945/vcare-logo_w3muev.png",
        // "https://res.cloudinary.com/daggx9p24/image/upload/v1745496944/voltech-logo_bpdevu.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496914/efiling-logo_cnargm.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745496509/bonton-logo_rwl4lf.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745647539/hlf-services-logo_zi5nmc.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745647653/vcerp-logo_vouehe.png",
    ];

    const logos2 = [
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559668/marg_aamtoc.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559667/gro_b2ah8v.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559666/hhf_qqrolg.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559666/kingfa_rxzrmw.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559666/panimalar_bptaem.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559666/power_bwpxtm.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559665/ifluids_vnt9u9.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559665/sahara_x8parw.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559662/marg-logo_omqdhz.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559650/hoec-logo_py4wmy.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559650/jamal_mohamed_-logo_r8bx6a.png",
    ];

    const logos3 = [
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559665/rock_worth_m8q5qt.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559664/spl_udjjtm.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559664/tech_india_wntwyx.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559663/tvs_wftk3c.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559663/tnlp-logo_syybbk.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559663/velammal_mytbsr.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559663/vecura_h0gvgr.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559662/vasanth_tv_bjwec1.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559662/ashok_leyalnd_hrcwkc.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559650/makkal-logo_fod6pu.png",
        "https://res.cloudinary.com/daggx9p24/image/upload/v1745559650/vijaytv-logo_unqnnc.png",
    ];



    return (
        <div className="p-2">
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <div key={index} className="container">
                        <img src={logo} alt='client img' width={180} height={95} loading='lazy' className='logo-slider-img rounded-sm'  />
                    </div>
                ))}
                
            </Slider>
            <br />
            <Slider {...settings}>
                {logos2.map((logo, index) => (
                    <div key={index} className="container">
                        <img src={logo} alt='client img'  width={180} height={95} loading='lazy' className='logo-slider-img rounded-sm' />
                    </div>
                ))}
            </Slider>
            <br />
            <Slider {...settings}>
                {logos3.map((logo, index) => (
                    <div key={index} className="container">
                        <img src={logo} alt='client img'  width={180} height={95} loading='lazy' className='logo-slider-img rounded-sm' />
                    </div>
                ))}
            </Slider>
            
        </div>
    );
};

export default ClientSlider;
