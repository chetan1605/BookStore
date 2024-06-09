import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/Backbutton';
import Spinner from '../components/Spinner';
const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, [])
  return (
    <div className='p-4'>
      <BackButton destination='/' />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-5 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-3xl mr-4 text-black '>Id:</span>
          <span  className='ml-5 text-xl'>{book._id}</span>
          </div>
          <div className='my-4'>
          <span className='text-3xl mr-4 text-black'>Title </span>
          <span className='ml-5 text-xl'>{book.name}</span>
          </div>
          <div className='my-4'>
          <span className='text-3xl mr-4 text-black'>Author </span>
          <span className='ml-5 text-xl'>{book.author}</span>
          </div>
          <div className='my-4'>
          <span className='text-3xl mr-4 text-black'>Publish Year</span>
          <span className='ml-5 text-xl'>{book.publishYear}</span>
          </div>
          <div className='my-4'>
          <span className='text-3xl mr-4 text-black'>Create Time</span>
          <span className='ml-5 text-xl'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
          <span className='text-3xl mr-4 text-black'>Last Updated Time</span>
          <span className='ml-5 text-xl'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default ShowBook