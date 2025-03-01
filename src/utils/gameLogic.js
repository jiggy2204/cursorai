// Card suits and values
export const SUITS = ['♠', '♣', '♥', '♦'];
export const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create a deck of cards
export const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Calculate hand value considering Aces
export const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.value === 'A') {
      aces += 1;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }

  // Add aces
  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  return value;
};

// Check if hand is busted
export const isBusted = (hand) => calculateHandValue(hand) > 21;

// Determine if dealer should hit (dealer hits on 16 and below, stands on 17 and above)
export const shouldDealerHit = (hand) => calculateHandValue(hand) < 17;

// Determine winner
export const determineWinner = (playerHand, dealerHand) => {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (isBusted(playerHand)) return 'dealer';
  if (isBusted(dealerHand)) return 'player';
  if (playerValue > dealerValue) return 'player';
  if (dealerValue > playerValue) return 'dealer';
  return 'tie';
};

// Check for blackjack (21 with exactly 2 cards)
export const hasBlackjack = (hand) => {
  return hand.length === 2 && calculateHandValue(hand) === 21;
}; 