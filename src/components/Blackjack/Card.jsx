import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card, isHidden = false }) => {
  const isRed = card.suit === '♥' || card.suit === '♦';

  if (isHidden) {
    return (
      <div className="relative w-24 h-36 bg-blue-800 rounded-lg border-2 border-white shadow-lg transform transition-transform hover:scale-105">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-24 bg-blue-900 rounded-lg border border-blue-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-24 h-36 bg-white rounded-lg border-2 border-gray-300 shadow-lg transform transition-transform hover:scale-105">
      <div className={`absolute top-2 left-2 text-xl ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.value}
      </div>
      <div className={`absolute bottom-2 right-2 text-xl ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.value}
      </div>
      <div className={`absolute top-8 left-2 text-3xl ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.suit}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-5xl ${isRed ? 'text-red-600' : 'text-black'}`}>
          {card.suit}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  isHidden: PropTypes.bool,
};

export default Card; 