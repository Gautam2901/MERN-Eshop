import { Category } from "../model/category.model.js";
import { validationResult } from "express-validator";

export const saveinBulk = (request, response, next)=>{
    Category.insertMany(request.body)
    .then(result=>{
        return response.status(201).json({message: "All Categories saved succefully"});
    }).catch(err=>{
        return response.status(500).json({message: "Internal Server Error"});
    });
};

export const save = async (request, response, next)=>{
    try{
        let errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({error: "Invalid Data", errorMsg: errors.array()});
        }

        let category = await Category.create(request.body);
        return response.status(201).json({message: "Category Saved", category});
    }
    catch(err){
        return response.status(500).json({error: "Internal Server Error"});
    }
};

export const getCat = async (request, response, next)=>{
    let id = request.params.id;
    try{
        let category = await Category.findOne({_id: id});
        return category ? response.status(201).json({category}) : response.status(404).json({error: "Category not found"});
    }
    catch(err){
        return response.status(500).json({error: "Internal Server Error"});
    }
};

export const getCatlist = (request, response, next)=>{
    console.log(request);
    Category.find()
    .then(result=>{
        return response.status(201).json({categoryList: result});
    })
    .catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
};

export const deleteCat = (request, response,next)=>{
    let id = request.params.id;
    Category.deleteOne({_id:id})
    .then(result =>{
        return response.status(201).json({message: "Category Deleted Succesfully"});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
};
