import Head from 'next/head';
import useMetadata from '../lib/hooks/useMetadata.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MetaTags() {
  const { metadata, loading, error } = useMetadata();
  const router = useRouter();

  // Determine default metadata based on the current path from router
  const getDefaultMetadata = () => {
    const path = router.asPath.split(/[?#]/)[0];
    if (path.match(/\/\d+(\/|$)/)) {
      const basePath = path.replace(/\/\d+(\/.*)?$/, '') || '/';
      return getSectionDefaults(basePath);
    }
    return getSectionDefaults(path);
  };

  const getSectionDefaults = (path) => {
    if (path.startsWith('/product') || path === '/products') {
      return {
        title: 'Buy Microsoft Licenses – Windows, Office, SQL, Server & More',
        description: 'Microsoft software licenses, buy Windows 11 license, Visual Studio 2022, SQL Server 2022, Microsoft 365, Teams Premium, Power BI, Exchange Online, Microsoft Intune, WinLicense India',
        canonical_url: `https://winlicense.in${path}`,
        og_title: 'Buy Microsoft Licenses – Windows, Office, SQL, Server & More',
        og_description: 'Microsoft software licenses, buy Windows 11 license, Visual Studio 2022, SQL Server 2022, Microsoft 365, Teams Premium, Power BI, Exchange Online, Microsoft Intune, WinLicense India',
        og_image: 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png',
      };
    }

    if (path.startsWith('/about') || path === '/about') {
      return {
        title: 'About Us – Trusted Microsoft Software Reseller | WinLicense India',
        description: 'Learn about WinLicense – a trusted Microsoft software license reseller in India. We provide genuine, affordable, and fast-license delivery for individuals and businesses.',
        canonical_url: `https://winlicense.in${path}`,
        og_title: 'About Us – Trusted Microsoft Software Reseller | WinLicense India',
        og_description: 'Learn about WinLicense – a trusted Microsoft software license reseller in India. We provide genuine, affordable, and fast-license delivery for individuals and businesses.',
        og_image: 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png',
      };
    }

    return {
      title: 'Buy Genuine Microsoft Licenses – Windows, Office, SQL, server',
      description: 'WinLicense offers authentic Microsoft software licenses at competitive prices. Shop for Windows 10/11, Office 365, SQL Server, Microsoft Teams, Exchange Online, and more.',
      canonical_url: 'https://winlicense.in/',
      og_title: 'Buy Genuine Microsoft Licenses – Windows, Office, SQL, server',
      og_description: 'WinLicense offers authentic Microsoft software licenses at competitive prices. Shop for Windows 10/11, Office 365, SQL Server, Microsoft Teams, Exchange Online, and more.',
      og_image: 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png',
    };
  };

  useEffect(() => {
    const meta = metadata || getDefaultMetadata();
  }, [metadata, router.asPath]);

  const meta = metadata || getDefaultMetadata();
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical_url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.og_title} />
      <meta property="og:description" content={meta.og_description} />
      <meta property="og:url" content={meta.canonical_url} />
      <meta property="og:site_name" content="Sixth Star Technologies" />
      <meta property="og:image" content={meta.og_image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.og_title} />
      <meta name="twitter:description" content={meta.og_description} />
      <meta name="twitter:image" content={meta.og_image} />
      <meta name="author" content="Sixthstar Technologies" />
    </Head>
  );
}