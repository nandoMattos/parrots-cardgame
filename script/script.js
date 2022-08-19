let qtdCartas = 4;

// do{
    //    qtdCartas = prompt('Com quantas cartas deseja jogar? (apenas números pares)');
    //    Number(qtdCartas);
    
// } while(qtdCartas % 2 != 0 || qtdCartas == 0); 
    
let content = document.querySelector('.content');
let cartas = []; 
let imagens = [];
let moves = 0;

preparaImagens();

geraCartas();

embaralhaCartas();


// Carrega as imagens
function preparaImagens() {
    imagens.push("<img src='images/bobrossparrot.gif'>");  
    imagens.push("<img src='images/explodyparrot.gif'>");  
    imagens.push("<img src='images/fiestaparrot.gif'>");  
    imagens.push("<img src='images/metalparrot.gif'>");  
    imagens.push("<img src='images/tripletsparrot.gif'>");  
    imagens.push("<img src='images/unicornparrot.gif'>");  
}

// Gera as cartas e as guarda em um array.
function geraCartas() {
    let carta;
    let contArray = 0;

    for (let i = 0; i < qtdCartas; i++){

        carta = document.createElement("div");
        carta.classList.add("card");

        carta.innerHTML =
        `
        <div class="card" id="card${contArray}" onclick="flipCard(this)">
            <figure class="card-face front">
                <img src="images/front.png" >
            </figure>
            <figure class="card-face back">
                ${imagens[contArray]}
            </figure>
            </div>
        </div>
        `
        cartas.push(carta);
        
        if(i % 2 === 1){
            contArray++;
        }
    }

}

// Embaralha as cartas joga no HTML
function embaralhaCartas() {
    let cartasEmbaralhadas = cartas.sort(comparador)

    for(let i = 0; i < qtdCartas; i++) {
        content.appendChild(cartasEmbaralhadas[i]);
    }
}

function flipCard(card) {
    let flipped = document.querySelectorAll(".flipped");
    
    // Garante que apenas virará duas cartas por jogada
    if(flipped.length < 2){
        card.classList.add("flipped");
        flipped = document.querySelectorAll(".flipped");
    }

    if(flipped.length === 2){
        if (flipped[0].id === flipped[1].id){
            flipped[0].classList.remove("flipped")
            flipped[0].classList.add("matched")

            flipped[1].classList.remove("flipped")
            flipped[1].classList.add("matched")
        } else {
            setTimeout(unflipCard, 1000, flipped);
        }
        moves++;
    }

    setTimeout(checkIfWon, 1000);
}

function unflipCard(flippedCards) {
    // console.log(flippedCards)   
    flippedCards[0].classList.remove("flipped");
    flippedCards[1].classList.remove("flipped");
}

function comparador(){
    return Math.random() - 0.5;
}

function checkIfWon(){
    matchedAmt = document.querySelectorAll(".matched");
    if(matchedAmt.length === qtdCartas){
        alert(`Ganhou em ${moves} movimentos.`)
    }
}

// setTimeout(function, 5000)