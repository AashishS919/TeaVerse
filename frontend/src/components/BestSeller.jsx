import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const {products} = useAppContext();
    
    return (
        <div className='mt-16 max-w-screen-xl mx-auto px-4'>
            <p className="text-3xl font-bold mb-8">Best Sellers</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {products
                    .filter((product) => product.inStock)
                    .slice(0, 5)
                    .map((product, index) => (
                        <ProductCard key={product._id} product={product}/> //  Use current product
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller