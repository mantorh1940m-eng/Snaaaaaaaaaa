const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("scoreBoard");

const box = 20; // حجم المربع الواحد
let score = 0;
let gameSpeed = 100;

// تعريف الثعبان كصفوف من الإحداثيات
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// تعريف الطعام
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let d; // الاتجاه

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function draw() {
    // مسح الشاشة في كل إطار
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#4CAF50" : "#8bc34a"; // رأس الثعبان أغمق
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // رسم الطعام
    ctx.fillStyle = "#ff5252";
    ctx.fillRect(food.x, food.y, box, box);

    // موقع الرأس الحالي
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // تحريك الرأس بناءً على الاتجاه
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // إذا أكل الثعبان الطعام
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        scoreElement.innerHTML = "النقاط: " + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop(); // إزالة الذيل
    }

    let newHead = { x: snakeX, y: snakeY };

    // قواعد الخسارة
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("انتهت اللعبة! نقاطك: " + score);
    }

    snake.unshift(newHead); // إضافة الرأس الجديد
}

// تشغيل اللعبة كل 100 مللي ثانية
let game = setInterval(draw, gameSpeed);
