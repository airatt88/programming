document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const timerDisplay = document.getElementById("timer");
    const triesDisplay = document.getElementById("tries");
    const resetBtn = document.getElementById("reset");

    let gridSize = 4; // 👈 Меняй это значение для 3x3, 4x4, 5x5
    let pieces = [];
    let emptyPos = gridSize * gridSize - 1; // Последняя клетка будет пустой
    let tries = 0;
    let timer = 0;
    let interval = null;
    let gameStarted = false;
    const pieceSize = 100; 

    puzzleContainer.style.width = `${gridSize * pieceSize}px`;

    function generatePuzzle() {
        puzzleContainer.innerHTML = "";
        pieces = [];

        for (let i = 0; i < gridSize * gridSize; i++) {
            let piece = document.createElement("div");
            piece.classList.add("piece");
            piece.style.width = `${pieceSize}px`;
            piece.style.height = `${pieceSize}px`;

            piece.dataset.position = i;
            piece.dataset.initialPosition = i;

            if (i === emptyPos) {
                piece.classList.add("empty"); // Делаем пустую клетку
            } else {
                let row = Math.floor(i / gridSize);
                let col = i % gridSize;
                piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
                piece.draggable = true;
                piece.addEventListener("dragstart", dragStart);
                piece.addEventListener("dragover", dragOver);
                piece.addEventListener("drop", dropPiece);
            }

            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }

        shufflePieces();
    }

    function shufflePieces() {
        for (let i = pieces.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            if (i !== emptyPos && j !== emptyPos) { 
                [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
            }
        }

        puzzleContainer.innerHTML = "";
        pieces.forEach((piece, index) => {
            piece.dataset.position = index;
            puzzleContainer.appendChild(piece);
        });

        resetGame();
    }

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.dataset.position);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dropPiece(event) {
        event.preventDefault();
        const draggedPos = event.dataTransfer.getData("text/plain");
        const droppedPos = event.target.dataset.position;

        if (droppedPos == emptyPos) {
            const draggedPiece = pieces.find(piece => piece.dataset.position == draggedPos);
            const droppedPiece = pieces.find(piece => piece.dataset.position == droppedPos);

            let draggedIndex = pieces.indexOf(draggedPiece);
            let droppedIndex = pieces.indexOf(droppedPiece);

            [pieces[draggedIndex], pieces[droppedIndex]] = [pieces[droppedIndex], pieces[draggedIndex]];
            [draggedPiece.dataset.position, droppedPiece.dataset.position] = [droppedPiece.dataset.position, draggedPiece.dataset.position];

            puzzleContainer.innerHTML = "";
            pieces.forEach(piece => {
                puzzleContainer.appendChild(piece);
            });

            emptyPos = draggedPos; // Обновляем позицию пустой клетки
            tries++;
            triesDisplay.textContent = `Tries: ${tries}`;

            if (!gameStarted) {
                startTimer();
                gameStarted = true;
            }

            checkWin();
        }
    }

    function checkWin() {
        let isWin = pieces.every((piece, index) => piece.dataset.position == piece.dataset.initialPosition);
        if (isWin) {
            setTimeout(() => {
                clearInterval(interval);
                alert(`🎉 Puzzle Solved! Time: ${timer} sec | Tries: ${tries}`);
            }, 300);
        }
    }

    function startTimer() {
        interval = setInterval(() => {
            timer++;
            timerDisplay.textContent = `Time: ${timer} sec`;
        }, 1000);
    }

    function resetGame() {
        tries = 0;
        timer = 0;
        clearInterval(interval);
        gameStarted = false;
        triesDisplay.textContent = "Tries: 0";
        timerDisplay.textContent = "Time: 0 sec";
    }

    resetBtn.addEventListener("click", () => {
        resetGame();
        shufflePieces();
    });

    generatePuzzle();
});
