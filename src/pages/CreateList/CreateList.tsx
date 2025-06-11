import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createListing } from '../../features/listings/listingSlice';
import './style.css';

const CreateListing = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.listings);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFiles(Array.from(e.target.files));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setVideoFiles(Array.from(e.target.files));
  };

  const uploadToCloudinary = async (file: File, type: 'image' | 'video') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ramos_realty');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dlqwmscse/${type}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Cloudinary upload response:', data);

      if (!data.secure_url) throw new Error('Failed to upload file');
      return data.secure_url;
    } catch (error) {
      console.error('Error during uploadToCloudinary:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, price, location } = form;
    if (!title || !description || !price || !location) {
      alert('Please fill all fields');
      return;
    }

    if (!user) {
      alert('You must be logged in to create a listing.');
      return;
    }

    setUploading(true);

    try {
      const images: string[] = [];
      const videos: string[] = [];

      for (const image of imageFiles) {
        const url = await uploadToCloudinary(image, 'image');
        images.push(url);
      }

      for (const video of videoFiles) {
        const url = await uploadToCloudinary(video, 'video');
        videos.push(url);
      }

      const payload = {
        title,
        description,
        price: parseFloat(price),
        location,
        images,
        videos,
      };

      await dispatch(createListing(payload)).unwrap();
      alert('Listing created successfully!');
      setForm({ title: '', description: '', price: '', location: '' });
      setImageFiles([]);
      setVideoFiles([]);
    } catch (err) {
      console.error('Error creating listing:', err);
      alert(`Failed to create listing: ${err}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleInputChange}
        required
        className="form-textarea"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleInputChange}
        required
        className="form-input"
      />
      <label className="form-label">Upload Images</label>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} className="form-input" />
      <label className="form-label">Upload Videos</label>
      <input type="file" accept="video/*" multiple onChange={handleVideoChange} className="form-input" />
      <button type="submit" disabled={uploading || loading} className="form-button">
        {uploading || loading ? 'Processing...' : 'Create Listing'}
      </button>
      {error && <p className="form-error">Error: {error}</p>}
    </form>
  );
};

export default CreateListing;