import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
const Header = () => {
  return (
    <div>
        <div className="header-sec">
        
        <Navbar expand="lg" className="bg-body-tertiary">
        <div className="container max-w-7xl mx-auto">
        <Link  href="/"><img className='header-img' src="https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png" alt="" /></Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="header-nav">
          <Nav.Link className='con' href="/">Home</Nav.Link>
            <NavDropdown className='menus'title="About" id="basic-nav-dropdown">
            
              <NavDropdown.Item href="/about/about-us">
              About Microsoft
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/mission-vision">Mission & Vision</NavDropdown.Item>
             
              <NavDropdown.Item href="/about/why-microsoft">
              Why Microsoft
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/business-models">
              Business Models
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/methodology">
              Methodology
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/testimonials">
              Testimonials
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/faq">
              FAQ
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='con' href="/service">Services</Nav.Link>
            <Nav.Link className='con' href="/product">Product</Nav.Link>
            <Nav.Link className='con' href="/clients">Client</Nav.Link>
            <Nav.Link className='con' href="/blog">blog</Nav.Link>
           <Nav.Link className='demo' href="/contact">Contact Us</Nav.Link>
          </Nav>
       
        </Navbar.Collapse>
        </div>
    </Navbar>
   
        </div>
    </div>
  )
}

export default Header