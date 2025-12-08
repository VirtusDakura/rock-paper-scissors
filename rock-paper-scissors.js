// ============================================
// ROCK PAPER SCISSORS - ULTIMATE EDITION
// ============================================

class RockPaperScissorsGame {
  constructor() {
    // Game state
    this.gameMode = 'classic'; // 'classic' or 'rpsls'
    this.difficulty = 'easy'; // 'easy', 'medium', 'hard'
    this.totalRounds = 5;
    this.currentRound = 0;
    this.playerScore = 0;
    this.computerScore = 0;
    this.currentStreak = 0;
    this.isGameActive = false;
    
    // AI patterns for medium and hard difficulty
    this.playerHistory = [];
    this.lastThreeMoves = [];
    
    // Statistics
    this.stats = this.loadStats();
    
    // Settings
    this.settings = {
      soundEnabled: true,
      musicEnabled: false,
      animationsEnabled: true
    };
    
    // Game rules
    this.classicRules = {
      rock: ['scissors'],
      paper: ['rock'],
      scissors: ['paper']
    };
    
    this.rpslsRules = {
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['paper', 'spock'],
      spock: ['rock', 'scissors']
    };
    
    // Choice emojis
    this.emojis = {
      rock: '✊',
      paper: '✋',
      scissors: '✌️',
      lizard: '🦎',
      spock: '🖖'
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadSettings();
    this.updateStatsDisplay();
    this.checkAchievements();
  }
  
  setupEventListeners() {
    // Mode selection
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('ring-4', 'ring-indigo-500'));
        e.currentTarget.classList.add('ring-4', 'ring-indigo-500');
        this.gameMode = e.currentTarget.dataset.mode;
        this.playSound('click');
      });
    });
    
    // Difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('ring-4', 'ring-indigo-500'));
        e.currentTarget.classList.add('ring-4', 'ring-indigo-500');
        this.difficulty = e.currentTarget.dataset.difficulty;
        this.playSound('click');
      });
    });
    
    // Rounds selection
    document.querySelectorAll('.rounds-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.rounds-btn').forEach(b => b.classList.remove('ring-4', 'ring-indigo-500'));
        e.currentTarget.classList.add('ring-4', 'ring-indigo-500');
        const rounds = e.currentTarget.dataset.rounds;
        this.totalRounds = rounds === 'endless' ? Infinity : parseInt(rounds);
        this.playSound('click');
      });
    });
    
    // Start game button
    document.getElementById('start-game-btn').addEventListener('click', () => {
      this.startGame();
    });
    
    // Choice buttons
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const choice = e.currentTarget.dataset.choice;
        this.playRound(choice);
      });
    });
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Stats button
    document.getElementById('stats-btn').addEventListener('click', () => {
      this.showStatsModal();
    });
    
    // Settings button
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.showSettingsModal();
    });
    
    // Modal close buttons
    document.getElementById('close-stats').addEventListener('click', () => {
      this.closeStatsModal();
    });
    
    document.getElementById('close-settings').addEventListener('click', () => {
      this.closeSettingsModal();
    });
    
    // Close modals when clicking outside
    document.getElementById('stats-modal').addEventListener('click', (e) => {
      if (e.target.id === 'stats-modal') {
        this.closeStatsModal();
      }
    });
    
    document.getElementById('settings-modal').addEventListener('click', (e) => {
      if (e.target.id === 'settings-modal' || e.target.classList.contains('modal-overlay')) {
        this.closeSettingsModal();
      }
    });
    
    document.getElementById('gameover-modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        document.getElementById('gameover-modal').classList.add('hidden');
      }
    });
    
    // Quit game button
    document.getElementById('quit-game-btn').addEventListener('click', () => {
      this.quitGame();
    });
    
    // Game over modal buttons
    document.getElementById('play-again-btn').addEventListener('click', () => {
      document.getElementById('gameover-modal').classList.add('hidden');
      this.startGame();
    });
    
    document.getElementById('main-menu-btn').addEventListener('click', () => {
      document.getElementById('gameover-modal').classList.add('hidden');
      this.showModeScreen();
    });
    
    // Reset stats button
    document.getElementById('reset-stats').addEventListener('click', () => {
      this.showConfirmModal(
        '⚠️',
        'Reset Statistics',
        'Are you sure you want to reset all statistics? This cannot be undone.',
        () => this.resetStats()
      );
    });
    
    // Confirmation modal buttons
    document.getElementById('confirm-cancel-btn').addEventListener('click', () => {
      this.closeConfirmModal();
    });
    
    document.getElementById('confirm-yes-btn').addEventListener('click', () => {
      if (this.confirmCallback) {
        this.confirmCallback();
      }
      this.closeConfirmModal();
    });
    
    // Close confirm modal when clicking outside
    document.getElementById('confirm-modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closeConfirmModal();
      }
    });
    
    // Settings toggles
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
      this.settings.soundEnabled = e.target.checked;
      this.saveSettings();
    });
    
    document.getElementById('music-toggle').addEventListener('change', (e) => {
      this.settings.musicEnabled = e.target.checked;
      this.saveSettings();
    });
    
    document.getElementById('animation-toggle').addEventListener('change', (e) => {
      this.settings.animationsEnabled = e.target.checked;
      this.saveSettings();
    });
  }
  
  startGame() {
    this.currentRound = 0;
    this.playerScore = 0;
    this.computerScore = 0;
    this.currentStreak = 0;
    this.playerHistory = [];
    this.lastThreeMoves = [];
    this.isGameActive = true;
    
    // Hide mode screen, show game screen
    document.getElementById('mode-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Show/hide appropriate choice buttons
    if (this.gameMode === 'classic') {
      document.getElementById('classic-choices').classList.remove('hidden');
      document.getElementById('rpsls-choices').classList.add('hidden');
    } else {
      document.getElementById('classic-choices').classList.add('hidden');
      document.getElementById('rpsls-choices').classList.remove('hidden');
    }
    
    // Update UI
    this.updateScoreDisplay();
    this.updateRoundDisplay();
    document.getElementById('difficulty-display').textContent = 
      `${this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)} Mode - ${this.gameMode === 'classic' ? 'Classic' : 'RPSLS'}`;
    
    // Clear history
    document.getElementById('history-container').innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">No moves yet</p>';
    
    // Reset displays
    document.getElementById('player-choice-display').textContent = '❓';
    document.getElementById('computer-choice-display').textContent = '❓';
    document.getElementById('result-message').innerHTML = '<p class="text-3xl font-bold text-gray-800 dark:text-white">Make Your Move!</p>';
    
    this.playSound('start');
  }
  
  playRound(playerChoice) {
    if (!this.isGameActive) return;
    
    this.currentRound++;
    const computerChoice = this.getComputerChoice();
    
    // Store player history for AI learning
    this.playerHistory.push(playerChoice);
    if (this.playerHistory.length > 10) {
      this.playerHistory.shift();
    }
    
    // Update last three moves for pattern detection
    this.lastThreeMoves.push(playerChoice);
    if (this.lastThreeMoves.length > 3) {
      this.lastThreeMoves.shift();
    }
    
    // Animate choices
    this.animateChoices(playerChoice, computerChoice);
    
    // Determine winner
    setTimeout(() => {
      const result = this.determineWinner(playerChoice, computerChoice);
      this.updateGameState(result);
      this.updateHistory(playerChoice, computerChoice, result);
      
      // Check if game is over
      if (this.currentRound >= this.totalRounds) {
        setTimeout(() => this.endGame(), 1500);
      }
    }, 1000);
  }
  
  getComputerChoice() {
    const rules = this.gameMode === 'classic' ? this.classicRules : this.rpslsRules;
    const choices = Object.keys(rules);
    
    switch (this.difficulty) {
      case 'easy':
        return this.getRandomChoice(choices);
        
      case 'medium':
        return this.getMediumChoice(choices);
        
      case 'hard':
        return this.getHardChoice(choices);
        
      default:
        return this.getRandomChoice(choices);
    }
  }
  
  getRandomChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
  }
  
  getMediumChoice(choices) {
    // Pattern detection: if player has a favorite, counter it 40% of the time
    if (this.playerHistory.length >= 5) {
      const favChoice = this.getMostFrequentChoice(this.playerHistory);
      if (Math.random() < 0.4) {
        return this.getCounterMove(favChoice);
      }
    }
    return this.getRandomChoice(choices);
  }
  
  getHardChoice(choices) {
    // Advanced strategy: predict based on last 3 moves
    if (this.lastThreeMoves.length === 3) {
      // 60% chance to counter predicted move
      if (Math.random() < 0.6) {
        const predicted = this.predictNextMove();
        return this.getCounterMove(predicted);
      }
    }
    
    // 30% chance to counter most frequent choice
    if (this.playerHistory.length >= 5 && Math.random() < 0.3) {
      const favChoice = this.getMostFrequentChoice(this.playerHistory);
      return this.getCounterMove(favChoice);
    }
    
    return this.getRandomChoice(choices);
  }
  
  getMostFrequentChoice(history) {
    const frequency = {};
    history.forEach(choice => {
      frequency[choice] = (frequency[choice] || 0) + 1;
    });
    return Object.keys(frequency).reduce((a, b) => 
      frequency[a] > frequency[b] ? a : b
    );
  }
  
  predictNextMove() {
    // Simple prediction: if there's a pattern in last 3 moves
    const [a, b, c] = this.lastThreeMoves;
    
    // If repeating pattern
    if (a === b && b === c) return a;
    
    // If alternating
    if (a === c && a !== b) return b;
    
    // Default to most frequent
    return this.getMostFrequentChoice(this.playerHistory);
  }
  
  getCounterMove(choice) {
    const rules = this.gameMode === 'classic' ? this.classicRules : this.rpslsRules;
    const allChoices = Object.keys(rules);
    
    // Find moves that beat the given choice
    const counterMoves = allChoices.filter(move => 
      rules[move].includes(choice)
    );
    
    return counterMoves[Math.floor(Math.random() * counterMoves.length)];
  }
  
  determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return 'tie';
    }
    
    const rules = this.gameMode === 'classic' ? this.classicRules : this.rpslsRules;
    
    if (rules[playerChoice].includes(computerChoice)) {
      return 'win';
    } else {
      return 'lose';
    }
  }
  
  updateGameState(result) {
    if (result === 'win') {
      this.playerScore++;
      this.currentStreak++;
      this.stats.totalWins++;
      this.playSound('win');
      this.showConfetti();
      this.showResultMessage('You Win! 🎉', 'text-green-600 dark:text-green-400');
    } else if (result === 'lose') {
      this.computerScore++;
      this.currentStreak = 0;
      this.stats.totalLosses++;
      this.playSound('lose');
      this.shakeScreen();
      this.showResultMessage('You Lose! 😢', 'text-red-600 dark:text-red-400');
    } else {
      this.stats.totalTies++;
      this.playSound('tie');
      this.showResultMessage("It's a Tie! 🤝", 'text-yellow-600 dark:text-yellow-400');
    }
    
    // Update best streak
    if (this.currentStreak > this.stats.bestStreak) {
      this.stats.bestStreak = this.currentStreak;
    }
    
    this.stats.gamesPlayed = this.stats.totalWins + this.stats.totalLosses + this.stats.totalTies;
    this.saveStats();
    
    this.updateScoreDisplay();
    this.updateRoundDisplay();
    this.checkAchievements();
  }
  
  animateChoices(playerChoice, computerChoice) {
    const playerDisplay = document.getElementById('player-choice-display');
    const computerDisplay = document.getElementById('computer-choice-display');
    
    // Show loading
    playerDisplay.textContent = '❓';
    computerDisplay.textContent = '❓';
    
    // Animate countdown
    let countdown = 3;
    const countdownInterval = setInterval(() => {
      document.getElementById('result-message').innerHTML = 
        `<p class="text-5xl font-bold text-gray-800 dark:text-white">${countdown}</p>`;
      countdown--;
      
      if (countdown < 0) {
        clearInterval(countdownInterval);
        playerDisplay.textContent = this.emojis[playerChoice];
        computerDisplay.textContent = this.emojis[computerChoice];
        
        if (this.settings.animationsEnabled) {
          playerDisplay.classList.add('bounce-in');
          computerDisplay.classList.add('bounce-in');
          setTimeout(() => {
            playerDisplay.classList.remove('bounce-in');
            computerDisplay.classList.remove('bounce-in');
          }, 500);
        }
      }
    }, 300);
    
    this.playSound('countdown');
  }
  
  showResultMessage(message, colorClass) {
    const resultEl = document.getElementById('result-message');
    resultEl.innerHTML = `<p class="text-3xl font-bold ${colorClass}">${message}</p>`;
  }
  
  updateScoreDisplay() {
    document.getElementById('player-score').textContent = this.playerScore;
    document.getElementById('computer-score').textContent = this.computerScore;
    document.getElementById('streak-counter').textContent = `🔥 Streak: ${this.currentStreak}`;
  }
  
  updateRoundDisplay() {
    const roundText = this.totalRounds === Infinity ? 
      `Round ${this.currentRound}` : 
      `${this.currentRound} / ${this.totalRounds}`;
    document.getElementById('round-counter').textContent = roundText;
  }
  
  updateHistory(playerChoice, computerChoice, result) {
    const historyContainer = document.getElementById('history-container');
    
    // Remove placeholder text
    if (historyContainer.querySelector('p')) {
      historyContainer.innerHTML = '';
    }
    
    const resultColors = {
      win: 'bg-green-100 dark:bg-green-900 border-green-500',
      lose: 'bg-red-100 dark:bg-red-900 border-red-500',
      tie: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500'
    };
    
    const resultText = {
      win: 'Win',
      lose: 'Loss',
      tie: 'Tie'
    };
    
    const historyItem = document.createElement('div');
    historyItem.className = `${resultColors[result]} border-l-4 p-3 rounded flex justify-between items-center`;
    historyItem.innerHTML = `
      <span class="text-gray-800 dark:text-white">Round ${this.currentRound}: ${this.emojis[playerChoice]} vs ${this.emojis[computerChoice]}</span>
      <span class="font-bold text-gray-800 dark:text-white">${resultText[result]}</span>
    `;
    
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
  }
  
  endGame() {
    this.isGameActive = false;
    
    const modal = document.getElementById('gameover-modal');
    const emoji = document.getElementById('gameover-emoji');
    const title = document.getElementById('gameover-title');
    const message = document.getElementById('gameover-message');
    
    if (this.playerScore > this.computerScore) {
      emoji.textContent = '🎉';
      title.textContent = 'You Win!';
      title.className = 'text-4xl font-bold mb-4 text-green-600 dark:text-green-400';
      this.playSound('victory');
      this.showConfetti();
    } else if (this.playerScore < this.computerScore) {
      emoji.textContent = '😢';
      title.textContent = 'You Lose!';
      title.className = 'text-4xl font-bold mb-4 text-red-600 dark:text-red-400';
      this.playSound('defeat');
    } else {
      emoji.textContent = '🤝';
      title.textContent = "It's a Tie!";
      title.className = 'text-4xl font-bold mb-4 text-yellow-600 dark:text-yellow-400';
      this.playSound('tie');
    }
    
    message.textContent = `Final Score: ${this.playerScore} - ${this.computerScore}`;
    modal.classList.remove('hidden');
  }
  
  quitGame() {
    this.showConfirmModal(
      '🚪',
      'Quit Game',
      'Are you sure you want to quit the current game? Your progress will be lost.',
      () => {
        this.isGameActive = false;
        this.showModeScreen();
      }
    );
  }
  
  showModeScreen() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('mode-screen').classList.remove('hidden');
  }
  
  showStatsModal() {
    document.getElementById('stats-modal').classList.remove('hidden');
    this.updateStatsDisplay();
  }
  
  closeStatsModal() {
    document.getElementById('stats-modal').classList.add('hidden');
  }
  
  showSettingsModal() {
    document.getElementById('settings-modal').classList.remove('hidden');
  }
  
  closeSettingsModal() {
    document.getElementById('settings-modal').classList.add('hidden');
  }
  
  showConfirmModal(icon, title, message, callback) {
    this.confirmCallback = callback;
    document.getElementById('confirm-icon').textContent = icon;
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    document.getElementById('confirm-modal').classList.remove('hidden');
  }
  
  closeConfirmModal() {
    document.getElementById('confirm-modal').classList.add('hidden');
    this.confirmCallback = null;
  }
  
  updateStatsDisplay() {
    document.getElementById('total-wins').textContent = this.stats.totalWins;
    document.getElementById('total-losses').textContent = this.stats.totalLosses;
    document.getElementById('total-ties').textContent = this.stats.totalTies;
    document.getElementById('best-streak').textContent = this.stats.bestStreak;
    document.getElementById('games-played').textContent = this.stats.gamesPlayed;
    
    const winRate = this.stats.gamesPlayed > 0 ? 
      ((this.stats.totalWins / this.stats.gamesPlayed) * 100).toFixed(1) : 0;
    document.getElementById('win-rate').textContent = `${winRate}%`;
  }
  
  checkAchievements() {
    const achievements = [
      { id: 'first-win', name: 'First Victory', desc: 'Win your first game', emoji: '🏆', condition: () => this.stats.totalWins >= 1 },
      { id: 'win-10', name: 'Veteran', desc: 'Win 10 games', emoji: '⭐', condition: () => this.stats.totalWins >= 10 },
      { id: 'win-50', name: 'Master', desc: 'Win 50 games', emoji: '👑', condition: () => this.stats.totalWins >= 50 },
      { id: 'streak-5', name: 'On Fire!', desc: 'Win 5 in a row', emoji: '🔥', condition: () => this.stats.bestStreak >= 5 },
      { id: 'streak-10', name: 'Unstoppable', desc: 'Win 10 in a row', emoji: '💪', condition: () => this.stats.bestStreak >= 10 },
      { id: 'games-100', name: 'Dedicated', desc: 'Play 100 games', emoji: '🎮', condition: () => this.stats.gamesPlayed >= 100 },
    ];
    
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
      const unlocked = achievement.condition();
      const div = document.createElement('div');
      div.className = `glass p-3 rounded-lg text-center ${unlocked ? '' : 'opacity-50'}`;
      div.innerHTML = `
        <div class="text-3xl mb-1">${achievement.emoji}</div>
        <div class="text-sm font-bold text-gray-800 dark:text-white">${achievement.name}</div>
        <div class="text-xs text-gray-600 dark:text-gray-400">${achievement.desc}</div>
      `;
      container.appendChild(div);
    });
  }
  
  // Visual effects
  showConfetti() {
    if (!this.settings.animationsEnabled) return;
    
    const container = document.getElementById('confetti-container');
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti absolute w-3 h-3 rounded';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
  shakeScreen() {
    if (!this.settings.animationsEnabled) return;
    
    const gameScreen = document.getElementById('game-screen');
    gameScreen.classList.add('shake');
    setTimeout(() => gameScreen.classList.remove('shake'), 500);
  }
  
  // Sound effects (using Web Audio API)
  playSound(type) {
    if (!this.settings.soundEnabled) return;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const sounds = {
      click: { freq: 400, duration: 0.1 },
      countdown: { freq: 600, duration: 0.1 },
      win: { freq: 800, duration: 0.3 },
      lose: { freq: 200, duration: 0.3 },
      tie: { freq: 500, duration: 0.2 },
      start: { freq: 700, duration: 0.2 },
      victory: { freq: 1000, duration: 0.5 },
      defeat: { freq: 150, duration: 0.5 }
    };
    
    const sound = sounds[type] || sounds.click;
    
    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
  }
  
  // Theme
  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const themeBtn = document.getElementById('theme-toggle');
    
    if (isDark) {
      html.classList.remove('dark');
      themeBtn.innerHTML = '<span class="text-2xl">🌙</span>';
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      themeBtn.innerHTML = '<span class="text-2xl">☀️</span>';
      localStorage.setItem('theme', 'dark');
    }
    
    this.playSound('click');
  }
  
  // LocalStorage management
  loadStats() {
    const defaultStats = {
      totalWins: 0,
      totalLosses: 0,
      totalTies: 0,
      bestStreak: 0,
      gamesPlayed: 0
    };
    
    const saved = localStorage.getItem('rps-stats');
    return saved ? JSON.parse(saved) : defaultStats;
  }
  
  saveStats() {
    localStorage.setItem('rps-stats', JSON.stringify(this.stats));
  }
  
  resetStats() {
    this.stats = {
      totalWins: 0,
      totalLosses: 0,
      totalTies: 0,
      bestStreak: 0,
      gamesPlayed: 0
    };
    this.saveStats();
    this.updateStatsDisplay();
    this.checkAchievements();
    this.playSound('click');
  }
  
  loadSettings() {
    const saved = localStorage.getItem('rps-settings');
    if (saved) {
      this.settings = JSON.parse(saved);
      document.getElementById('sound-toggle').checked = this.settings.soundEnabled;
      document.getElementById('music-toggle').checked = this.settings.musicEnabled;
      document.getElementById('animation-toggle').checked = this.settings.animationsEnabled;
    }
    
    // Load theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.getElementById('theme-toggle').innerHTML = '<span class="text-2xl">☀️</span>';
    }
  }
  
  saveSettings() {
    localStorage.setItem('rps-settings', JSON.stringify(this.settings));
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new RockPaperScissorsGame();
});
