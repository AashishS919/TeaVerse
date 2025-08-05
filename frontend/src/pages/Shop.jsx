import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Fuse from 'fuse.js';

const Shop = () => {
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }

    const fuse = new Fuse(products, {
      keys: ['name', 'category'],
      threshold: 0.4,
    });

    const results = fuse.search(searchQuery);
    setFilteredProducts(results.map(result => result.item));
  }, [products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col items-start w-full mb-8'>
        <h1 className='text-3xl font-bold uppercase mb-2'>All Products</h1>
        <div className='w-16 h-[0.6px] bg-primary rounded-full'></div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4 p-2 border rounded w-full max-w-sm"
        />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mt-8'>
        {filteredProducts
          .filter(product => product.inStock)
          .map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Shop;
