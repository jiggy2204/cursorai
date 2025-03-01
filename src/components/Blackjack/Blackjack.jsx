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
import './Blackjack.css';

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
    <div className="game-container">
      {/* Game table */}
      <div className="game-table">
        {/* Dealer's area */}
        <div className="hand-section dealer-section">
          <h2 className="hand-title">Dealer's Hand</h2>
          <div className="hand-cards">
            {dealerHand.map((card, index) => (
              <Card
                key={`${card.suit}-${card.value}`}
                card={card}
                isHidden={gameStatus === 'playing' && index === 1}
              />
            ))}
          </div>
          {gameStatus !== 'playing' && dealerHand.length > 0 && (
            <div className="hand-value">
              Value: {calculateHandValue(dealerHand)}
            </div>
          )}
        </div>

        {/* Game status and controls */}
        <div className="controls-section">
          <div className="game-message">{message}</div>
          {gameStatus === 'waiting' && (
            <button
              onClick={dealInitialCards}
              className="game-button deal-button"
            >
              Deal
            </button>
          )}
          {gameStatus === 'playing' && (
            <div className="action-buttons">
              <button
                onClick={handleHit}
                className="game-button hit-button"
              >
                Hit
              </button>
              <button
                onClick={handleStand}
                className="game-button stand-button"
              >
                Stand
              </button>
            </div>
          )}
          {gameStatus === 'ended' && (
            <button
              onClick={initializeGame}
              className="game-button play-again-button"
            >
              Play Again
            </button>
          )}
        </div>

        {/* Player's area */}
        <div className="hand-section player-section">
          <h2 className="hand-title">Your Hand</h2>
          <div className="hand-cards">
            {playerHand.map((card) => (
              <Card
                key={`${card.suit}-${card.value}`}
                card={card}
              />
            ))}
          </div>
          {playerHand.length > 0 && (
            <div className="hand-value">
              Value: {calculateHandValue(playerHand)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blackjack; 