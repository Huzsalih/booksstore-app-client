import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import BooksTable from "../component/Home/BooksTable";

import React from 'react'

const Home = () => {

    const [books, setBooks] = useState([]);

const navigate = useNavigate();
const usernameLocal = localStorage.getItem('user');
console.log(usernameLocal);

if (usernameLocal == null) {
    navigate('/')
}

const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
};

useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/login"); 
        return;
      }

      try {
        const response = await axios.get("https://booksstore-app-server.onrender.com/books", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setBooks(response.data.data); 
      } catch (error) {
        // Handle errors
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
          navigate("/login");
        } else {
          console.error("Error fetching books:", error.response?.data || error.message);
        }
      }
    };

    fetchBooks(); 
  }, [navigate]); 



  return (

    
    <div className='container p-4'>

        <div className='flex justify-between items-center'>
            <h1 className='lead display-4 mt-5'>Books List</h1>
            <Link to='/books/create'>
            <CiSquarePlus className='display-5'/>
            </Link>

            <span className="mx-2">Welcome, { usernameLocal }!</span>
            <button
            className="btn btn-primary my-3" 
            onClick={handleLogOut}>
                Log Out
            </button>


        </div>

        <BooksTable books={books} />



    </div>
  )
}

export default Home