import React, { useState, useEffect } from "react";
import "./Addseriesbook.css"; // reuse same styles for consistency

export default function AddSeriesBook({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "English",
    pages: "",
    publisher: "",
    publicationDate: "",
    edition: "",
    volumeNumber: "",
    genres: [],
    synopsis: "",
    coverImage: null,
    tags: [],
    rating: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const genresList = [
    "Action", "Adventure", "Drama", "Fantasy", "Mystery", "Romance",
    "Science Fiction", "Horror", "Thriller", "Historical", "Comedy", "War",
  ];

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "title") fetchBookSuggestions(value);
    }
  };

  const fetchBookSuggestions = async (title) => {
    if (!title.trim()) return setSuggestions([]);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&maxResults=10`
      );
      const data = await response.json();
      if (data.items) setSuggestions(data.items);
      else setSuggestions([]);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    const info = item.volumeInfo;
    setFormData({
      ...formData,
      title: info.title || "",
      author: info.authors?.join(", ") || "",
      pages: info.pageCount || "",
      language: info.language || "English",
      publisher: info.publisher || "",
      publicationDate: info.publishedDate || "",
      synopsis: info.description || "",
      coverImage: info.imageLinks?.thumbnail || null,
    });
    setSuggestions([]);
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleAdd = () => {
    const preparedData = {
      ...formData,
      coverImage:
        formData.coverImage instanceof File
          ? URL.createObjectURL(formData.coverImage)
          : formData.coverImage,
    };
    onAdd(preparedData);
    setFormData({
      title: "",
      author: "",
      language: "English",
      pages: "",
      publisher: "",
      publicationDate: "",
      edition: "",
      volumeNumber: "",
      genres: [],
      synopsis: "",
      coverImage: null,
      tags: [],
      rating: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setSuggestions([]);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-title-bar">
          <span></span>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="title-input-wrapper">
            <div className="book-cover-group">
              <div className="cover-upload">
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="cover-input"
                />
                <label htmlFor="coverImage" className="cover-label">
                  {formData.coverImage ? (
                    <img
                      src={
                        typeof formData.coverImage === "string"
                          ? formData.coverImage
                          : URL.createObjectURL(formData.coverImage)
                      }
                      alt="Book Cover"
                      className="cover-preview"
                    />
                  ) : (
                    <span className="cover-placeholder">Choose a cover</span>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="single-book">
            <div>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                autoFocus
              />

              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelectSuggestion(item)}
                    >
                      {item.volumeInfo.title}{" "}
                      {item.volumeInfo.authors
                        ? `by ${item.volumeInfo.authors.join(", ")}`
                        : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
            />

            <div className="book-metadata">
              <input
                type="number"
                name="pages"
                placeholder="Pages"
                value={formData.pages}
                onChange={handleChange}
              />
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={formData.language}
                onChange={handleChange}
              />
              <input
                type="text"
                name="publisher"
                placeholder="Publisher"
                value={formData.publisher}
                onChange={handleChange}
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-10)"
                min="1"
                max="10"
                value={formData.rating}
                onChange={handleChange}
              />
              <input
                type="text"
                name="volumeNumber"
                placeholder="Volume Number"
                value={formData.volumeNumber}
                onChange={handleChange}
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="notstarted">Not started</option>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
                <option value="plan">Plan to Read</option>
              </select>
            </div>

            <div className="form-group">
              <label className="genres-text">Genres</label>
              <div className="genres-buttons">
                {genresList.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={
                      formData.genres.includes(genre)
                        ? "genre-btn active"
                        : "genre-btn"
                    }
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="synopsis"
              name="synopsis"
              placeholder="Synopsis"
              value={formData.synopsis}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}