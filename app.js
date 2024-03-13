document.addEventListener('DOMContentLoaded', () => {
  // List all card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let playerTurn = 1;
  let matches = {
    player1: 0,
    player2: 0
  };

  // Create the game board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match!');
      cards[optionOneId].style.visibility = 'hidden';
      cards[optionTwoId].style.visibility = 'hidden';
      matches['player' + playerTurn]++;
      resultDisplay.textContent = `(Player 1): ${matches.player1} | (Player 2): ${matches.player2}`;
    } else {
      //alert('Sorry, try again!');
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }

    if (playerTurn === 1) {
      playerTurn = 2;
    } else {
      playerTurn = 1;
    }

    cardsChosen = [];
    cardsChosenId = [];

    // Check if game is over
    if (matches.player1 + matches.player2 === cardArray.length / 2) {
      if (matches.player1 > matches.player2) {
        alert('Player 1 wins!');
      } else if (matches.player2 > matches.player1) {
        alert('Player 2 wins!');
      } else {
        alert('It\'s a tie!');
      }
    }
  }

  // Flip card when clicked
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard();
});
