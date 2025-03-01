# Blackjack Game in React

A modern implementation of the classic Blackjack card game built with React and Vite using Cursor AI.

## 🎮 Features

- Interactive Blackjack gameplay
- Input sanitization for secure gameplay
- Clean and intuitive user interface
- Game state management using React hooks

## 🛠️ Technology Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **ESLint** - Code linting and formatting
- **CSS Modules** - Scoped styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jiggy2204/cursorai.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cursorai
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 🎯 How to Play

1. Start a new game by clicking the "Deal" button
2. Choose to either:
   - "Hit" to receive another card
   - "Stand" to keep your current hand
3. Try to get as close to 21 as possible without going over
4. Beat the dealer's hand to win!

## 📁 Project Structure

```
src/
├── components/
│   ├── Blackjack/
│   │   ├── Blackjack.jsx    # Main game component
│   │   ├── Card.jsx         # Card component
│   │   ├── gameUtils.js     # Game logic utilities
│   │   └── Blackjack.css    # Game styles
│   └── SafeInput.jsx        # Input sanitization component
├── utils/
│   └── inputSanitizer.js    # Input validation utilities
├── App.jsx                  # Root component
└── main.jsx                # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with React and Vite
- Created as part of a learning project
- Special thanks to the React community

## 📫 Contact

For questions or feedback, please open an issue on the GitHub repository.
