# React Blackjack Game

A modern implementation of the classic Blackjack card game built with React and Vite. Play against an AI dealer in this interactive web-based version of the popular casino game.

## 🎮 Game Features

- Classic Blackjack gameplay against an AI dealer
- Realistic card animations and styling
- Automatic card value calculation
- Dealer AI follows standard casino rules (hits on 16 and below, stands on 17 and above)
- Responsive design for both desktop and mobile play

## 🛠️ Technologies Used

- React 18
- Vite
- CSS3 with modern animations
- JavaScript ES6+

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

## 🚀 Installation

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

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 🎯 How to Play

1. **Start a New Game**
   - Click the "Deal" button to start a new game
   - You and the dealer will each receive two cards
   - One of the dealer's cards remains hidden until your turn is complete

2. **Player Actions**
   - **Hit**: Click to receive another card
   - **Stand**: Click to keep your current hand and end your turn
   - Try to get as close to 21 as possible without going over

3. **Card Values**
   - Number cards (2-10): Face value
   - Face cards (J, Q, K): 10 points
   - Ace: 1 or 11 points (automatically calculated for best hand)

4. **Winning Conditions**
   - Get closer to 21 than the dealer
   - Dealer busts (goes over 21)
   - Get a Blackjack (Ace + 10-value card)

5. **Dealer Rules**
   - Dealer must hit on 16 or below
   - Dealer must stand on 17 or above
   - Dealer's hidden card is revealed when player stands

## 💻 Development

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- Created as part of a learning project
- Special thanks to the React community

## 📫 Contact

For questions or feedback, please open an issue on the GitHub repository.
