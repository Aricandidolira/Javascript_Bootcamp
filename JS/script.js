// selecionando o ID 
let canvas = document.getElementById("snake");
//renderiza para tratar o arquivo como 2d
let context = canvas.getContext("2d");
//32 pixels
let box = 32;
// declar o snake e o q vem dentro
let snake = [];
//definindo o tamanho da cobra
snake[0] = {
    x: 8 * box,
    y: 8 * box,
};
//direção da cobrinha
let direction = "right";
//metodo que fazem criar aleatorios -- math random -> retorna numero aleatorio
// math floor - retira a parte a flutuante 
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};

//criando o fundo a tela do jogo
//fillStyle trabalha com cor, estilo
//fillRect desenha o retangulo, 4 parametros
function criarBG(){
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//desenho comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "blue";
        //pega o tamanho do x e y que passou acima e o tamanho do box que é o quadradinho
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//evento para controle - pega o evento de clique 'keydown' do teclado e chama função update
/// aperta a tecla o addEventListener vai chamar o update que ira passar argumento com evento de tecla ira funcionar e quais
//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}


function iniciarJogo(){

   //plano cartesiano, ponto 0 com eixo de X e Y, vai ate 16 de um lado e 0 de outro, passando ele aumento e diminui
    if(snake[0].x > 15 * box && direction == "right") snake[0].x= 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x= 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y= 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //acabar o jogo quando corpo da cobra se chocar
    for(i= 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over =( try again!");
        }
    }

    criarBG();
    //criar a cobrinha -- add um elemento e retirar o ultimo para andar
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // se a direção for iguala  right add mais um quadradinho..
    if(direction == "right") snakeX += box;
    // tira um quadradinho para ilusao que vai apra esquerda
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //cobra aumentar de tamanho, cheque as coordenadas para então incrementar 
    // caso seja diferente retira / caso seja igual incrementa
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
            food.x = Math.floor(Math.random() * 15 + 1) * box
            food.y = Math.floor(Math.random() * 15 + 1) * box
    }


    //função pop retira o ultima elemento do array   snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY,
    }
    //unshift = metoto que acrescenta no primeiro elemento
    snake.unshift(newHead);

    
}
//passando um intervalo de 100 milesegundos reiniciar o jogo sem ele acabar
let jogo = setInterval(iniciarJogo, 100);