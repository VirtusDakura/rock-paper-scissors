function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
  }
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    console.log(`Player chose: ${playerChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    if (playerChoice === computerChoice) {
      return 'It\'s a tie!';
    }

    const winningCombinations = {
      rock: ['scissors'],
      paper: ['rock'],
      scissors: ['paper'],
    };

    if (winningCombinations[playerChoice].includes(computerChoice)) {
      return 'You win!';
    } else {
      return 'You lose!';
    }
  }

  function playGame() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
      const result = playRound(prompt('Enter your choice (rock, paper, scissors): '));
      console.log(result);

      if (result.includes('win')) {
        playerScore++;
      } else if (result.includes('lose')) {
        computerScore++;
      }
    }

    console.log(`Player score: ${playerScore}`);
    console.log(`Computer score: ${computerScore}`);

    if (playerScore > computerScore) {
      console.log('You win the game!');
    } else if (playerScore < computerScore) {
      console.log('You lose the game!');
    } else {
      console.log('It\'s a tie!');
    }
  }

  playGame();
