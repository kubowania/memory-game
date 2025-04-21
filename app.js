document.addEventListener('DOMContentLoaded', () => {
  //Get The Start Button

  document.getElementById('startGame').addEventListener('click', 
       () => {
            document.querySelector('.game-box').style.display = 'flex';
            document.getElementById('startGame').style.display = 'none'
       }
  )

  //Show Game Rules

  // Open modal
  document.getElementById('openRulesBtn').onclick = function () {
    document.getElementById('rulesModal').style.display = 'block';
  };
  
  // Close modal
  document.querySelector('.close-btn').onclick = function () {
    document.getElementById('rulesModal').style.display = 'none';
  };
  
  // Close when clicking outside the modal
  window.onclick = function (e) {
    const modal = document.getElementById('rulesModal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };

  //list all card options
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
  ]

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  
function shuffle(array){
     for(let i = array.length -1; i >= 0; i--){
          let j = Math.floor(Math.random() * i + 1);

          [array[i], array[j]] = [array[j], array[i]]
     }

     return array;
}

let shuffledArray = shuffle(cardArray);


  createBoard();
  
  //create your board
  function createBoard() {
    for (let i = 0; i < shuffledArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', './images/blank.png')
      setTimeOut(
        () => {
          document.getElementById('result').innerHTML = 'You have clicked the same image!';
        }
      )
      cardsChosen = []
      cardsChosenIds = []
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[cardsChosenIds[0]].style.cursor = 'not-allowed'
      cards[cardsChosenIds[1]].style.cursor = 'not-allowed'
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      document.body.classList.remove('change-red')
      document.body.classList.add('change-green')
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      document.body.classList.remove('change-green')
      document.body.classList.add('change-red')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      gridDisplay.classList.add('restart-game')
      gridDisplay.innerHTML = 
                     `Congratulations 🥳🥳. You Just Won!! </br>
                     <button id='restartGame' onclick='location.reload()'>Restart The Game</button>
                     `
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

})
