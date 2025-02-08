const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel.js");

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files?.image1?.[0];
    const image2 = req.files.image2 && req.files?.image2?.[0];
    const image3 = req.files.image3 && req.files?.image3?.[0];
    const image4 = req.files.image4 && req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new Product(productData);

    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log("Error is occured during add some products", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log("This error is occur during listing products", error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product removed!",
    });
  } catch (error) {
    console.log("This error is occured during removing products", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function for single product information
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("This is occured during adding single PRoduct", error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};
