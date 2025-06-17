import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {



  return (
    <div>

      <footer className='footer-sec'>
      <div className="container">
  <div className="row footer-con">

    <div className="col-lg-4 col-md-6">
      <h3>CERTIFICATE</h3>
      <div className="cert-Image pb-2">
								<Image src="https://res.cloudinary.com/dwyn5jgh3/image/upload/v1722055888/iso-20000_obiguc.webp" width={60} height={60} alt="iso-20000" loading='lazy'/>
								<Image src="https://res.cloudinary.com/dwyn5jgh3/image/upload/v1722055888/gdpr_qhmwv2.webp" width={60}  height={60} alt="gdpr" loading='lazy' />
								<Image src="https://res.cloudinary.com/dwyn5jgh3/image/upload/v1722055889/rqc_vqtye4.webp" width={60}  height={60} alt="rqc" loading='lazy' />
								<Image src="https://res.cloudinary.com/dwyn5jgh3/image/upload/v1722055890/ukasl_ae4pum.webp" width={60}  height={60} alt="ukasl" loading='lazy' />
								<Image 
								src="https://res.cloudinary.com/dwyn5jgh3/image/upload/v1722055889/iso-27001_nenayk.webp" width={60}  height={60} alt="iso-27001" loading='lazy'
								/>					
							</div>
              <ul>
              <li><Link href='#'>Terms and Conditions</Link> </li>
      <li><Link href='#'>Privacy Policy</Link> </li>
      <li><Link href='#'>Refund Policy</Link> </li>
      </ul>
    </div>

    <div className="col-lg-2 col-md-6">
    <h3>Quick Links</h3>
    <ul>
      <li><Link href='#'>About</Link></li>
      <li> <Link href='#'>Services</Link></li>
      <li><Link href="product">Product</Link></li>
      <li><Link href='#'>Clients</Link></li>
      <li><Link href=''>Product</Link></li>
      <li><Link href='#'>Contact</Link></li>
    </ul>
    </div>

    <div className="col-lg-2 col-md-6">
    <h3>Our Services</h3>
    <ul>
      <li><Link href='#'>24Hrs Support</Link></li>
      <li><Link href='#'>Client Management</Link></li>
      <li><Link href='#'>Easy to Use Customer</Link></li>
      <li><Link href='#'>Hosting Features</Link></li>
      <li><Link href='#'>Email Hosting</Link></li>
      <li><Link href='#'>Powerful Hosting</Link> </li>
    </ul>
    </div>

    <div className="col-lg-2 col-md-6">
    <h3>Our Proudct</h3>
    <ul>
      <li><Link href='#'>Windows OS</Link> </li>
      <li><Link href='#'>Windows Server OS</Link> </li>
      <li><Link href='#'>RDP Windows License</Link> </li>
      <li><Link href='#'>Sql License</Link> </li>
      <li><Link href='#'>Mail License</Link> </li>
    </ul>
    </div>

    <div className="col-lg-2 col-md-6">
    <h3>Contact Details</h3>
    <ul className="footer-link">
								<li><i className="fa fa-envelope"></i><Link href="mailto:sales@sixthstar.in">sales@sixthstar.in</Link></li>
								<li><i className="fa fa-envelope"></i><Link href="mailto:support@sixthstar.in">support@sixthstar.in</Link></li>
                </ul>
                <ul className="social">
									<li><a href="https://www.facebook.com/sixthstartechnologies.page/"><i className="fa-brands fa-facebook"></i></a></li>
									<li><Link href="https://twitter.com/sixthstartechno"><i className="fa-brands fa-x-twitter"></i></Link></li>
									<li><Link href="https://www.youtube.com/@sixthstarTechnologies"><i className="fa-brands fa-youtube"></i></Link></li>
									<li><Link href="https://www.instagram.com/sixthstar_technologies/"><i className="fa-brands fa-instagram"></i></Link></li>
									<li><Link href="https://www.linkedin.com/company/sixth-star-technologies"><i className="fa-brands fa-linkedin"></i></Link></li>
								</ul>
    </div>

  </div>
</div>
      </footer>
      <section className="copyright">
        {/* <div className="terms text-center">
            <ul>
              <li><Link href='#'>Terms and Conditions</Link> </li>
      <li><Link href='#'>Privacy Policy</Link> </li>
      <li><Link href='#'>Refund Policy</Link> </li>
      </ul>
        </div> */}
        <div className="con text-center">
          <p>Copyright ©2020 Microsoft. All Rights Reserved</p>
        </div>
      </section>

    </div>
  )
}

export default Footer