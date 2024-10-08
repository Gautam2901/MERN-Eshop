import mongoose from "mongoose";

const catSchema = mongoose.Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    url: {
        type:String
    }
}, {versionKey:false});

export const Category = mongoose.model("category", catSchema);