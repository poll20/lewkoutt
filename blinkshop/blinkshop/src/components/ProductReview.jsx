
import React, { useState } from "react";
import './ProductReview.css';

const ProductReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false); // New state for full-screen mode

  const handleRating = (rate) => setRating(rate);
  const handleImageUpload = (e) => setImage(URL.createObjectURL(e.target.files[0]));
  
  const openFullscreen = () => setIsFullscreen(true); // Open full-screen mode
  const closeFullscreen = () => setIsFullscreen(false); // Close full-screen mode

  return (
    <div className="product-review">
      {/* Star Rating Section */}
      <div className="star-rating">
        <h3>Rate the product:</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <span
              key={index}
              className={hoverRating >= star || rating >= star ? "star filled" : "star"}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
        <p>Your Rating: {rating} Stars</p>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Leave a comment:</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          rows="4"
        />
      </div>

      {/* Image Upload Section */}
      <div className="image-upload">
        <h3>Upload a picture:</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <div
            className={`image-preview ${isFullscreen ? 'fullscreen' : ''}`} // Apply fullscreen class
            onClick={openFullscreen} // Trigger full screen on click
          >
            <h4>Preview:</h4>
            <img src={image} alt="Preview" />
          </div>
        )}
      </div>

      {/* Fullscreen Overlay with Close Button */}
      {isFullscreen && (
        <div className="fullscreen-overlay">
          <span className="close-icon" onClick={closeFullscreen}>&times;</span>
          <img src={image} alt="Fullscreen Preview" className="fullscreen-image" />
        </div>
      )}

      {/* Submit Button */}
      <div className="submit-review">
        <button>Submit Review</button>
      </div>
    </div>
  );
};

export default ProductReview;

