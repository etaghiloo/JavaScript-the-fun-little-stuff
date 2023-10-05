const cardsArray = [
    {
        name: "cyberman",
        image: "assets/images/cyberman.jpg"
    },
    {
        name: "dalek",
        image: "assets/images/dalek.jpg"
    },
    {
        name: "fezz",
        image: "assets/images/fezz.jpg"
    },
    {
        name: "sonic",
        image: "assets/images/sonic.jpg"
    },
    {
        name: "tardis",
        image: "assets/images/tardis.jpg"
    },
    {
        name: "weeping-angels",
        image: "assets/images/weeping-angels.jpg"
    },
    {
        name: "cyberman",
        image: "assets/images/cyberman.jpg"
    },
    {
        name: "dalek",
        image: "assets/images/dalek.jpg"
    },
    {
        name: "fezz",
        image: "assets/images/fezz.jpg"
    },
    {
        name: "sonic",
        image: "assets/images/sonic.jpg"
    },
    {
        name: "tardis",
        image: "assets/images/tardis.jpg"
    },
    {
        name: "weeping-angels",
        image: "assets/images/weeping-angels.jpg"
    }
]
let chosenCards = []
let matchedCards = []
let lockBoard = false;

const score = document.querySelector("#result")
score.textContent = 0

const createBoard = function() {
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("id", i)
        card.innerHTML = `
            <img class="front" src=${cardsArray[i].image} />
            <img class="back" src="assets/images/blank.jpg" />
        `
        document.querySelector(".grid").appendChild(card)
    }
}
createBoard()
const cards = document.querySelectorAll(".card")

const flipCard = function() {
    if (lockBoard) return
    if (this === cards[chosenCards[0]?.id]) return

    this.classList.add("flip")
    let cardId = this.getAttribute("id")
    chosenCards.push({
        name: cardsArray[cardId].name,
        id: cardId,
    })

    if (chosenCards.length === 2) {
        lockBoard = true
        checkMatching()
    }
}

const checkMatching = function() {
    if (chosenCards[0].name === chosenCards[1].name) {
        freezeCard()
        matchedCards.push(chosenCards)
        chosenCards = []
        lockBoard = false
        score.textContent = matchedCards.length
        if (matchedCards.length === cardsArray.length / 2) {
            score.textContent = "Congrats! You Found All The Matches."
        }
    } else {
        setTimeout(() => {
            unflipCard()
            chosenCards = []
            lockBoard = false
        }, 1000);

    }
}

const freezeCard = function() {
    cards[chosenCards[0].id].removeEventListener("click", flipCard)
    cards[chosenCards[1].id].removeEventListener("click", flipCard)
}

const unflipCard = function() {
    cards[chosenCards[0].id].classList.remove("flip")
    cards[chosenCards[1].id].classList.remove("flip")
}

const shuffleBoard = function() {
    cards.forEach(function(card) {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
}
shuffleBoard()

cards.forEach(function(card) {
    card.addEventListener("click", flipCard)
})