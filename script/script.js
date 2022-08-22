let qtdCartas;
let imagens = [];
let cartas = []; 
let moves = 0;
let content = document.querySelector(".content");

function startGame() {
    do{
        qtdCartas = Number(prompt('Com quantas cartas deseja jogar? (apenas números pares de 4 a 14)'));
        
    } while(qtdCartas % 2 != 0 || qtdCartas <= 0 || qtdCartas == 2 || qtdCartas > 14); 
    
    document.querySelector(".welcome").classList.add("hidden");
    document.querySelector(".content").classList.remove("hidden");

    prepareImages();
    
    generateCards();
    
    shufleCards();
}

// Carrega as imagens
function prepareImages() {
    imagens.push("<img src='images/bobrossparrot.gif'>");  
    imagens.push("<img src='images/explodyparrot.gif'>");  
    imagens.push("<img src='images/fiestaparrot.gif'>");  
    imagens.push("<img src='images/metalparrot.gif'>");  
    imagens.push("<img src='images/tripletsparrot.gif'>");  
    imagens.push("<img src='images/unicornparrot.gif'>");  
}

// Gera as cartas e as guarda em um array.
function generateCards() {
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
function shufleCards() {
    let cartasEmbaralhadas = cartas.sort(comparador)

    for(let i = 0; i < qtdCartas; i++) {
        content.appendChild(cartasEmbaralhadas[i]);
    }
}

function flipCard(card) {
    let selected = document.querySelectorAll(".selected");
    
    // Garante que apenas virará duas cartas por jogada
    if(selected.length < 2){
        if(!card.classList.contains("flipped")){
            card.classList.add("selected")
        }

        card.classList.add("flipped");
        selected = document.querySelectorAll(".selected");
    }

    if(selected.length === 2){
        // console.log(selected)
        if (selected[0].id === selected[1].id){
            selected[0].classList.add("flipped")
            selected[1].classList.add("flipped")

            selected[0].classList.remove("selected")
            selected[1].classList.remove("selected")

        } else {
            setTimeout(unflipCard, 800, selected);
        }
        moves++;
    }

    let flippedAmt = document.querySelectorAll(".flipped");
    if(flippedAmt.length === qtdCartas){
        setTimeout(showAlert, 500);
    }
}

function unflipCard(selectedCards) {
    selectedCards[0].classList.remove("flipped");
    selectedCards[0].classList.remove("selected");
    selectedCards[1].classList.remove("flipped");
    selectedCards[1].classList.remove("selected");
}

function comparador(){
    return Math.random() - 0.5;
}

function showAlert(){
    alert(`Você ganhou em ${moves} jogadas!`);
    let resposta = prompt('Deseja jogar novamente? (Digite sim ou não)');
    if(resposta === 'sim') {
        resetaHtml();
        startGame();
    } else{
        document.querySelector(".content").classList.add("hidden")
        document.querySelector(".welcome").classList.remove("hidden")
        resetaHtml();
    }
}

function resetaHtml() {
    let allSelected = document.querySelectorAll('.selected');
    let allFlipped = document.querySelectorAll('.flipped');
    for (let flipped of allFlipped) {
        flipped.classList.remove("flipped")
    }

    for (let selected of allSelected) {
        selected.classList.remove("selected")
    }
    
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    qtdCartas = 0;
    imagens = [];
    cartas = []; 
    moves = 0;
}