let field = document.createElement('div'); //создание поля
document.body.appendChild(field);
field.classList.add('field');

for (i = 1; i < 626; i++) //создание ячеек
{
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.querySelectorAll('.excel');
let x = 1,
    y = 25;
for (i = 0; i < 625; i++)  //нумирация ячеек 
{
    if (x > 25) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

function generateSnake() // рандомные значения для змеи 
{
    let posX = Math.round(Math.random() * (25 - 3) + 3);
    let posY = Math.round(Math.random() * (25 - 1) + 1);
    return [posY, posX];
}


let cord = generateSnake();
let snakeBody = [document.querySelector('[posY="' + cord[0] + '"][posX="' + cord[1] + '"]'),
document.querySelector('[posY="' + cord[0] + '"][posX="' + (cord[1] - 1) + '"]'),
document.querySelector('[posY="' + cord[0] + '"][posX="' + (cord[1] - 2) + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('snakeHead');

let apple;
function createApple()  // создание яблока
{
    function generateApple() {
        let posX = Math.round(Math.random() * (25 - 1) + 1);
        let posY = Math.round(Math.random() * (25 - 1) + 1);
        return [posY, posX];
    }

    let appleCord = generateApple();
    apple = document.querySelector('[posY="' + appleCord[1] + '"][posX="' + appleCord[0] + '"]');

    while (apple.classList.contains('snakeBody')) {
        let appleCord = generateApple();
        apple = document.querySelector('[posY="' + appleCord[1] + '"][posX="' + appleCord[0] + '"]');
    }
    apple.classList.add('apple');
}

createApple();

let direction = 'right';
let steps = false;
let input= document.createElement('input');
document.body.appendChild(input);
input.classList.add('input');

let score=0;
input.value=`Ваши очки ${score}`;

function move() //движение змеи 
{
    let snakeCord = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction == 'right') {
        if (snakeCord[0] < 25) {
            snakeBody.unshift(document.querySelector('[posY="' + (+snakeCord[1]) + '"][posX="' + (+snakeCord[0] + 1) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[posY="' + (+snakeCord[1]) + '"][posX="1"]'));
        }
    }

    if (direction == 'left') {
        if (snakeCord[0] > 1) {
            snakeBody.unshift(document.querySelector('[posY="' + (+snakeCord[1]) + '"][posX="' + (+snakeCord[0] - 1) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[posY="' + (+snakeCord[1]) + '"][posX="25"]'));
        }
    }


    if (direction == 'up') {
        if (snakeCord[1] < 25) {
            snakeBody.unshift(document.querySelector('[posY="' + (+snakeCord[1] + 1) + '"][posX="' + +snakeCord[0] + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[posY="1"][posX="' + +snakeCord[1] + '"]'));
        }
    }


    if (direction == 'down') {
        if (snakeCord[1] > 1) {
            snakeBody.unshift(document.querySelector('[posY="' + (+snakeCord[1] - 1) + '"][posX="' + (+snakeCord[0]) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[posY="25"][posX="' + +snakeCord[0] + '"]'));
        }
    }

    if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
        apple.classList.remove('apple');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX="' + a + '"][posY= "' + b + '"]'));
        createApple();
        score++;
        input.value=`Ваши очки ${score}`;
    }

if (snakeBody[0].classList.contains('snakeBody'))
{
   setTimeout(()=>
   {
alert(`Майк - лох.
Ваши очки: ${score}`);
console.log('Саня - лох');
   }, 200);
    
    clearInterval(interval);
    snakeBody[0].style.background="yellow"; //место врезания 
}


    snakeBody[0].classList.add('snakeHead');
    for (let i = 1; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    steps=true;
}
let interval = setInterval(move, 250);

window.addEventListener('keydown', function (e) {  //стрелки 
    if (steps==true){
    if ((e.keyCode == 37) && (direction != 'right')) {
        direction = 'left';
        steps=false;
    }
    if ((e.keyCode == 38) && (direction != 'down')) {
        direction = 'up'
        steps=false;
    }
    if ((e.keyCode == 39) && (direction != 'left')) {
        direction = 'right';
        steps=false;
    }
    if ((e.keyCode == 40) && (direction != 'up')) {
        direction = 'down';
        steps=false;
    }
}
});