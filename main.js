let playButton = document.getElementById("play");
let difficultyChoice = document.getElementById("difficulty");
let gridContainer = document.getElementById("gridContainer")

// Funzione per creare una cella con classe cell
const getCell = () => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    return cell;
}


// Click sul pulsante gioca
playButton.addEventListener('click', function(){

    // Reset delle selezioni precedenti
    gridContainer.innerHTML = "";

    // Al click prende la difficoltà che restituisce un valore uguale al numero di caselle totali
    let difficulty = parseInt(difficultyChoice.value);
    console.log(difficulty)

    // Il ciclo for in base alla difficoltà crea un numero congruo di caselle
    for(i = 1; i<=difficulty; i++) {
        
                const cell = getCell();
        
                // In base alla difficoltà cambiano anche le dimensioni della cella
                if(difficulty==100) {
                    cell.style.width = "calc(100% / 10)"
                    cell.style.height = "calc(100% / 10)"
                } else if(difficulty==81) {
                    cell.style.width = "calc(100% / 9)"
                    cell.style.height = "calc(100% / 9)"
                } else if(difficulty==49) {
                    cell.style.width = "calc(100% / 7)"
                    cell.style.height = "calc(100% / 7)"
                }
                
                // Aggiungo il numero alla cella
                cell.innerHTML = i;

                // Aggiungo la classe clicked alla cella
                cell.addEventListener('click', function(){
                    this.classList.add('clicked');
                });
        
                // Aggiungo la cella al container
                gridContainer.appendChild(cell);

    }

});