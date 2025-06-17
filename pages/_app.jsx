import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import ReactGTM from 'react-gtm-module';
import './styles/style.css';
import './styles/responsive.css';
import './styles/globals.css';
import Header from './section/Header';
import Footer from './section/Footer';
// import Head from 'next/head'; // Removed to avoid conflicts with page-specific Head components

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
      {/* Head component removed from _app.jsx to prevent conflicts. 
          Individual pages should handle their own Head content. */}

      {/* Google Tag Manager (noscript fallback) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id= ${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;