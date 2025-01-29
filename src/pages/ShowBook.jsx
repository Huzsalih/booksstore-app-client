import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../component/Home/BackButton";import React from 'react'

const ShowBook = () => {
    const [book,setBook] = useState({});
    const {id} = useParams();
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
        .get(`https://booksstore-app-server.onrender.com/books/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`, // Ensure the token is properly formatted
              },
        })
        .then((response) => {
            setBook(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
  return (

<div className="p-4">
    <BackButton />

    <h1 className="my-4">Show Book</h1>
    <div className="border border-2 rounded rounded-x1 p-4">
        
        {book.image && (
            <div className="w-1/3 p-4">
                <img src={book.image} alt={book.title} />
            </div>
        )}

        <div className="my-4">
            <span className="border p-1 rounded mx-2 ">Id</span>
            <span>{book._id}</span>

        </div>
        <div className="my-4">
            <span className="border p-1 rounded mx-2 ">Title</span>
            <span>{book.title}</span>
        </div>
        <div className="my-4">
            <span className="border p-1 rounded mx-2 ">Author</span>
            <span>{book.author}</span>
        </div>
        <div className="my-4">
            <span className="border p-1 rounded mx-2 ">Publish Year</span>
            <span>{book.publishyear}</span>
        </div>
        <div className="my-4">
            <span className="border p-1 rounded mx-2 ">Create Time</span>
            <span>{book.createdAt ? new Date(book.createdAt).toString() : "N/A"}</span>
        </div>
        <div className="my-4">
            <span className="border p-1 rounded mx-2 ">Last Update</span>
            <span>{book.updatedAt ? new Date(book.updatedAt).toString() : "N/A"}</span>
        </div>


    </div>
    </div>
  )
}

export default ShowBook