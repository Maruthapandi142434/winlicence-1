import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import {products} from '../../lib/data/products';
import Link from 'next/link';
import { TextAnimate } from "../../@/components/ui/text-animate";
import MetaTags from '../../components/MetaTags';
import { organizations } from "../../lib/data/schema"
import Head from 'next/head';

function BlogIndex({ initialData }) {
  const [posts, setPosts] = useState(initialData?.posts || []);
  const [pagination, setPagination] = useState(initialData?.pagination || {
    currentPage: 1,
    totalPages: 0,
    totalPosts: 0,
    hasMore: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/posts?page=${page}&search=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      setPosts(data.posts || []);
      setPagination(data.pagination || {
        currentPage: page,
        totalPages: 0,
        totalPosts: 0,
        hasMore: false
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setPagination({
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        hasMore: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchPosts(1, term);
  };

  const handlePageChange = (page) => {
    fetchPosts(page, searchTerm);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    {/* about us banner sec starts */}
            <section className="com-banner-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-60">
            <TextAnimate animation="slideLeft" by="character" className='home-head-1'>
              {"Blogs"}
          </TextAnimate>
          </div>
         
        </div>
      </div>
      
    </section>
    <div className="about-section">
      <div className="about-header">
        <p><Link href="/">Home</Link> <i className="fa-solid fa-angles-right"></i> Blog</p>
      </div>
      </div>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => {
              return (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://res.cloudinary.com/daggx9p24/image/upload/v1738923028/blpg-img_ps0xm9.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <div className="text-gray-600 text-sm mb-2">
                      {formatDate(post.created_at)}
                    </div>
                    <p className="text-gray-800 mb-4">{post.excerpt}</p>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-blue-500 hover:underline"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No posts found.
            </div>
          )}

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/posts`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    
    return {
      props: {
        initialData: data
      }
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      props: {
        initialData: {
          posts: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalPosts: 0,
            hasMore: false
          }
        }
      }
    };
  }
}

export default BlogIndex;
