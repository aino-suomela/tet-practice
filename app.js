// app.js
// Original code from https://www.geeksforgeeks.org/kivi-paper-and-sakset-game-using-javascript/

// Complete logic of game inside this function
const game = () => {
  // Pelaajan pisteet
  let playerScore = 0;
  // Tietokoneen pisteet
  let computerScore = 0;
  // Pelikierroksia käytetty
  let moves = 0;

  // Huijaus pois päältä
  let cheating = false;

  // Function to

  // document.querySelector valitsee dokumentista (nettisivu, se, mikä näkyy kun ohjelman/sivun avaa) elementin, jossa on parametria vastaava "selektori."
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector <-tuolta voi lukea enemmän Document.querySelector() -metodin käytöstä.

  const playGame = () => {
    // Haetaan documentista elementti, joilla on class=".kivi" (etsi vastaava paikka index.html-tiedostosta)
    const kiviBtn = document.querySelector('.kivi');
    // Haetaan documentista elementti, joilla on class=".paperi" (etsi vastaava paikka index.html-tiedostosta)
    const paperBtn = document.querySelector('.paperi');
    // Haetaan documentista elementti, joilla on class=".sakset" (etsi vastaava paikka index.html-tiedostosta)
    const saksetBtn = document.querySelector('.sakset');
    const cheatBtn = document.querySelector('.cheatButton');

    // Asetetaan löydetyt nappulat taulukkoon (array)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array <-- tuolta lisätietoa Arraysta
    // Samoin tietokoneen eri vaihtoehdot lisätään taulukkoon
    const playerOptions = [kiviBtn, paperBtn, saksetBtn];
    const computerOptions = ['kivi', 'paperi', 'sakset'];
    const cheat = document.querySelector('.cheatResult');

    cheatBtn.addEventListener('click', () => {
      // Muuta arvo käänteiseksi: !-operaattori on ns. "NOT"-operaattori, eli "cheating = not cheating" tai "not cheating = cheating"
      cheating = !cheating;
      if (cheating) {
        cheat.innerText = 'Huijaus päällä';
      } else {
        cheat.innerText = 'Huijaus pois päältä';
      }
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach <-- forEach-tietoa
    // forEach käy läpi taulukon (array) jokaisen vaihtoehdon
    playerOptions.forEach(option => {
      // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener <- eventListener
      // jokaiseen vaihtoehtoon lisätään kuuntelija (listener), joka on valmiina siihen, mikäli elementtiä painetaan
      option.addEventListener('click', function () {
        // Mikäli nappia painetaan, siirrytään tänne.
        // Etsitään elementti, jolla class="movesleft"
        const movesLeft = document.querySelector('.movesleft');

        // Lisätään käytettyihin pelikierroksiin yksi
        // moves++ on lyhyt tapa kirjoittaa "moves + 1"
        moves++;

        // Saadaksemme jäljellä olevat vuorot, vähennetään kymmenestä käytettyjen vuorojen määrä (10 - moves)
        movesLeft.innerText = `Moves Left: ${10 - moves}`;

        // Winner-funktio ottaa vastaan kaksi parametriä, tekstin pelaajan valitsemasta painikkeesta (this.innerText) ja tietokoneen valinnan (computerChoice)
        if (cheating) {
          let fixedResult;
          player = this.innerText.toLowerCase();
          if (player === 'paperi') {
            fixedResult = 'kivi';
          } else if (player === 'kivi') {
            fixedResult = 'sakset';
          } else {
            fixedResult = 'paperi';
          }
          winner(player, fixedResult);
        } else {
          const choiceNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[choiceNumber];
          winner(this.innerText, computerChoice);
        }
        // Calling gameOver function after 10 moves
        if (moves == 10) {
          gameOver(playerOptions, movesLeft);
        }
      });
    });
  };

  // Function to decide winner
  const winner = (player, computer) => {
    const result = document.querySelector('.result');
    const playerScoreBoard = document.querySelector('.p-count');
    const computerScoreBoard = document.querySelector('.c-count');
    player = player.toLowerCase();
    computer = computer.toLowerCase();
    if (player === computer) {
      result.textContent = 'Tasapeli';
    } else if (player == 'kivi') {
      if (computer == 'paperi') {
        result.textContent = 'Tietokone voitti';
        computerScore++;
        computerScoreBoard.textContent = computerScore;
      } else {
        result.textContent = 'Pelaaja voitti';
        playerScore++;
        playerScoreBoard.textContent = playerScore;
      }
    } else if (player == 'sakset') {
      if (computer == 'kivi') {
        result.textContent = 'Tietokone voitti';
        computerScore++;
        computerScoreBoard.textContent = computerScore;
      } else {
        result.textContent = 'Pelaaja voitti';
        playerScore++;
        playerScoreBoard.textContent = playerScore;
      }
    } else if (player == 'paperi') {
      if (computer == 'sakset') {
        result.textContent = 'Tietokone voitti';
        computerScore++;
        computerScoreBoard.textContent = computerScore;
      } else {
        result.textContent = 'Pelaaja voitti';
        playerScore++;
        playerScoreBoard.textContent = playerScore;
      }
    }
  };

  // Function to run when game is over
  const gameOver = (playerOptions, movesLeft) => {
    const chooseMove = document.querySelector('.move');
    const result = document.querySelector('.result');
    const reloadBtn = document.querySelector('.reload');

    playerOptions.forEach(option => {
      option.style.display = 'none';
    });

    chooseMove.innerText = 'Peli ohi!';
    movesLeft.style.display = 'none';
    // Asetetaan CSS-tyylit: fontSize ja color
    if (playerScore > computerScore) {
      result.style.fontSize = '2rem';
      result.innerText = 'Voitit pelin';
      result.style.color = '#308D46';
    } else if (playerScore < computerScore) {
      result.style.fontSize = '2rem';
      result.innerText = 'Hävisit pelin';
      result.style.color = 'red';
    } else {
      result.style.fontSize = '2rem';
      result.innerText = 'Tasapeli';
      result.style.color = 'grey';
    }
    reloadBtn.innerText = 'Käynnistä uudelleen';
    reloadBtn.style.display = 'flex';
    reloadBtn.addEventListener('click', () => {
      window.location.reload();
    });
  };

  // Calling playGame function inside game
  playGame();
};

// Calling the game function
game();
