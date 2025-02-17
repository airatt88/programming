let loader = document.querySelector('.loader');

function updateLoader() {
    let width = 0;
    let interval = setInterval(function () {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width++;
            loader.style.width = width + '%';
        }
    }, 50);
}

setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("erorr").style.display = "block";
    document.getElementById("retry-button").style.display = "block";
}, 5000);

window.onload = () => updateLoader();

let errorCount = 0; // Счётчик ошибок

document.getElementById("retry-button").addEventListener("click", () => {
    if (errorCount === 0) {
        document.getElementById("erorr").style.display = "none";
        document.getElementById("onemore").style.display = "block";
    } else if (errorCount === 1) {
        document.getElementById("onemore").style.display = "none";
        document.getElementById("finalerror").style.display = "block";
    } else if (errorCount === 2) {
        document.getElementById("finalerror").style.display = "none";
        document.getElementById("love-message").style.display = "block";
        document.getElementById("retry-button").style.display = "none"; // Убираем кнопку после финала
    }
    errorCount++;
});
