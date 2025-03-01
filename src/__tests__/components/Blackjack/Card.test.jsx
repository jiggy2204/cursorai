import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../../../components/Blackjack/Card';

describe('Card Component', () => {
  const mockCard = {
    suit: '♥',
    value: 'K'
  };

  it('renders visible card correctly', () => {
    render(<Card card={mockCard} />);
    
    // Should show the card value twice (top and bottom)
    const cardValues = screen.getAllByText('K');
    expect(cardValues).toHaveLength(2);

    // Should show the suit three times (top, middle, and bottom)
    const cardSuits = screen.getAllByText('♥');
    expect(cardSuits).toHaveLength(3);
  });

  it('renders hidden card correctly', () => {
    render(<Card card={mockCard} isHidden={true} />);
    
    // Should not show any card values or suits
    expect(screen.queryByText('K')).not.toBeInTheDocument();
    expect(screen.queryByText('♥')).not.toBeInTheDocument();
  });

  it('applies correct color for red suits', () => {
    render(<Card card={mockCard} />);
    
    // Red suits (hearts and diamonds) should have red text
    const elements = screen.getAllByText(/[K♥]/);
    elements.forEach(element => {
      expect(element).toHaveClass('text-red-600');
    });
  });

  it('applies correct color for black suits', () => {
    const blackCard = { suit: '♠', value: 'Q' };
    render(<Card card={blackCard} />);
    
    // Black suits (spades and clubs) should have black text
    const elements = screen.getAllByText(/[Q♠]/);
    elements.forEach(element => {
      expect(element).toHaveClass('text-black');
    });
  });
}); 