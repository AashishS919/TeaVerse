import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
    const { navigate } = useAppContext();

    return (
        <div className="mt-16 max-w-screen-xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Categories</h1>
            <div className="flex overflow-x-auto gap-8 pb-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 flex flex-col items-center cursor-pointer"
                        onClick={() => {
                            navigate(`/shop/${category.path.toLowerCase()}`);
                            scrollTo(0, 0);
                        }}
                    >
                        {/* Image with larger size */}
                        <img 
                            src={category.image} 
                            alt={category.text}
                            className="w-60 h-32 object-contain mb-2 hover:scale-105 transition-transform"
                        />
                        {/* Larger text */}
                        <p className="text-xl font-medium text-center">
                            {category.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;