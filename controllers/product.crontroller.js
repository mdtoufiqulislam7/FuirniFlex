const { response } = require("express");
const productmoddel = require("../models/product.model");
const { default: mongoose } = require("mongoose");


const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dshkbza19', 
    api_key: '587566651786429', 
    api_secret: 'Nd7M3bl2EgFqfJSm1RRE9MZxNq0' // Click 'View Credentials' below to copy your API secret
});



/// post rouute for just add data
exports.postproduct = async (req, res, next) => {
    try {
        // Check if files are uploaded
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: 'No photo file uploaded' });
        }

        const file = req.files.photo; // Get the photo file

        // Upload the file to Cloudinary
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading to Cloudinary', error: err });
            }

            const { title, description, old_price, new_price, discount } = req.body;

            // Create a new product
            const product_model = new productmoddel({
                _id: new mongoose.Types.ObjectId(),
                title: title,
                description: description,
                old_price: old_price,
                new_price: new_price,
                discount: discount,
                url: result.url // Cloudinary URL of the uploaded image
            });

            // Save the product to the database
            const response = await product_model.save();

            return res.status(200).json({
                message: "Successfully posted product data",
                data: response
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred',
            error: error.message
        });
    }
};


exports.getproduct = async(req,res,next)=>{
    try {
        const getproduct = await productmoddel.find()
        res.status(200).json({
         message:'succefully get expense data',
         data:getproduct
 
         
        })
     } catch (error) {
         res.status(401).json({
             error:error
         })
         
     }
}

exports.singleproduct = async(req,res,next)=>{
    try {
        
        const getproduct = await productmoddel.findById(req.params.id)
        res.status(200).json({
         message:'succefully get expense data',
         data:getproduct
 
         
        })
     } catch (error) {
         res.status(401).json({
             error:error
         })
         
    }
}








