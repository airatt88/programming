document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const gameInfo = document.getElementById("game-info");
    const timerDisplay = document.getElementById("timer");
    const triesDisplay = document.getElementById("tries");
    const resetBtn = document.querySelector("button");
    const levelText = document.getElementById("level-txt")
    let currentLevel = 3;

    function updateLevelText() {
        if (currentLevel === 1) {
            levelText.textContent = "Move the pieces to complete the puzzle!"
        } else if (currentLevel === 2) {
            levelText.textContent = "Great job! Now try solving a 4x4 puzzle."
        } else if (currentLevel === 3) {
            levelText.textContent = "Welcome to the final level! Solve a 5x5 Fluttershy puzzle."
        }
    }
    updateLevelText();

    let gridSize = 5; //<-- Change here
    let pieces = [];
    let tries = 0;
    let timer = 0;
    let interval = null;
    let gameStarted = false;
    const pieceSize = 100;

    puzzleContainer.style.width = `${gridSize * pieceSize}px`

   


    function generatePuzzle() {
        puzzleContainer.innerHTML = "";
        pieces = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                let position = row * gridSize + col;

                let piece = document.createElement("div");
                piece.classList.add("piece");
                piece.style.width = `${pieceSize}px`;
                piece.style.height = `${pieceSize}px`;
                piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            
                piece.dataset.position = position;
                piece.dataset.initialPosition = position; 
                piece.draggable = true;

                piece.addEventListener("dragstart", dragStart);
                piece.addEventListener("dragover", dragOver);
                piece.addEventListener("drop", dropPiece);

                enableTouchSupport(piece);

                puzzleContainer.appendChild(piece);
                pieces.push(piece);
            }
        }   
        shufflePieces();
    };

    
    function shufflePieces() {
        for (let i = pieces.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
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
        event.target.classList.add("dragging");

        event.target.addEventListener("dragend", () => {
            event.target.classList.remove("dragging");
        });
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function checkWin() {
        let isWin = pieces.every((piece, index) => piece.dataset.position == piece.dataset.initialPosition);

        if (isWin) {
            setTimeout(() => {
                clearInterval(interval); //Stop timer
                alert("🎉 Puzzle Solved! Congratulations! 🧩");
            }, 300);
        }
    }

    function dropPiece(event) {
        event.preventDefault();
        const draggedPos = event.dataTransfer.getData("text/plain");
        const droppedPos = event.target.dataset.position;
    
        const draggedPiece = pieces.find(piece => piece.dataset.position == draggedPos);
        const droppedPiece = pieces.find(piece => piece.dataset.position == droppedPos);
    
        if (draggedPiece && droppedPiece) {
            swapPieces(draggedPiece, droppedPiece);
        }
    }
    
    // 📌 Функция для обмена местами двух частей
    function swapPieces(piece1, piece2) {
        let index1 = pieces.indexOf(piece1);
        let index2 = pieces.indexOf(piece2);
    
        [pieces[index1], pieces[index2]] = [pieces[index2], pieces[index1]];
        [piece1.dataset.position, piece2.dataset.position] = [piece2.dataset.position, piece1.dataset.position];
    
        puzzleContainer.innerHTML = "";
        pieces.forEach(piece => puzzleContainer.appendChild(piece));
    
        tries++;
        triesDisplay.textContent = `Tries: ${tries}`;
    
        if (!gameStarted) {
            startTImer();
            gameStarted = true;
        }
    
        checkWin();
    }    

    function startTImer() {
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

    let draggedPiece = null;
    let startX = 0, startY = 0;


    function touchStart(event) {
        event.preventDefault();
        draggedPiece = event.target;

        let touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    }


    function touchMove(event) {
        event.preventDefault();
    }


    function touchEnd(event) {
        if (!draggedPiece) return;

        let touch = event.changedTouches[0];
        let target = document.elementFromPoint(touch.clientX, touch.clientY);

    
        if (target && target.classList.contains("piece") && target !== draggedPiece) {
            swapPieces(draggedPiece, target);
        }

        draggedPiece = null;
    }



    function enableTouchSupport(piece) {
        piece.addEventListener("touchstart", touchStart);
        piece.addEventListener("touchmove", touchMove);
        piece.addEventListener("touchend", touchEnd);
    }
    generatePuzzle();
});
