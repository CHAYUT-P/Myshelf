import { useState } from "react";
import "./Singlebook.css"; // ใช้ CSS เดียวกับ AddbookData

export default function SinglebookData({ book }) {
  const [bookData, setbookData] = useState(
    book || {
      title: "",
      author: "",
      language: "",
      pages: "",
      currentPage: "",
      publisher: "",
      isbn: "",
      publicationDate: "",
      edition: "",
      seriesName: "",
      seriesDescription: "",
      seriesCover: null,
      volumeNumber: "",
      primaryCategory: "",
      genres: [],
      synopsis: "",
      coverImage: null,
      tags: [],
      status: "",
      rating: "",
      progress: "",
      startDate: "",
      endDate: "",
    }
  );

  const progress =
  bookData.currentPage == 0 || bookData.pages == 0
    ? 0
    : Math.min(
        100,
        Math.round((bookData.currentPage / bookData.pages) * 100)
      );

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (files) {
    setBookData((prev) => ({ ...prev, [name]: files[0] }));
  } else {
    setBookData((prev) => ({ ...prev, [name]: value }));
  }
};

return (
  <div className="add-book-content">
    {/* Cover Upload */}
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
        {bookData.coverImage ? (
          <img
            src={
              typeof bookData.coverImage === "string"
                ? bookData.coverImage
                : URL.createObjectURL(bookData.coverImage)
            }
            alt="Book Cover"
            className="cover-preview"
          />
        ) : (
          <span className="cover-placeholder">Choose a cover</span>
        )}
      </label>
    </div>

    {/* Form */}
    <div className="add-book-form">
      <input
        type="text"
        name="title"
        value={bookData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="author"
        value={bookData.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <input
        type="text"
        name="language"
        value={bookData.language}
        onChange={handleChange}
        placeholder="Language"
      />

      {/* Metadata */}
      <div className="book-metadata">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={bookData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={bookData.endDate}
            onChange={handleChange}
          />
        </div>
        <input
          type="number"
          name="pages"
          value={bookData.pages}
          onChange={handleChange}
          placeholder="Pages"
        />
        <input
          type="number"
          name="currentPage"
          value={bookData.currentPage}
          onChange={handleChange}
          placeholder="Current Page"
        />
      </div>

      {/* Progress bar */}
      <div className="form-group">
        <label htmlFor="progress">Progress</label>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          >
            <label>{progress}%</label>
          </div>
        </div>
      </div>

      {/* Publishing */}
      <input
        type="text"
        name="publisher"
        value={bookData.publisher}
        onChange={handleChange}
        placeholder="Publisher"
      />
      <input
        type="text"
        name="isbn"
        value={bookData.isbn}
        onChange={handleChange}
        placeholder="ISBN"
      />
      <input
        type="date"
        name="publicationDate"
        value={bookData.publicationDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="edition"
        value={bookData.edition}
        onChange={handleChange}
        placeholder="Edition"
      />

      {/* Categories & Genres */}
      <input
        type="text"
        name="primaryCategory"
        value={bookData.primaryCategory}
        onChange={handleChange}
        placeholder="Primary Category"
      />
      <input
        type="text"
        name="genres"
        value={bookData.genres}
        onChange={(e) =>
          setBookData({ ...bookData, genres: e.target.value.split(",") })
        }
        placeholder="Genres (comma separated)"
      />

      {/* Synopsis */}
      <textarea
        name="synopsis"
        value={bookData.synopsis}
        onChange={handleChange}
        placeholder="Synopsis"
      />

      {/* Tags */}
      <input
        type="text"
        name="tags"
        value={bookData.tags}
        onChange={(e) =>
          setBookData({ ...bookData, tags: e.target.value.split(",") })
        }
        placeholder="Tags (comma separated)"
      />

      {/* Status */}
      <input
        type="text"
        name="status"
        value={bookData.status}
        onChange={handleChange}
        placeholder="Status"
      />

      {/* Rating */}
      <input
        type="number"
        name="rating"
        value={bookData.rating}
        onChange={handleChange}
        placeholder="Rating (1–10)"
      />
    </div>
  </div>
);
}