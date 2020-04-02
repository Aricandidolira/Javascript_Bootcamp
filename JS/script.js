// selecionando o ID 
let canvas = document.getElementById("snake");
//renderiza para tratar o arquivo como 2d
let context = canvas.getContext("2d");
//32 pixels
let box = 32;
//fillStyle trabalha com cor, estilo
//fillRect desenha o retangulo, 4 parametros
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

criarBG();