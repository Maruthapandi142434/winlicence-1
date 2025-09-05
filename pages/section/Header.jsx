import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    setMounted(true);
  }, []);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    checkUser();
    // Listen for custom authChanged event
    const handler = () => checkUser();
    window.addEventListener('authChanged', handler);
    return () => window.removeEventListener('authChanged', handler);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
      <div className="header-sec relative">
        <Navbar expand="lg" className="bg-body-tertiary">
          <div className="container max-w-7xl mx-auto relative">
            <Link href="/"><img className='header-img' src="https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png" alt="" /></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="block lg:hidden w-full flex flex-col mb-0">
                <div className="flex flex-col w-full mt-0 mb-2">
                  {/* {mounted ? (
                    user ? (
                      <div className="relative">
                        <button
                          className="flex items-center w-full text-left px-2 py-2 text-[#003b93e3] font-semibold hover:bg-gray-100 focus:outline-none"
                          onClick={() => setShowDropdown((v) => !v)}
                          aria-label="User menu"
                        >
                          <span className="inline-block w-6 h-6 flex items-center justify-center text-xl mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#003b93e3]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                            </svg>
                          </span>
                          {user.username}
                        </button>
                        {showDropdown && (
                          <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                            <div className="px-4 py-2 text-blue-700 font-semibold border-b">{user.username}</div>
                            <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Dashboard</Link>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link href="/login" className="w-full px-3 py-2 text-[#003b93e3] font-semibold hover:bg-gray-100">LOGIN</Link>
                    )
                  ) : null} */}
                </div>
              </div>
              <Nav className="header-nav">
                <Nav.Link className='con' href="/">Home</Nav.Link>
                <NavDropdown className='menus' title="About" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/about/about-us">About Microsoft</NavDropdown.Item>
                  <NavDropdown.Item href="/about/mission-vision">Mission & Vision</NavDropdown.Item>
                  <NavDropdown.Item href="/about/why-microsoft">Why Microsoft</NavDropdown.Item>
                  <NavDropdown.Item href="/about/business-models">Business Models</NavDropdown.Item>
                  <NavDropdown.Item href="/about/methodology">Methodology</NavDropdown.Item>
                  <NavDropdown.Item href="/about/testimonials">Testimonials</NavDropdown.Item>
                  <NavDropdown.Item href="/about/faq">FAQ</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className='con' href="/service">Services</Nav.Link>
                <Nav.Link className='con' href="/product">Product</Nav.Link>
                <Nav.Link className='con' href="/clients">Client</Nav.Link>
                <Nav.Link className='con' href="/blog">blog</Nav.Link>
                <Nav.Link className='demo' id='hm-header-contactus' href="/contact">Contact Us</Nav.Link>
              </Nav>
              <div className="hidden lg:flex items-center ml-4 relative">
                {/* {mounted ? (
                  user ? (
                    <div className="relative">
                      <button
                        className="flex items-center px-3 py-2 text-[#003b93e3] font-semibold  hover:bg-gray-100 rounded focus:outline-none"
                        onClick={() => setShowDropdown((v) => !v)}
                        aria-label="User menu"
                      >
                        <span className="inline-block w-6 h-6 flex items-center justify-center text-xl mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#003b93e3]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                          </svg>
                        </span>
                        {user.username}
                      </button>
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                          <div className="px-4 py-2 text-blue-700 font-semibold border-b">{user.username}</div>
                          <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Dashboard</Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="px-4 py-2 text-[#003b93e3] font-semibold rounded hover:bg-blue-700 bg-blue-800 lg:bg-blue-600 lg:text-white lg:hover:bg-blue-700"
                    >
                      LOGIN
                    </Link>
                  )
                ) : null} */}
              </div>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>

  );
};

export default Header;