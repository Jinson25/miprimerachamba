import React from 'react';
import './StarRating.css';

export default function StarRating({ stars, size }) {
  const styles = {
    width: size + 'px',
    height: size + 'px',
    marginRight: size / 6 + 'px',
  };

  function Star({ number }) {
    const halfNumber = number - 0.5;

    return stars >= number ? (
      <img src="/star-full.svg" style={styles} alt={number} />
    ) : stars >= halfNumber ? (
      <img src="/star-half.svg" style={styles} alt={number} />
    ) : (
      <img src="/star-empty.svg" style={styles} alt={number} />
    );
  }

  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map(number => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}

StarRating.defaultProps = {
  size: 18,
};
