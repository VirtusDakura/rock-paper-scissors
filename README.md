# 🎮 Rock-Paper-Scissors - Ultimate Edition# Rock-Paper-Scissors



A modern, feature-rich Rock-Paper-Scissors game built with vanilla JavaScript and styled with TailwindCSS. This isn't your ordinary RPS game - it's packed with unique features, smart AI, and a beautiful UI!Rock-Paper-Scissors is a simple game written in JavaScript. This game allows users to play the classic hand game "Rock-Paper-Scissors" against the computer.



![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)## Features

![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.x-06B6D4.svg)- Play as a human against a computer opponent

- There is an auto play session

## ✨ Features- Simple text-based interface for quick and fun gameplay

- Randomized computer moves for unpredictable outcomes

### 🎯 Multiple Game Modes- Score tracking for wins, losses, and ties

- **Classic Mode**: Traditional Rock, Paper, Scissors (✊✋✌️)- Clean and easy-to-understand source code for learning purposes

- **RPSLS Mode**: Rock, Paper, Scissors, Lizard, Spock (✊✋✌️🦎🖖) - Big Bang Theory variant!

## How to Play

### 🤖 Smart AI with Multiple Difficulty Levels

- **Easy**: Random moves - perfect for beginners1. Run the rock-paper-scissors.html on the browser.

- **Medium**: Pattern detection - learns your favorite moves2. Choose one of the options: Rock, Paper, or Scissors.

- **Hard**: Counter-strategy AI - predicts your next move based on history3. The computer will randomly select its move.

4. The game will display the winner for each round.

### 🏆 Gamification Elements

- **Achievements System**: Unlock badges for milestones (First Victory, Veteran, Master, etc.)## Rules

- **Win Streak Tracking**: Keep track of consecutive wins with 🔥 streak counter

- **Statistics Dashboard**: Comprehensive stats including:- **Rock** beats **Scissors**

  - Total wins, losses, and ties- **Scissors** beat **Paper**

  - Win rate percentage- **Paper** beats **Rock**

  - Best streak record- If both the player and computer choose the same option, it’s a tie.

  - Total games played

- **Persistent Progress**: All stats saved to localStorage## Usage



### 🎨 Modern UI/UXClone the repository and run the game file:

- **Beautiful Glass-morphism Design**: Frosted glass effects with backdrop blur

- **Smooth Animations**: ```bash

  - Bounce-in effects for choicesgit clone https://github.com/VirtusDakura/rock-paper-scissors.git

  - Shake animation on losscd rock-paper-scissors

  - Confetti celebration on wins```

  - Pulse glow effects

  - Smooth transitions throughoutFollow the on-screen prompts to play.

- **Dark/Light Theme**: Toggle between themes with persistent preference

- **Fully Responsive**: Perfect on desktop, tablet, and mobile devices## Contributing

- **Real-time Score Display**: Live updates of scores and round progress

Contributions to improve the game, add new features, or update the interface are welcome. Please fork the repository and submit a pull request!

### 🎵 Audio & Visual Feedback

- **Sound Effects**: ## License

  - Click sounds for buttons

  - Countdown beepsThis project is licensed under the [MIT License](LICENSE).

  - Victory/defeat tones
  - Celebration sounds
- **Visual Effects**:
  - Confetti particles on wins
  - Screen shake on losses
  - Animated choice reveals
  - Color-coded results

### 📊 Game Customization
- **Flexible Round Options**: Choose best of 3, 5, 7, or endless mode
- **Match History**: See all your moves in the current game
- **Settings Panel**: Toggle sound effects, music, and animations

### 💾 Progress Persistence
- Statistics saved automatically
- Settings remembered across sessions
- Theme preference stored
- No account needed - all stored locally!

## 🎮 How to Play

1. **Open the game** - Simply open `rock-paper-scissors.html` in your browser
2. **Choose your mode** - Classic or RPSLS
3. **Select difficulty** - Easy, Medium, or Hard AI
4. **Pick number of rounds** - Best of 3, 5, 7, or endless
5. **Start playing** - Click on your choice and watch the battle!
6. **Track your progress** - View stats and unlock achievements

## 📖 Game Rules

