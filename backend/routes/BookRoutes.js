import express from 'express';
import { Book } from '../models/BookModel.js';

const router = express.Router();

router.post('/',async (req,res)=>{
    try{
        if(
            !req.body.name ||
            !req.body.author ||
            !req.body.year
        ) {
            return res.status(400).send({
                message:'Send all required files: name, author, year',
            });
        }
        const newBook = {
            name: req.body.name,
            author: req.body.author,
            year: req.body.year,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/',async (req,res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get('/:id',async (req,res)=>{
    try{
        
        const {id} = req.params;


        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        if(
            !req.body.name ||
            !req.body.author ||
            !req.body.year
        ) {
            return res.status(400).send({message:'send all required files: name, author, year',});
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book updated sucessfully'});

    }catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});

    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send({message: 'Book deleted successfully'});

    }catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;