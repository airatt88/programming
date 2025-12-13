const fileIntput = document.querySelector("input[type=file]");
const textInputs = document.querySelectorAll("input[type=text]");
const topTextInput = textInputs[0];
const bottomTextInput = textInputs[1];
const colorInput = document.querySelector("input[type=color]");
const fontSizeInput = document.querySelector("input[type=range]");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const downloadButton = document.querySelector("button");

canvas.width = 500;
canvas.height = 500;
let image = null;
let fontSize = 40;
fontSizeInput.value = fontSize;

function drawMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = colorInput.value;
    ctx.font = `${fontSize}px Impact`;
    ctx.textAlign = "center";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.strokeText(topTextInput.value, canvas.width / 2, 50);
    ctx.strokeText(bottomTextInput.value, canvas.width / 2, canvas.height - 20);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.strokeText(topTextInput.value, canvas.width / 2, 50);
    ctx.strokeText(bottomTextInput.value, canvas.width / 2, canvas.height - 20);

    ctx.fillText(topTextInput.value, canvas.width / 2, 50);
    ctx.fillText(bottomTextInput.value, canvas.width / 2, canvas.height - 20);

}

fileIntput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        image = new Image();
        image.src = e.target.result;
        image.onload = drawMeme;
    };
    reader.readAsDataURL(file);
});

topTextInput.addEventListener("input", drawMeme);
bottomTextInput.addEventListener("input", drawMeme);
colorInput.addEventListener("input", drawMeme);
fontSizeInput.addEventListener("input", () => {
    fontSize = fontSizeInput.value;
});

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
});

console.log("Script loaded!");