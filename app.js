document.addEventListener("DOMContentLoaded", () => {
    //card options
    const cardArray = [{
                name: "fries",
                img: "images/fries.png",
            },
            {
                name: "cheeseburger",
                img: "images/cheeseburger.png",
            },
            {
                name: "ice-cream",
                img: "images/ice-cream.png",
            },
            {
                name: "pizza",
                img: "images/pizza.png",
            },
            {
                name: "milkshake",
                img: "images/milkshake.png",
            },
            {
                name: "hotdog",
                img: "images/hotdog.png",
            },
        ],
        gridCardArray = [...cardArray, ...cardArray].sort(
            () => 0.5 - Math.random()
        ),
        grid = document.querySelector(".grid"),
        resultDisplay = document.querySelector("#result");
    var cardsChosen = [];
    var cardsChosenId = [];
    const cardsWon = [];

    //create your board
    function createBoard() {
        for (let i = 0; i < gridCardArray.length; i++) {
            var card = document.createElement("img");
            card.setAttribute("src", "images/blank.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            alert("You found a match");
            cards[optionOneId].setAttribute("src", "images/white.png");
            cards[optionTwoId].setAttribute("src", "images/white.png");
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute("src", "images/blank.png");
            cards[optionTwoId].setAttribute("src", "images/blank.png");
            alert("Sorry, try again");
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === gridCardArray.length / 2) {
            resultDisplay.textContent = "Congratulations! You found them all!";
        }
    }

    //flip your card
    function flipCard() {
        var cardId = this.getAttribute("data-id");
        if (
            cardsChosenId.includes(cardId) ||
            cardsWon.flat().includes(gridCardArray[cardId].name)
        ) {
            return;
        }
        cardsChosen.push(gridCardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", gridCardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});