### Classic Mode (Rock-Paper-Scissors)
- **Rock** (✊) beats **Scissors** (✌️)
- **Scissors** (✌️) beats **Paper** (✋)
- **Paper** (✋) beats **Rock** (✊)

### RPSLS Mode (Rock-Paper-Scissors-Lizard-Spock)
- **Rock** (✊) beats **Scissors** (✌️) and **Lizard** (🦎)
- **Paper** (✋) beats **Rock** (✊) and **Spock** (🖖)
- **Scissors** (✌️) beats **Paper** (✋) and **Lizard** (🦎)
- **Lizard** (🦎) beats **Paper** (✋) and **Spock** (🖖)
- **Spock** (🖖) beats **Rock** (✊) and **Scissors** (✌️)

## 🚀 Quick Start

### Option 1: Clone and Play
```bash
git clone https://github.com/VirtusDakura/rock-paper-scissors.git
cd rock-paper-scissors
# Open rock-paper-scissors.html in your browser
```

### Option 2: Direct Download
1. Download the repository as ZIP
2. Extract files
3. Open `rock-paper-scissors.html` in any modern browser

### No Installation Required!
- No dependencies to install
- No build process needed
- Just open and play!

## 🛠️ Technical Stack

- **HTML5**: Semantic structure
- **TailwindCSS**: Utility-first styling via CDN
- **Vanilla JavaScript (ES6+)**: 
  - Class-based architecture
  - Modern ES6+ features
  - Web Audio API for sounds
  - LocalStorage API for persistence
  - No external libraries needed!

## 🎯 Code Architecture

```javascript
class RockPaperScissorsGame {
  - Game state management
  - AI difficulty algorithms
  - Statistics tracking
  - Event handling
  - Audio/visual effects
  - LocalStorage persistence
}
```

### Key Features in Code:
- **Modular Design**: Clean, organized class-based structure
- **Smart AI**: Pattern recognition and prediction algorithms
- **Responsive**: Mobile-first design approach
- **Accessible**: Semantic HTML and ARIA labels
- **Performant**: Optimized animations and effects

## 🏆 Achievements

Unlock these achievements as you play:

| Achievement | Description | Emoji |
|------------|-------------|-------|
| First Victory | Win your first game | 🏆 |
| Veteran | Win 10 games | ⭐ |
| Master | Win 50 games | 👑 |
| On Fire! | Win 5 in a row | 🔥 |
| Unstoppable | Win 10 in a row | 💪 |
| Dedicated | Play 100 games | 🎮 |

## 🎨 Screenshots & Demo

### Main Menu
- Choose game mode (Classic/RPSLS)
- Select AI difficulty
- Pick number of rounds

### Game Screen
- Real-time score tracking
- Animated choice reveals
- Match history display
- Win streak counter

### Statistics Dashboard
- Comprehensive stats
- Achievement badges
- Win rate tracking

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- Add more game modes (tournaments, time trials)
- Implement online multiplayer
- Add more achievements
- Create custom themes
- Improve AI algorithms
- Add voice announcements
- Implement replay system

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

### Version 2.0.0 (Current)
- ✨ Complete UI overhaul with TailwindCSS
- 🤖 Added multiple AI difficulty levels
- 🎮 Implemented RPSLS mode
- 🏆 Added achievements system
- 📊 Built comprehensive statistics tracking
- 🎨 Added dark/light theme support
- 🎵 Implemented sound effects
- ✨ Added animations and visual effects
- 💾 Added localStorage persistence
- 📱 Made fully responsive

### Version 1.0.0
- Basic console-based RPS game
- Simple prompt-based input
- 5-round gameplay

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author

**VirtusDakura**
- GitHub: [@VirtusDakura](https://github.com/VirtusDakura)

## 🙏 Acknowledgments

- Inspired by the classic hand game
- RPSLS variant from "The Big Bang Theory"
- TailwindCSS for the amazing utility-first framework
- The open-source community

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? [Open an issue](https://github.com/VirtusDakura/rock-paper-scissors/issues)!

---

**Made with ❤️ and JavaScript**

*Enjoy the game and may the odds be ever in your favor! 🎮*
