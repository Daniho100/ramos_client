import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    // Simulate form submission (log to console for now)
    console.log('Contact Form Submitted:', formData);
    setFormSuccess('Thank you for your message! We’ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <Link to="/" className="back-link">← Back to Home</Link>

      
      <section className="contact-hero">
        <h1>Get in Touch with Ramos Realty</h1>
        <p className="hero-tagline">We're Here to Help You Find Your Perfect Home</p>
        <Link to="#contact-form" className="cta-button">
          Send Us a Message
        </Link>
      </section>

      <section className="contact-section">
        <div className="contact-content">
          <div className="contact-form" id="contact-form">
            <h2>Contact Us</h2>
            {formError && <p className="error">{formError}</p>}
            {formSuccess && <p className="success">{formSuccess}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="cta-button">
                Submit
              </button>
            </form>
          </div>

          <div className="contact-details">
            <h2>Our Contact Information</h2>
            <div className="info-list">
              <span className="info">Phone: +234 123 456 7890</span>
              <span className="info">Email: info@ramosrealty.ng</span>
              <span className="info">Address: 123 Realty Avenue, Victoria Island, Lagos, Nigeria</span>
              <span className="info">Office Hours: Monday–Friday, 9 AM–5 PM</span>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <h2>Visit Us</h2>
        <p>Our office is conveniently located in the heart of Lagos. Drop by to discuss your real estate needs!</p>
        <div className="map-placeholder">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.576518986605!2d3.5377180999999998!3d6.448377799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf729a28bcf27%3A0x769337c76eb4f752!2sRamos%20Real%20Estate%20Nigeria!5e0!3m2!1sen!2sng!4v1749645265978!5m2!1sen!2sng"
            width="800"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ramos Realty Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;