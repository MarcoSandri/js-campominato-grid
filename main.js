let playButton = document.getElementById("play");
let difficultyChoice = document.getElementById("difficulty");
let gridContainer = document.getElementById("gridContainer")

// getCell - Funzione per creare una cella con classe cell
const getCell = () => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    return cell;
}

// getRandomNumber - Genera un numero random tra un min e un max
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// generateBombs - Restituisce un array di n bombe tutte diverse tra un valore minimo e un valore massimo
const generateBombs = (bombsNumber, minValue, maxValue) => {
    let bombs = [];
    while(bombs.length < bombsNumber) {
        let randomBomb = getRandomNumber(minValue, maxValue);
        if(!bombs.includes(randomBomb)) {
            bombs.push(randomBomb);
        }
    }
    bombs.sort();
    return bombs;
}


// Click sul pulsante gioca
playButton.addEventListener('click', function(){

    // Reset delle selezioni precedenti
    gridContainer.innerHTML = "";
    let tries = 0;
    // Al click prende la difficoltà che restituisce un valore uguale al numero di caselle totali
    let difficulty = parseInt(difficultyChoice.value);
    console.log(difficulty)
        
    // Vengono generate le bombe
    let bombs = generateBombs(16, 1, difficulty);
    console.log(bombs);

    // Il ciclo for in base alla difficoltà crea un numero congruo di caselle
    for(i = 1; i<=difficulty; i++) {
        
        const cell = getCell();

        // Calcolo quante celle ci stanno in ogni lato del contenitore in base alla difficoltà
        let side = Math.sqrt(difficulty);

        // In base alla difficoltà cambiano anche le dimensioni della cella
            cell.style.width = `calc(100% / ${side})`
            cell.style.height = `calc(100% / ${side})`
        
        // Aggiungo il numero alla cella
        cell.innerHTML = i;

        // Aggiungo la classe clicked o bomb alla casella quando ci clicco
        if(bombs.includes(i)) {
            cell.addEventListener('click', bombClick);
        } else {
            cell.addEventListener('click', safeClick);
        }

        // Aggiungo la cella al container
        gridContainer.appendChild(cell);

    }

    // bombClick - Da alla cella la classe 'bomb' e termina la partita mostrando il punteggio e le bombe rimanenti.
    function bombClick() {
        // Aggiunge la classe bomb
        this.classList.add('bomb');
        // Rimuovo l'event listener
        this.removeEventListener('click', bombClick);

        // Mostro tutte le caselle con le bombe
        let cells = document.getElementsByClassName('cell');
        for(let i = 0; i<cells.length; i++){

            // Mostro tutte le bombe
            if(bombs.includes(parseInt(cells[i].innerText))) {
                cells[i].classList.add('bomb');
            }
        }

        alert('Hai perso! punti: ' + tries);

        removeClick()
    };

    // safeClick - Da alla cella la classe 'clicked' e aumenta di 1 il punteggio, quando il punteggio ha raggiunto il massimo possibile, mostra il messaggio di vittoria.
    function safeClick(){
        // Aggiungo la classe clicked
        this.classList.add('clicked');
        // Rimuovo l'event listener
        this.removeEventListener('click', safeClick);

        // Aggiungo un punto per ogni casella sicura
        tries += 1;
        console.log(tries);

        if(tries == (difficulty - 16)) {
            alert('hai vinto');
            removeClick()
        }

    }

    // removeClick - Rimuove tutti gli event listener dalle celle quando la partita finisce.
    function removeClick() {
        let cells = document.getElementsByClassName('cell');
        for(let i = 0; i<cells.length; i++){
            // Rimuovo tutti gli event listener rimanenti
            cells[i].removeEventListener('click', safeClick);
            cells[i].removeEventListener('click', bombClick);
        }
    }

});