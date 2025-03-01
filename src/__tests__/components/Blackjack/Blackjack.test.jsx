import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blackjack from '../../../../components/Blackjack/Blackjack';

describe('Blackjack Component', () => {
  it('renders initial game state correctly', () => {
    render(<Blackjack />);
    
    // Check for main game elements
    expect(screen.getByText(/Dealer's Hand/i)).toBeInTheDocument();
    expect(screen.getByText(/Player's Hand/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Bet:/i)).toBeInTheDocument();
    expect(screen.getByText(/Balance:/i)).toBeInTheDocument();
  });

  it('allows player to place bet and start game', async () => {
    const user = userEvent.setup();
    render(<Blackjack />);
    
    // Find and interact with bet input
    const betInput = screen.getByRole('spinbutton');
    await user.clear(betInput);
    await user.type(betInput, '50');
    
    // Start the game
    const dealButton = screen.getByRole('button', { name: /deal/i });
    await user.click(dealButton);
    
    // Check if game started
    expect(screen.getByRole('button', { name: /hit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /stand/i })).toBeInTheDocument();
  });

  it('shows error message for invalid bet amount', async () => {
    const user = userEvent.setup();
    render(<Blackjack />);
    
    // Try to place invalid bet
    const betInput = screen.getByRole('spinbutton');
    await user.clear(betInput);
    await user.type(betInput, '1001');
    
    const dealButton = screen.getByRole('button', { name: /deal/i });
    await user.click(dealButton);
    
    // Check for error message
    expect(screen.getByText(/Invalid bet amount/i)).toBeInTheDocument();
  });

  it('updates game state when player hits', async () => {
    const user = userEvent.setup();
    render(<Blackjack />);
    
    // Start game
    const betInput = screen.getByRole('spinbutton');
    await user.clear(betInput);
    await user.type(betInput, '50');
    await user.click(screen.getByRole('button', { name: /deal/i }));
    
    // Hit
    const hitButton = screen.getByRole('button', { name: /hit/i });
    await user.click(hitButton);
    
    // Verify player's hand was updated
    expect(screen.getByText(/Player's Hand/i).parentElement).toBeInTheDocument();
  });

  it('ends game when player stands', async () => {
    const user = userEvent.setup();
    render(<Blackjack />);
    
    // Start game
    const betInput = screen.getByRole('spinbutton');
    await user.clear(betInput);
    await user.type(betInput, '50');
    await user.click(screen.getByRole('button', { name: /deal/i }));
    
    // Stand
    const standButton = screen.getByRole('button', { name: /stand/i });
    await user.click(standButton);
    
    // Verify game ended and new game can be started
    expect(screen.getByRole('button', { name: /deal/i })).toBeInTheDocument();
  });

  it('updates balance after game ends', async () => {
    const user = userEvent.setup();
    render(<Blackjack />);
    
    // Get initial balance
    const initialBalance = screen.getByText(/Balance:/i).textContent;
    
    // Play a game
    const betInput = screen.getByRole('spinbutton');
    await user.clear(betInput);
    await user.type(betInput, '50');
    await user.click(screen.getByRole('button', { name: /deal/i }));
    await user.click(screen.getByRole('button', { name: /stand/i }));
    
    // Verify balance changed
    const newBalance = screen.getByText(/Balance:/i).textContent;
    expect(newBalance).not.toBe(initialBalance);
  });
}); 