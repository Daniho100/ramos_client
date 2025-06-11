import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './style.css';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  videos?: string[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

const GeneralListDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState('Contact Seller')
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        console.log('Fetching listing for id:', id); 
        const response = await axiosInstance.get(`/listings/${id}`);
        console.log('Fetch listing response:', response.data); 
        setListing(response.data);
      } catch (err: any) {
        console.error('Fetch listing error:', err.response?.data); 
        setError(err.response?.data?.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    } else {
      setError('Invalid listing ID');
      setLoading(false);
    }
  }, [id]);


  const handleContact = async() => {
    if(contact === 'Contact Seller') {
      setContact('09139372248')
    }
    else{
      setContact('Contact Seller')
    }
  }

  if (loading) return <p>Loading listing...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="listing-detail-page">
      <Link to="/" className="back-link">← Back to Home</Link> 
      <h2>{listing.title}</h2>
      <div className="listing-detail-content">
        <div className="listing-images">
          {listing.images && listing.images.length > 0 ? (
            listing.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${listing.title} ${index + 1}`}
                className="listing-image"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.png';
                }}
              />
            ))
          ) : (
            <img src="/placeholder.png" alt="No image available" className="listing-image" />
          )}
        </div>
        <div className="listing-info">
          <p><strong>Price:</strong> ${listing.price.toFixed(2)}</p>
          <p><strong>Description:</strong> {listing.description}</p>
          <p><strong>Location:</strong> {listing.location}</p>
          <p><strong>Created:</strong> {new Date(listing.createdAt).toLocaleDateString()}</p>
          {listing.videos && listing.videos.length > 0 && (
            <div className="listing-videos">
              <h3>Videos</h3>
              {listing.videos.map((video, index) => (
                <video key={index} controls className="listing-video">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          )}
          <button type='submit' className='contact' onClick={handleContact}>{contact}</button>
        </div>
      </div>
    </div>
  );
};

export default GeneralListDetails;