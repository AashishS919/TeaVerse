    import React, { useEffect, useState } from "react";
    import ProductCard from "./ProductCard";

    const SimilarProducts = ({ currentProduct, allProducts }) => {
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const getSimilar = () => {
        const descriptions = allProducts.map((p) => p.description.join(" ").toLowerCase());
        const currentDesc = currentProduct.description.join(" ").toLowerCase();

        const tfidf = (doc) => {
            const words = doc.split(/\W+/);
            const freq = {};
            words.forEach((w) => {
            if (!freq[w]) freq[w] = 0;
            freq[w]++;
            });
            return freq;
        };

        const cosineSim = (vecA, vecB) => {
            const allWords = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
            const dotProd = [...allWords].reduce((sum, w) => sum + (vecA[w] || 0) * (vecB[w] || 0), 0);
            const magA = Math.sqrt(Object.values(vecA).reduce((sum, v) => sum + v * v, 0));
            const magB = Math.sqrt(Object.values(vecB).reduce((sum, v) => sum + v * v, 0));
            return dotProd / (magA * magB || 1);
        };

        const currentVec = tfidf(currentDesc);
        const scores = allProducts.map((p, i) => {
            if (p._id === currentProduct._id) return { product: p, score: 0 };
            const vec = tfidf(descriptions[i]);
            return { product: p, score: cosineSim(currentVec, vec) };
        });

        scores.sort((a, b) => b.score - a.score);
        setSimilarProducts(scores.slice(0, 5).map((s) => s.product));
        };

        getSimilar();
    }, [allProducts, currentProduct]);

    return (
        <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
        </div>
    );
    };

    export default SimilarProducts;
