document.addEventListener("DOMContentLoaded", () => {
  let currentLevel = 1;
  let lives = 5; // Inicializamos el juego con 5 vidas.

  const levels = {
    1: [
      { name: "fries", img: "./images/uva.png" },
      { name: "cheeseburger", img: "./images/naranja.png​" },
      { name: "ice-cream", img: "./images/repollo.png​" },
      { name: "pizza", img: "./​​images/manzana.png​" },
      { name: "milkshake", img: "./​​​images/pera.png​" },
      { name: "hotdog", img: "./images/manzana.png​" },
      { name: "fries", img: "./​​​images/naranja.png​" },
      { name: "cheeseburger", img: "./​images/pera.png​" },
      { name: "ice-cream", img: "./images/uva.png​" },
      { name: "pizza", img: "./​​​images/pizza.png​" },
      { name: "milkshake", img: "./​images/repollo.png​" },
      { name: "hotdog", img: "​​./images/pizza.png​" },
    ],
    2: [
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
    ],
    3: [
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "fries", img: "images/factoriacard-Photoroom.jpg" },
      { name: "cheeseburger", img: "images/factoriacard-Photoroom.jpg" },
      { name: "ice-cream", img: "images/factoriacard-Photoroom.jpg" },
      { name: "pizza", img: "images/factoriacard-Photoroom.jpg" },
      { name: "milkshake", img: "images/factoriacard-Photoroom.jpg" },
      { name: "hotdog", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
      { name: "bacon", img: "images/factoriacard-Photoroom.jpg" },
      { name: "salad", img: "images/factoriacard-Photoroom.jpg" },
      { name: "sushi", img: "images/factoriacard-Photoroom.jpg" },
      { name: "steak", img: "images/factoriacard-Photoroom.jpg" },
      { name: "sushi", img: "images/factoriacard-Photoroom.jpg" },
      { name: "steak", img: "images/factoriacard-Photoroom.jpg" },
    ],
  };

  let cardArray = levels[currentLevel];
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");

  // create your board
  function createBoard() {
    cardArray.sort(() => 0.5 - Math.random());
    grid.innerHTML = "";
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", i);
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><img src="images/factoriacard.png" alt="Card"></div>
          <div class="card-back"><img src="${cardArray[i].img}" alt="Card"></div>
        </div>
      `;
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
    resultDisplay.textContent = `Lives: ${lives}`; // Muestra las vidas restantes.
  }

  // check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].classList.remove("is-flipped");
      cards[optionTwoId].classList.remove("is-flipped");
      alert("Sorry, try again");
      lives--; // Resta una vida.
      if (lives === 0) {
        alert("Game Over! You've lost all your lives.");
        resultDisplay.textContent = "Game Over!";
        return; // Termina el juego si se pierden todas las vidas.
      }
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = `Lives: ${lives}`;

    if (cardsWon.length === cardArray.length / 2) {
      if (currentLevel < 3) {
        alert("Level complete! Moving to the next level.");
        currentLevel++;
        cardArray = levels[currentLevel];
        cardsWon = [];
        createBoard();
      } else {
        resultDisplay.textContent =
          "Congratulations! You completed all levels!";
      }
    }
  }

  // flip your card
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    if (!cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.classList.add("is-flipped");
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  createBoard();
});
