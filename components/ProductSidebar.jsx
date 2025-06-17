import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { categories } from '../lib/data/products';

const ProductSidebar = ({ 
  selectedCategories = [], 
  searchTerm,
  onSearchChange,
  showCategoryFilters = true 
}) => {
  const router = useRouter();

  return (
    <div className="w-full lg:w-1/4 bg-gray-100 border-r shadow-xs p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {showCategoryFilters && (
        <div className="space-y-2 max-h-[calc(250vh-200px)] overflow-y-auto">
          {categories.map((category) => (

            <Link key={category.slug} href={`/product/category/${category.slug}`}>
  <div className={`flex m-2 items-center p-2 rounded cursor-pointer 
    ${router.asPath === `/product/category/${category.slug}` ? 'bg-blue-500 text-white' : 'text-gray-800'} 
    hover:bg-blue-500 hover:text-white`}>
    <img 
      src={category.img} 
      alt={category.name} 
      className="w-8 h-8 mr-2 object-contain"
    />
    <span className="text-lg">
      {category.name}
    </span>
  </div>
</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSidebar;