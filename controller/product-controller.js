import { request, response } from 'express';
import Products from '../model/productSchema.js'
import { products } from '../constants/product.js';

export const getProducts =async(req,res)=>{
    try{
        const products=await Products.find({});
        console.log("products are ",products);
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export const getProductsById =async(req,res)=>{
    try{
       const id=req.params.id;
       const product= await Products.findOne({id:id});
       res.status(200).json(product);
        

    }
    catch(err){
        response.status(500).json({message:err.message});

    }
}





