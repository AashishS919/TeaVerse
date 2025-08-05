import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { assets, categories } from '../../assets/assets';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
  const { axios, products, fetchProducts } = useAppContext();
  const { id } = useParams(); // Get product ID from URL

  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  // Preload existing product data
  useEffect(() => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setName(product.name);
      setDescription(product.description.join('\n'));
      setCategory(product.category);
      setPrice(product.price);
      setOfferPrice(product.offerPrice);
      setPreviewImages(product.image);
    }
  }, [id, products]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const productData = {
        name,
        description: description.split('\n'),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        if (files[i]) formData.append('images', files[i]);
      }

      const { data } = await axios.put(
        `http://localhost:4000/api/product/update/${id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);

                    const updatedPreviews = [...previewImages];
                    updatedPreviews[index] = URL.createObjectURL(e.target.files[0]);
                    setPreviewImages(updatedPreviews);
                  }}
                />
                <img
                  src={previewImages[index] || assets.upload_area}
                  className="max-w-24 cursor-pointer"
                  alt="preview"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="name">Product Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="desc">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="desc" rows="4" className="px-3 py-2 border rounded"></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border rounded">
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="px-3 py-2 border rounded" required />
          </div>
          <div className="flex flex-col w-1/2">
            <label>Offer Price</label>
            <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="px-3 py-2 border rounded" required />
          </div>
        </div>

        <button className="bg-primary text-white px-6 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
