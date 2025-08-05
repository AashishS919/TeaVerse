import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard';


const ProductCategory = () => {
    const {products} = useAppContext()
    const {category} = useParams()

    const searchCategory = categories.find((item)=>item.path.toLowerCase() === category)

    const filteredProducts = products.filter((product) => {
  const productCategory = Array.isArray(product.category)
    ? product.category[0]
    : product.category;
    return typeof productCategory === 'string' &&
         productCategory.toLowerCase() === category.toLowerCase();
});
  return (
        <div className='mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32'>
        {searchCategory && (
            <div className='flex flex-col items-start w-full mb-8'>
                <h1 className='text-3xl font-bold uppercase mb-2'>{searchCategory.text}</h1>
                < div className='w-16 h-[0.6px] bg-primary rounded-full'></div>
            </div>
  )}

  {filteredProducts.length > 0 ? (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mt-8'>
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div className='flex items-center justify-center h-[60vh]'>
      <p className='text-xl font-medium text-primary'>No Products Found In This Category.</p>
    </div>
  )}
</div>
  )
}

export default ProductCategory


