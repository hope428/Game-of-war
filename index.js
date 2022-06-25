let deckId
let player1Score
let player1ScoreCount = 0
let player2Score
let player2ScoreCount = 0
let cardHTML = ""
let cardIMGHtml = document.getElementById("cards")
let scoreOneHtml = document.getElementById("score-one")
let scoreTwoHtml = document.getElementById("score-two")
let remainingCardsCount = document.getElementById("remaining")
const declareWinner = document.querySelector(".winner")
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const scoresArray = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

let card1 = {
  value: "",
};

let card2 = {
  value: "",
};

function getNewDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((newDeckData) => {
      remainingCardsCount.textContent = newDeckData.remaining
      deckId = newDeckData.deck_id
})
    drawCardsBtn.disabled = false
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((deckData) => {
      
        cardHTML = ""
        card1.value = deckData.cards[0].value
        card2.value = deckData.cards[1].value
        for (item of deckData.cards) {
          cardHTML += `<img src="${item.image}" />`
        }
        cardIMGHtml.innerHTML = cardHTML
        declareWinner.textContent = getScore(card1, card2)
       if (deckData.remaining === 0) {
        drawCardsBtn.disabled = true
        drawCardsBtn.classList.add("disabled")
        if (player1ScoreCount > player2ScoreCount) {
            declareWinner.textContent = "Player 1 is the Winner!!"
        } else {
            declareWinner.textContent = "Player 2 is the Winner!!"
        }
      }

      remainingCardsCount.textContent = deckData.remaining
    })
}

function getScore(card1, card2) {
  player1Score = scoresArray.findIndex((score) => score === card1.value)
  player2Score = scoresArray.findIndex((score) => score === card2.value)

  if (player1Score > player2Score) {
    player1ScoreCount++
    scoreOneHtml.textContent = `Score: ${player1ScoreCount}`
    return "Player 1 Wins!"
  } else if (player2Score > player1Score) {
    player2ScoreCount++
    scoreTwoHtml.textContent = `Score: ${player2ScoreCount}`
    return "Player 2 Wins!"
  } else {
    return "It's a tie!"
  }
}

getNewDeck()

newDeckBtn.addEventListener("click", getNewDeck)
drawCardsBtn.addEventListener("click", drawCards)
