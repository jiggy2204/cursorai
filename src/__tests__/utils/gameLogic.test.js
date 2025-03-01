import { describe, it, expect } from 'vitest';
import {
  createDeck,
  shuffleDeck,
  calculateHandValue,
  isBusted,
  shouldDealerHit,
  determineWinner,
  hasBlackjack,
  SUITS,
  VALUES
} from '../../utils/gameLogic';

describe('Game Logic', () => {
  describe('createDeck', () => {
    it('should create a deck with 52 cards', () => {
      const deck = createDeck();
      expect(deck.length).toBe(52);
    });

    it('should contain all combinations of suits and values', () => {
      const deck = createDeck();
      SUITS.forEach(suit => {
        VALUES.forEach(value => {
          expect(deck).toContainEqual({ suit, value });
        });
      });
    });
  });

  describe('shuffleDeck', () => {
    it('should return an array of the same length', () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      expect(shuffled.length).toBe(deck.length);
    });

    it('should contain all the same cards as the original deck', () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      deck.forEach(card => {
        expect(shuffled).toContainEqual(card);
      });
    });
  });

  describe('calculateHandValue', () => {
    it('should correctly calculate numeric cards', () => {
      const hand = [
        { suit: '♠', value: '2' },
        { suit: '♣', value: '5' }
      ];
      expect(calculateHandValue(hand)).toBe(7);
    });

    it('should correctly calculate face cards', () => {
      const hand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: 'Q' }
      ];
      expect(calculateHandValue(hand)).toBe(20);
    });

    it('should correctly calculate aces as 11 when possible', () => {
      const hand = [
        { suit: '♠', value: 'A' },
        { suit: '♣', value: '5' }
      ];
      expect(calculateHandValue(hand)).toBe(16);
    });

    it('should correctly calculate aces as 1 when necessary', () => {
      const hand = [
        { suit: '♠', value: 'A' },
        { suit: '♣', value: 'K' },
        { suit: '♥', value: '5' }
      ];
      expect(calculateHandValue(hand)).toBe(16);
    });
  });

  describe('isBusted', () => {
    it('should return true when hand value exceeds 21', () => {
      const hand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: 'Q' },
        { suit: '♥', value: '2' }
      ];
      expect(isBusted(hand)).toBe(true);
    });

    it('should return false when hand value is 21 or less', () => {
      const hand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: 'Q' }
      ];
      expect(isBusted(hand)).toBe(false);
    });
  });

  describe('shouldDealerHit', () => {
    it('should hit on 16', () => {
      const hand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: '6' }
      ];
      expect(shouldDealerHit(hand)).toBe(true);
    });

    it('should stand on 17', () => {
      const hand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: '7' }
      ];
      expect(shouldDealerHit(hand)).toBe(false);
    });
  });

  describe('hasBlackjack', () => {
    it('should return true for Ace + 10-value card', () => {
      const hand = [
        { suit: '♠', value: 'A' },
        { suit: '♣', value: 'K' }
      ];
      expect(hasBlackjack(hand)).toBe(true);
    });

    it('should return false for 21 with more than 2 cards', () => {
      const hand = [
        { suit: '♠', value: '7' },
        { suit: '♣', value: '7' },
        { suit: '♥', value: '7' }
      ];
      expect(hasBlackjack(hand)).toBe(false);
    });
  });

  describe('determineWinner', () => {
    it('should declare dealer winner when player busts', () => {
      const playerHand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: 'Q' },
        { suit: '♥', value: '2' }
      ];
      const dealerHand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: '5' }
      ];
      expect(determineWinner(playerHand, dealerHand)).toBe('dealer');
    });

    it('should declare player winner when dealer busts', () => {
      const playerHand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: '5' }
      ];
      const dealerHand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: 'Q' },
        { suit: '♥', value: '2' }
      ];
      expect(determineWinner(playerHand, dealerHand)).toBe('player');
    });

    it('should declare tie when both have same value', () => {
      const playerHand = [
        { suit: '♠', value: 'K' },
        { suit: '♣', value: '5' }
      ];
      const dealerHand = [
        { suit: '♥', value: 'Q' },
        { suit: '♦', value: '5' }
      ];
      expect(determineWinner(playerHand, dealerHand)).toBe('tie');
    });
  });
}); 