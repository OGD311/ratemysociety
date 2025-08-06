import { SetStateAction, useState } from "react";
import StarRating from "./StarRating";


export default function StarInput({ rating, updateRating } : { rating: number, updateRating: (r: number) => void }) {

    const handleClick = (starValue: number) => {
    updateRating(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    setHoveredRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <div className="star-input">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: 'pointer',
            color: (hoveredRating !== null && hoveredRating >= starValue) || rating >= starValue ? 'gold' : 'lightgrey',
            fontSize: '2rem',
            transition: 'color 0.3s',
          }}
        >
            &#9733;
        </span>
      ))}
    </div>
  );
}