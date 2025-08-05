import {v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js"
import mongoose from "mongoose"
import { calculateOfferPrice } from "../utils/priceCalculator.js"; // import utility
//Addprocut: /api/prodcut/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Calculate dynamic offerPrice using rule-based algorithm
    const offerPrice = calculateOfferPrice({
      price: productData.price,
      category: productData.category,
      inStock: productData.inStock ?? true, // default to true if undefined
    });
    
    // Remove offerPrice from admin input, calculate it instead
    await Product.create({
      ...productData,
      image: imagesUrl,
      offerPrice, // override or set offerPrice
    });

    res.json({ success: true, message: "product added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//getprocut: /api/prodcut/list
export const productList = async (req,res)=>{
    try {
        const products = await Product.find({})
        res.json({success:true, products})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//get single procut: /api/prodcut/id
export const productById = async (req,res)=>{
    try {
        const {id} = req.body
        const product = await Product.findById(id)
        res.json({success:true, product})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//change instock: /api/prodcut/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    if (!id || typeof inStock !== 'boolean') {
      console.log('Invalid input:', req.body);
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.inStock = inStock;
    await product.save();

    return res.json({ success: true, message: 'Stock updated' });
  } catch (error) {
    console.error('changeStock error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


