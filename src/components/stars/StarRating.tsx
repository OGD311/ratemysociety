import React from 'react';
import StarIcon from './StarIcon';


export default function StarRating({ rating } : {rating: number}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <span key={i}>
          <StarIcon color="gold" />
        </span>
      );
    } else if (rating > i - 1 && rating < i) {
      const fillPercent = (rating - (i - 1)) * 100;
      stars.push(
        <span key={i} style={{ width: '1.25rem', height: '1.25rem', position: 'relative' }}>
          <span style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
            <StarIcon color="lightgrey" />
          </span>
          <span style={{position: 'absolute', width: `${fillPercent}%`, height: '100%', top: 0, left: 0, overflow: 'hidden' }}>
            <StarIcon color="gold" />
          </span>
        </span>
      );
    } else {
      stars.push(
        <span key={i}>
          <StarIcon color="lightgrey" />
        </span>
      );
    }
  }

  return <span style={{ display: 'inline-flex' }}>{stars}</span>;
};
