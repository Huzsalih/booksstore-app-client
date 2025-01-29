import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import BackButton from "../component/Home/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://booksstore-app-server.onrender.com/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishyear);
        setTitle(response.data.title);
      })
      .catch((error) => {
        alert("An error occured. please check console");
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishyear,
    };
    axios
      .put(`https://booksstore-app-server.onrender.com/books/${id}`,data)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Edit Book</h1>
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
      </div>
      <button className="btn btn-primary btn-lg" onClick={handleEditBook}>
        Save
      </button>
    </div>
  );
};

export default EditBook;
