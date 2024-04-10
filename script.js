const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startButton');
const ball = document.getElementById('ball');
const clickArea = document.getElementById('clickArea');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

let animationFrameId;
let verticalVelocity = 0;
let horizontalVelocity = 0;
const gravity = -0.6;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
let positionX = screenWidth / 2 - 50;
let positionY = screenHeight / 2 - 50;
let score = 0;
let highScore = 0;

function updateScore() {
    scoreElement.textContent = `${score}  `;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = `${highScore}`;
    }
}

function update() {
    verticalVelocity += gravity;
    positionY += verticalVelocity;
    positionX += horizontalVelocity;

    if (positionX <= 0 || positionX >= screenWidth - 100) {
        horizontalVelocity *= -0.9;
    }

    if (positionY <= 50) {
        positionY = 50;
        verticalVelocity = 0;
        horizontalVelocity = 0; // Stop the ball's movement when it hits the ground
        // Do not reset the score here, as it's already being handled on click
    } else if (positionY >= screenHeight - 100) {
        verticalVelocity *= -0.9;
        positionY = screenHeight - 100;
    }

    ball.style.left = `${positionX}px`;
    ball.style.bottom = `${positionY}px`;
    clickArea.style.left = `${positionX - 50}px`;
    clickArea.style.bottom = `${positionY - 50}px`;

    animationFrameId = requestAnimationFrame(update);
}

clickArea.addEventListener('click', () => {
    if (positionY === 50) {
        score = 0; // Reset the score when the ball is on the ground and gets clicked
        updateScore();
    }
    verticalVelocity = 10; // Jump the ball
    horizontalVelocity = (Math.random() - 0.5) * 15;
    score++;
    updateScore();
});

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    positionX = screenWidth / 2 - 50;
    positionY = screenHeight / 2 - 50;
    verticalVelocity = 0;
    horizontalVelocity = 0;
    score = 0;
    updateScore();
    update();
});
