import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useMetadata() {
  const router = useRouter();
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Normalize path (remove query/hash)
        let path = router.asPath.split(/[?#]/)[0];
        path = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '');

        // For production, ensure proper encoding
        const apiPath = process.env.NODE_ENV === 'production' 
          ? path // Don't encode in production - Next.js will handle it
          : encodeURIComponent(path);

        const response = await fetch(`/api/metadata/${apiPath}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setMetadata(data.metadata);
        } else {
          console.warn('No metadata found for:', path);
          setError('No metadata found');
        }
      } catch (err) {
        console.error('Metadata fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [router.asPath, router.isReady]);

  return { metadata, loading, error };
}