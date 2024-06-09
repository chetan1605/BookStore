import React, {useState, useEffect} from 'react'
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner'; 
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

const EditBook = () => {
const [name, setName] = useState('');
const [author, setAuthor] = useState('');
const [year, setYear] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const {id} = useParams();
const {enqueueSnackbar} = useSnackbar();
useEffect(() => {
  setLoading(true);
  axios.get(`http://localhost:5555/books/${id}`)
  .then((res) => {
    setAuthor(res.data.author);
    setYear(res.data.year)
    setName(res.data.name)
    setLoading(false);
  }).catch((error) => {
    setLoading(false);
    alert('An error occured please check console');
    console.log(error);
  })
}, [])
const handleEditBook = () => {
  const data = {
    name,
    author,
    year,
  };
  setLoading(true);
  axios
  .put(`http://localhost:5555/books/${id}`, data)
  .then(() => {
    setLoading(false);
    enqueueSnackbar('Book edited successfully',{variant: 'success'});
    navigate('/');
  })
  .catch((error) => {
    setLoading(false);
    //alert('An error occured please check console');
    enqueueSnackbar('Error',{variant: 'error'});
    console.log(error);

  })
   
};
  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>name</label>
          <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          </div> 
          <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>author</label>
          <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>year</label>
          <input
          type='text'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
      />
    </div>
    <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}> Save
      </button>
      </div>
      </div>
  )
}

export default EditBook
