import express from "express";
import {PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";
import BookRoutes from './routes/BookRoutes.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome to Anime Bookstore');
});

app.use('/books', BookRoutes);



mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port": ${PORT}`);
    });

})
.catch((error)=>{
    console.log(error);

});