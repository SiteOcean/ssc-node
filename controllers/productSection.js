const Products = require('../models/productSchema');
const fs = require('fs');
const path = require('path');

const addProduct = async (req, res) => {
  try {
    let { name, title, description, brand, price, offer,category } = req.body;

    const images = req.files.map((image) => ({
        data: fs.readFileSync("productImages/" + image.filename),
        contentType: image.mimetype,
        filename: image.filename,
      }));

    const newProductData = {
      name,
      title,
      description,
      brand,
      category,
      price,
      offer,
      images,
    };

    const newProduct = new Products(newProductData);

    // Save the new product to the database
    const savedProduct = await newProduct.save();
    // for (const file of req.files) {
    //   fs.unlink(file.path, (err) => {
    //     if (err) {
    //       console.error('Error deleting local file:', err);
    //     }
    //   });
    // }
    return res.status(200).json({message:'Success'}); // Send a JSON response with the saved product
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProducts = async (req, res) => {
    try {
      const allProducts = await Products.find();
  
      return res.status(200).json(allProducts);
    } catch (error) {
      console.error('Error retrieving products:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getProductsByCategory = async (req, res) => {
    try {
        const {category} = req.body;
      const allProducts = await Products.find({category});
       
      return res.status(200).json(allProducts);
    } catch (error) {
      console.error('Error retrieving products:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateProductById = async (req, res) => {
    try {
      const { name, title, description, brand, price, offer, _id } = req.body;
      const images = req.files && req.files.length > 0
        ? req.files.map((image) => ({
            data: fs.readFileSync("productImages/" + image.filename),
            contentType: image.mimetype,
            filename: image.filename,
          }))
        : undefined;
  
      const updateProduct = {
        name,
        title,
        description,
        brand,
        price,
        offer,
      };
  
      // Only add images property if new images are provided
      if (images) {
        updateProduct.images = images;
      }
  
      const updatedProduct = await Products.findByIdAndUpdate(_id, updateProduct, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getProductById = async (req, res) => {
    const {_id}= req.body;
  
    try {
      const product = await Products.findById(_id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const deleteProductById = async (req, res) => {
    const {_id} = req.body;
    console.log(req.body)
    try {
      const deletedProduct = await Products.findByIdAndDelete(_id);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  addProduct,
  getAllProducts,
  deleteProductById,
  getProductById,
  updateProductById,
  getProductsByCategory
};
