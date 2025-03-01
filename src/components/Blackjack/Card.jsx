import React from 'react';

const Card = ({ suit, value, isHidden }) => {
  const getSuitSymbol = (suit) => {
    const symbols = {
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
      spades: '♠'
    };
    return symbols[suit] || '';
  };

  const getColor = (suit) => {
    return ['hearts', 'diamonds'].includes(suit) ? 'text-red-600' : 'text-black';
  };

  if (isHidden) {
    return (
      <div className="card w-[100px] h-[140px] rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-600 rounded-lg border-2 border-white flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   45deg,
                   rgba(255,255,255,0.1) 0px,
                   rgba(255,255,255,0.1) 2px,
                   transparent 2px,
                   transparent 8px
                 )`
               }}>
          </div>
          <div className="absolute inset-0"
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   -45deg,
                   rgba(255,255,255,0.1) 0px,
                   rgba(255,255,255,0.1) 2px,
                   transparent 2px,
                   transparent 8px
                 )`
               }}>
          </div>
          <div className="text-white text-4xl font-bold relative z-10 select-none">♠</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-[100px] h-[140px] rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out">
      <div className="w-full h-full bg-white rounded-lg border border-gray-300 flex flex-col items-center justify-between p-3 relative">
        {/* Top left corner */}
        <div className="absolute top-2 left-2 flex flex-col items-center">
          <div className={`text-xl font-bold ${getColor(suit)}`}>
            {value}
          </div>
          <div className={`text-xl ${getColor(suit)}`}>
            {getSuitSymbol(suit)}
          </div>
        </div>

        {/* Center symbol */}
        <div className={`text-5xl ${getColor(suit)} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
          {getSuitSymbol(suit)}
        </div>

        {/* Bottom right corner */}
        <div className="absolute bottom-2 right-2 flex flex-col items-center rotate-180">
          <div className={`text-xl font-bold ${getColor(suit)}`}>
            {value}
          </div>
          <div className={`text-xl ${getColor(suit)}`}>
            {getSuitSymbol(suit)}
          </div>
        </div>

        {/* Card shine effect */}
        <div className="absolute inset-0 rounded-lg pointer-events-none"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)',
               boxShadow: 'inset 0 0 2px rgba(0,0,0,0.1)'
             }}>
        </div>
      </div>
    </div>
  );
};

export default Card; 