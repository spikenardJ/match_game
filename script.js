class MatchCardGame {
    constructor(boardId) {
        this.board = document.getElementById(boardId);
        this.symbols = ["🦚", "🐬", "🦋", "🦩", "🦚", "🐬", "🦋", '🦩', "🦢", "🐠", "🦢", "🐠"];
        this.shuffledSymbols = [...this.symbols].sort(() => 0.5 - Math.random());
        this.selectedCards = [];
        this.matchedCards = [];
        this.createBoard();
    }

    createBoard() {
        this.board.innerHTML = "";
        this.shuffledSymbols.forEach((symbol, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            card.addEventListener("click", () => this.flipCard(card));
            this.board.appendChild(card);
        });
    }

    flipCard(card) {
    if (this.selectedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        
        setTimeout(() => {
            card.innerText = this.shuffledSymbols[card.dataset.index];
        }, 100);
        
        this.selectedCards.push(card);

        if (this.selectedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 500);
        }
    }
    }

    checkMatch() {
        const [card1, card2] = this.selectedCards;
    
        if (card1.innerText === card2.innerText) {
            this.matchedCards.push(card1, card2);
        } else {
            setTimeout(() => {
                card1.innerText = "";
                card2.innerText = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
            }, 500);
        }
        this.selectedCards = [];
    
        if (this.matchedCards.length === this.symbols.length) {
            setTimeout(() => {
                alert("You won! 🎉");
                
                // Add victory animation to each card with a slight delay
                document.querySelectorAll('.card').forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("victory");
                    }, index * 100); // Stagger the animation
                });

                setTimeout(() => {
                    this.restartGame();
                }, 2500);
            }, 300);
        }
    }
    
    restartGame() {
        console.log("Restarting game...");
    
        this.selectedCards = [];
        this.matchedCards = [];
    
        this.shuffledSymbols = [...this.symbols].sort(() => 0.5 - Math.random());
    
        this.board.innerHTML = '';
    
        this.createBoard();
    }
    
}

document.addEventListener("DOMContentLoaded", () => new MatchCardGame("gameBoard"));
       
createBoard();