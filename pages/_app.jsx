import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import ReactGTM from 'react-gtm-module';
import './styles/style.css';
import './styles/responsive.css';
import './styles/globals.css';
import Header from './section/Header';
import Footer from './section/Footer';
import Head from 'next/head'; // Removed to avoid conflicts with page-specific Head components
import { ToastContainer } from 'react-toastify';

// Your GTM ID
const gtmId = 'GTM-NXV5XM9Q'; // Replace with your actual GTM ID

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Initialize GTM once on app load
  useEffect(() => {
    ReactGTM.initialize({ gtmId });
  }, []);

  // Push page view event to GTM on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="app-main">
      <Head>
      <link rel="icon" href="https://res.cloudinary.com/daggx9p24/image/upload/v1738226070/favicon_hkvjoa.png" type="image/x-icon" />
      </Head>
      {/* <noscript> GTM snippet removed; now in _document.js */}

      <Header />
      <Component {...pageProps} />
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  );
}

export default MyApp;