import { Product } from "../model/product.model.js";

export const saveInBulk = (request, response, next)=>{
    Product.insertMany(request.body)
    .then(result=>{
        return response.status(201).json({message: "Products Data saved Successfully"});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Internal Server Error."});
    })
};

export const getProductList = (request, response, next)=>{
    Product.find()
    .then(result =>{
        return response.status(201).json({products: result});
    }).catch(err =>{
        return response.status(500).json({error: "Internal Server Error"});
    })
};