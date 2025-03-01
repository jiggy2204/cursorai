import React, { useState, useEffect } from 'react';
import Card from './Card';
import {
  createDeck,
  shuffleDeck,
  calculateHandValue,
  determineWinner,
  shouldDealerHit
} from './gameUtils';
import './Blackjack.css';

const Blackjack = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('betting'); // betting, playing, dealerTurn, gameOver
  const [message, setMessage] = useState('Place your bet!');
  const [bet, setBet] = useState(10);
  const [chips, setChips] = useState(1000);
  const [hideDealer, setHideDealer] = useState(true);

  const initializeGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus('betting');
    setMessage('Place your bet!');
    setHideDealer(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const dealInitialCards = () => {
    if (bet > chips) {
      setMessage('Not enough chips!');
      return;
    }

    const newDeck = [...deck];
    const newPlayerHand = [newDeck.pop(), newDeck.pop()];
    const newDealerHand = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameStatus('playing');
    setChips(chips - bet);
  };

  const hit = () => {
    const newDeck = [...deck];
    const newPlayerHand = [...playerHand, newDeck.pop()];
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

    const playerValue = calculateHandValue(newPlayerHand);
    if (playerValue > 21) {
      endGame();
    }
  };

  const stand = () => {
    setHideDealer(false);
    setGameStatus('dealerTurn');
    dealerPlay();
  };

  const dealerPlay = () => {
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];

    while (shouldDealerHit(currentDealerHand)) {
      currentDealerHand.push(currentDeck.pop());
    }

    setDealerHand(currentDealerHand);
    setDeck(currentDeck);
    endGame();
  };

  const endGame = () => {
    setHideDealer(false);
    setGameStatus('gameOver');
    const winner = determineWinner(playerHand, dealerHand);
    
    if (winner === 'player') {
      setMessage('You win!');
      setChips(chips + (bet * 2));
    } else if (winner === 'dealer') {
      setMessage('Dealer wins!');
    } else {
      setMessage('Push - it\'s a tie!');
      setChips(chips + bet);
    }
  };

  const renderHand = (hand, isDealer = false) => (
    <div className="hand-container">
      {hand.map((card, index) => (
        <div
          key={`${card.suit}-${card.value}-${index}`}
          style={{
            transform: `translateX(${index * -20}px)`,
            zIndex: index
          }}
        >
          <Card
            suit={card.suit}
            value={card.value}
            isHidden={isDealer && hideDealer && index === 1}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="blackjack-table max-w-5xl mx-auto">
      <div className="table-felt">
        <div className="chips-display">
          Chips: ${chips}
        </div>

        <div className="dealer-area">
          <h2 className="text-white text-xl mb-4 text-center">Dealer's Hand</h2>
          {gameStatus !== 'betting' && (
            <>
              {renderHand(dealerHand, true)}
              {!hideDealer && (
                <p className="text-white mt-4 text-center">
                  Value: {calculateHandValue(dealerHand)}
                </p>
              )}
            </>
          )}
        </div>

        <div className="player-area">
          <h2 className="text-white text-xl mb-4 text-center">Your Hand</h2>
          {gameStatus !== 'betting' && (
            <>
              {renderHand(playerHand)}
              <p className="text-white mt-4 text-center">
                Value: {calculateHandValue(playerHand)}
              </p>
            </>
          )}
        </div>

        <div className="game-controls mt-8">
          <div className="message-area mb-4">
            <p className="text-white text-xl text-center">{message}</p>
          </div>

          {gameStatus === 'betting' && (
            <div className="betting-area">
              <div className="flex flex-col items-center gap-4">
                <div className="bet-chip">
                  ${bet}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setBet(Math.max(10, bet - 10))}
                    className="action-button bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600"
                  >
                    - 10
                  </button>
                  <button
                    onClick={() => setBet(Math.min(chips, bet + 10))}
                    className="action-button bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600"
                  >
                    + 10
                  </button>
                </div>
                <button
                  onClick={dealInitialCards}
                  className="action-button bg-yellow-500 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400"
                >
                  Deal
                </button>
              </div>
            </div>
          )}

          {gameStatus === 'playing' && (
            <div className="flex justify-center gap-6">
              <button
                onClick={hit}
                className="action-button bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600"
              >
                Hit
              </button>
              <button
                onClick={stand}
                className="action-button bg-red-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-600"
              >
                Stand
              </button>
            </div>
          )}

          {gameStatus === 'gameOver' && (
            <div className="text-center">
              <button
                onClick={initializeGame}
                className="action-button bg-yellow-500 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blackjack; 