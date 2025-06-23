import Product from "../models/product.model.js";
import mongoose from "mongoose";

/**
 * Retrieves all products from the database.
 *
 * This function handles the HTTP GET request to fetch all products.
 * It queries the database for all product records and returns them
 * in the response as a JSON object. If an error occurs during the
 * database query, it logs the error and returns a 500 status code
 * with a server error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error in Get Products: ", error.message);
        return res.status(500).json({ success: false, message: "Server Error"});
    }
}

/**
 * Creates a new product in the database.
 *
 * This function handles the HTTP POST request to create a product.
 * It validates the request body data to ensure all required fields are
 * present, and then creates a new product record in the database.
 * If the record is created successfully, it returns a 201 status code
 * with the new product's data in the response. If an error occurs during
 * the database query, it logs the error and returns a 500 status code
 * with a server error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createProduct = async (req, res) => {  

    const product = req.body; // user will send this data
    if (!product.name || !product.price || !product.image) {
        return res.status(400).send({ success: false, message: "Please fill all the fields" });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product: ", error.message);
        return res.status(500).json({ success: false, message: "Server Error"});
    }
}

/**
 * Updates an existing product in the database.
 *
 * This function handles the HTTP PUT request to update a product.
 * It validates the request body data to ensure all required fields are
 * present, and then updates the product record in the database.
 * If the record is updated successfully, it returns a 200 status code
 * with the updated product's data in the response. If an error occurs during
 * the database query, it logs the error and returns a 500 status code
 * with a server error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const updateProduct = async (req, res) => {  

    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in Update Product: ", error.message);
        return res.status(500).json({ success: false, message: "Server Error"});
    }
}

/**
 * Deletes an existing product from the database.
 *
 * This function handles the HTTP DELETE request to delete a product.
 * It validates the request parameters to ensure a valid product ID is
 * present, and then deletes the product record from the database.
 * If the record is deleted successfully, it returns a 200 status code
 * with a success message in the response. If an error occurs during
 * the database query, it logs the error and returns a 500 status code
 * with a server error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const deleteProduct = async (req, res) => { 

    const { id } = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID"});
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in Delete Product: ", error.message);
        return res.status(500).json({ success: false, message: "Server Error"});
    }
}   