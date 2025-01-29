import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/Home/BackButton";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishYear] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

    const handleSaveBook = () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage (or wherever you store it)
      if (!token) {
        console.error("No token found. User must be logged in.");
        return;
      }
    const data = {
      title,
      author,
      publishyear,
      image
    };

    axios
      .post("https://booksstore-app-server.onrender.com/books", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
       
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error saving book:", error.response?.data || error.message);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Create Book</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control mx-5 my-4"
          />
        </div>
        <div className="my-4">
          <label className="mx-4">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control mx-5 my-4"
          />
        </div>
        <div className="my-4">
          <label className="mx-4">Publish Year</label>
          <input
            type="number"
            value={publishyear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="form-control mx-5 my-4"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
