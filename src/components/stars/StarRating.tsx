import React from 'react';

const StarIcon: React.FC<{color: string, width?: number, height?: number}> = ({ color, width = 20, height = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={width} height={height}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function StarRating({ rating } : {rating: number}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <span key={i} style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block' }}>
          <StarIcon color="#fbbf24" />
        </span>
      );
    } else if (rating > i - 1 && rating < i) {
      const fillPercent = (rating - (i - 1)) * 100;
      stars.push(
        <span
          key={i}
          style={{
            width: '1.25rem',
            height: '1.25rem',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
          >
            <StarIcon color="#d1d5db" />
          </span>
          <span
            style={{
              position: 'absolute',
              width: `${fillPercent}%`,
              height: '100%',
              top: 0,
              left: 0,
              overflow: 'hidden',
            }}
          >
            <StarIcon color="#fbbf24" />
          </span>
        </span>
      );
    } else {
      stars.push(
        <span key={i} style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block' }}>
          <StarIcon color="#d1d5db" />
        </span>
      );
    }
  }

  return <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>{stars}</span>;
};
