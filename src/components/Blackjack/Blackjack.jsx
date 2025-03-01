import React, { useState, useEffect } from 'react';
import Card from './Card';
import {
  createDeck,
  shuffleDeck,
  calculateHandValue,
  isBusted,
  shouldDealerHit,
  determineWinner,
  hasBlackjack
} from '../../utils/gameLogic';

const Blackjack = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, playing, dealerTurn, ended
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState('');

  // Initialize or reset the game
  const initializeGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus('waiting');
    setWinner(null);
    setMessage('');
  };

  // Deal initial cards
  const dealInitialCards = () => {
    const newDeck = [...deck];
    const newPlayerHand = [newDeck.pop(), newDeck.pop()];
    const newDealerHand = [newDeck.pop(), newDeck.pop()];
    
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameStatus('playing');

    // Check for blackjack
    if (hasBlackjack(newPlayerHand) || hasBlackjack(newDealerHand)) {
      handleDealerTurn(newPlayerHand, newDealerHand, newDeck);
    }
  };

  // Handle player hit
  const handleHit = () => {
    const newDeck = [...deck];
    const card = newDeck.pop();
    const newPlayerHand = [...playerHand, card];
    
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

    if (isBusted(newPlayerHand)) {
      handleDealerTurn(newPlayerHand, dealerHand, newDeck);
    }
  };

  // Handle dealer's turn
  const handleDealerTurn = (currentPlayerHand, currentDealerHand, currentDeck) => {
    let newDealerHand = [...currentDealerHand];
    let newDeck = [...currentDeck];

    // Dealer draws cards until they should stand
    while (shouldDealerHit(newDealerHand) && !isBusted(currentPlayerHand)) {
      const card = newDeck.pop();
      newDealerHand = [...newDealerHand, card];
    }

    setDeck(newDeck);
    setDealerHand(newDealerHand);
    setGameStatus('ended');

    // Determine winner
    const gameWinner = determineWinner(currentPlayerHand, newDealerHand);
    setWinner(gameWinner);

    // Set end game message
    const playerValue = calculateHandValue(currentPlayerHand);
    const dealerValue = calculateHandValue(newDealerHand);
    
    if (gameWinner === 'player') {
      setMessage(`You win! (${playerValue} vs ${dealerValue})`);
    } else if (gameWinner === 'dealer') {
      setMessage(`Dealer wins! (${dealerValue} vs ${playerValue})`);
    } else {
      setMessage(`It's a tie! (${playerValue})`);
    }
  };

  // Handle player stand
  const handleStand = () => {
    handleDealerTurn(playerHand, dealerHand, deck);
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="min-h-screen bg-green-800 p-4 flex flex-col">
      {/* Game table */}
      <div className="flex-1 flex flex-col justify-between max-w-6xl mx-auto w-full">
        {/* Dealer's area */}
        <div className="mb-8">
          <h2 className="text-white text-xl mb-4">Dealer's Hand</h2>
          <div className="flex gap-4">
            {dealerHand.map((card, index) => (
              <Card
                key={`${card.suit}-${card.value}`}
                card={card}
                isHidden={gameStatus === 'playing' && index === 1}
              />
            ))}
          </div>
          {gameStatus !== 'playing' && dealerHand.length > 0 && (
            <div className="text-white mt-2">
              Value: {calculateHandValue(dealerHand)}
            </div>
          )}
        </div>

        {/* Game status and controls */}
        <div className="text-center mb-8">
          <div className="text-white text-2xl mb-4">{message}</div>
          {gameStatus === 'waiting' && (
            <button
              onClick={dealInitialCards}
              className="bg-yellow-500 text-black px-6 py-2 rounded-full text-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Deal
            </button>
          )}
          {gameStatus === 'playing' && (
            <div className="flex justify-center gap-4">
              <button
                onClick={handleHit}
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-bold hover:bg-blue-400 transition-colors"
              >
                Hit
              </button>
              <button
                onClick={handleStand}
                className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold hover:bg-red-400 transition-colors"
              >
                Stand
              </button>
            </div>
          )}
          {gameStatus === 'ended' && (
            <button
              onClick={initializeGame}
              className="bg-green-500 text-white px-6 py-2 rounded-full text-lg font-bold hover:bg-green-400 transition-colors"
            >
              Play Again
            </button>
          )}
        </div>

        {/* Player's area */}
        <div className="mb-4">
          <h2 className="text-white text-xl mb-4">Your Hand</h2>
          <div className="flex gap-4">
            {playerHand.map((card) => (
              <Card
                key={`${card.suit}-${card.value}`}
                card={card}
              />
            ))}
          </div>
          {playerHand.length > 0 && (
            <div className="text-white mt-2">
              Value: {calculateHandValue(playerHand)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blackjack; 