import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
            name:{
                type:String,
                required:true,
            },
            author:{
                type:String,
                required:true,
            },
            year:{
                type:String,
                required:true,
            }
},
{
    timestamps:true,
}
);

export const Book = mongoose.model('Chetan', bookSchema);