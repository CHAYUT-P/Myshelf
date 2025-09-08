import React, { useState, useEffect } from "react";
import "./AddBook.css";

export default function AddBook({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    language: 'English',
    pages: '',
    bookType: 'single',
    seriesName: '',
    seriesDescription: '',
    seriesCover: null,
    volumeNumber: '',
    category: '',
    genres: [],
    synopsis: '',
    coverImage: null,
    tags: [],
    status: ''
  });

  const categories = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance',
    'Thriller', 'Horror', 'Biography', 'History', 'Science', 'Technology',
    'Self-Help', 'Business', 'Health', 'Travel', 'Cooking', 'Art', 'Religion',
    'Philosophy', 'Poetry', 'Drama', 'Children', 'Young Adult', 'Education'
  ];

  const genresList = [
    'Adventure', 'Action', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Historical',
    'Horror', 'Mystery', 'Philosophical', 'Political', 'Romance',
    'Satire', 'Science Fiction', 'Thriller', 'Western', 'Young Adult', 'Children'
  ];

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "title") {
        fetchBookSuggestions(value);
      }
    }
  };

  const fetchBookSuggestions = async (title) => {
    if (!title.trim()) return setSuggestions([]);
    try {
      const query = encodeURIComponent(title);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=15`);
      const data = await response.json();
      if (data.items) setSuggestions(data.items);
      else setSuggestions([]);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    const info = item.volumeInfo;
    setFormData({
      ...formData,
      title: info.title || '',
      author: info.authors?.join(", ") || '',
      pages: info.pageCount || '',
      language: info.language || 'English',
      genres: info.categories || [],
      synopsis: info.description || '',
      coverImage: info.imageLinks?.thumbnail || null,
      seriesName: '',
      seriesDescription: '',
      seriesCover: null,
      volumeNumber: '',
      category: '',
      tags: [],
      status: ''

    });
    setSuggestions([]);
  };

  const toggleGenre = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleAdd = () => {
    if (!formData.title.trim()) return;
    onAdd(formData);
    setFormData({
      title: '', author: '', language: 'English', pages: '',
      bookType: 'single', seriesName: '', seriesDescription: '',
      seriesCover: null, volumeNumber: '', category: '', genres: [],
      synopsis: '', coverImage: null, tags: [],status: ''
    });
    setSuggestions([]);
    onClose();
  };

  const setDataOnClose = () => {
    setFormData({
        title: '', author: '', language: 'English', pages: '',
        bookType: 'single', seriesName: '', seriesDescription: '',
        seriesCover: null, volumeNumber: '', category: '', genres: [],
        synopsis: '', coverImage: null, rating: 0, tags: [],status: ''
    });
    onClose();
  }

  return (
    <div className="modal-backdrop">
        <div className="modal-content">
            <div className="modal-title-bar">
            <span></span>
            <button className="close-button" onClick={() => {
                        setDataOnClose(); 
                        onClose();
                    }}>×</button>
            </div>

            <div className="modal-body">
            <select name="bookType" value={formData.bookType} onChange={handleChange}>
                <option value="single">Single</option>
                <option value="series">Series</option>
            </select>

            {/* Title input with suggestions */}
            <div className="title-input-wrapper">
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
                    {suggestions.map(item => (
                    <li key={item.id} onClick={() => handleSelectSuggestion(item)}>
                        {item.volumeInfo.title} {item.volumeInfo.authors ? `by ${item.volumeInfo.authors.join(", ")}` : ''}
                    </li>
                    ))}
                </ul>
                )}
            </div>

            <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
            <input type="number" name="pages" placeholder="Pages" value={formData.pages} onChange={handleChange} />
            <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleChange} />
            <input type="text" name="seriesName" placeholder="Series Name" value={formData.seriesName} onChange={handleChange} />
            <textarea name="seriesDescription" placeholder="Series Description" value={formData.seriesDescription} onChange={handleChange} />
            <input type="file" name="seriesCover" onChange={handleChange} />
            <input type="text" name="volumeNumber" placeholder="Volume Number" value={formData.volumeNumber} onChange={handleChange} />

            <div className="form-group">
                <label>Primary Category *</label>
                <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                >
                <option value="">Select a category</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
            </div>

            {/* Genres */}
            <div className="form-group">
                <label className="genres-text">Genres</label>
                <div className="genres-buttons">
                {genresList.map(genre => (
                    <button
                    key={genre}
                    type="button"
                    className={formData.genres.includes(genre) ? 'genre-btn active' : 'genre-btn'}
                    onClick={() => toggleGenre(genre)}
                    >
                    {genre}
                    </button>
                ))}
                </div>
            </div>

            <textarea name="synopsis" placeholder="Synopsis" value={formData.synopsis} onChange={handleChange} />
            <input type="file" name="coverImage" onChange={handleChange} />
            <textarea 
                name="tags" 
                placeholder="Tags (comma separated)" 
                value={formData.tags.join(",")} 
                onChange={e => setFormData({ ...formData, tags: e.target.value.split(",") })} 
            />
        </div>
        <div className="modal-buttons">
            <button onClick={handleAdd}>Add</button>
            <button 
                onClick={() => {
                    setDataOnClose(); 
                    onClose();
                }}
                >
                Cancel
            </button>
        </div>
        </div>
    </div>
  );
}
