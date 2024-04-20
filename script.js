const cardsContainer = document.getElementById('cards');
const messageDisplay = document.getElementById('message');

let cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let selectedCards = [];
let matchedCards = [];
let attempts = 0;

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

// Create cards
cards.forEach((card, index) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.index = index;
  
  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');
  
  const cardFront = document.createElement('div');
  cardFront.classList.add('card-face', 'card-front');
  
  const cardBack = document.createElement('div');
  cardBack.classList.add('card-face', 'card-back');
  cardBack.textContent = card;
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);
  
  cardElement.addEventListener('click', selectCard);
  
  cardsContainer.appendChild(cardElement);
});

function selectCard() {
  if (selectedCards.length === 2) return;

  const index = this.dataset.index;
  if (selectedCards.includes(index)) return;

  this.classList.add('flipped');
  selectedCards.push(index);

  if (selectedCards.length === 2) {
    setTimeout(checkMatch, 500);
    attempts++;
  }
}

function checkMatch() {
  const [firstIndex, secondIndex] = selectedCards;
  const firstCard = cards[firstIndex];
  const secondCard = cards[secondIndex];

  if (firstCard === secondCard) {
    matchedCards.push(firstIndex, secondIndex);
    if (matchedCards.length === cards.length) {
      messageDisplay.textContent = `Congratulations! You won in ${attempts} attempts.`;
    }
  } else {
    const firstCardElement = cardsContainer.querySelector(`[data-index="${firstIndex}"]`);
    const secondCardElement = cardsContainer.querySelector(`[data-index="${secondIndex}"]`);
    firstCardElement.classList.remove('flipped');
    secondCardElement.classList.remove('flipped');
  }

  selectedCards = [];
}

function resetGame() {
  cardsContainer.innerHTML = '';
  messageDisplay.textContent = '';
  cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
  selectedCards = [];
  matchedCards = [];
  attempts = 0;
  cards.sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-back');
    cardBack.textContent = card;
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);
    
    cardElement.addEventListener('click', selectCard);
    
    cardsContainer.appendChild(cardElement);
  });
}
