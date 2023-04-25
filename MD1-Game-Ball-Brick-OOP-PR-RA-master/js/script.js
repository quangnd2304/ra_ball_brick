let soundtrack = new Audio("audio/nhac_nen.mp3")
let collide = new Audio("audio/va_tram.mp3")
let issoundtrack = false;
function onOffNhacNen() {
    issoundtrack = !issoundtrack;
    if (issoundtrack) {
        soundtrack.play();
        document.getElementById('mp3').innerHTML = 'ON MP3'
        document.getElementById('mp3').style.backgroundColor = 'blue'
    } else {
        nhacNen.pause();
        document.getElementById('mp3').innerHTML = 'OFF MP3'
        document.getElementById('mp3').style.backgroundColor = 'red'
    }
}
function createBricks() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            xBrick = marginAuto + j * (widthBrick + betweenLeftRight)
            yBrick = marginTop + i * (heightBrick + betweenTopDow);
            let brick = new Rectangle(xBrick, yBrick, widthBrick, heightBrick, colorBrick, true);
            arrBricks.push(brick);
        }
    }
}

//Di chuyển thanh: paddle
function selectKeyBoard(evt) {
    console.log('evt ---> ', evt.keyCode)
    switch (evt.keyCode) {
        case 37:
            if (paddle.x <= 0) {
                return
            }
            paddle.moveLeft();
            console.log('x của paddle --->', paddle.x)
            break;
        case 39:
            if (paddle.x + paddle.width >= widthCanvas) {
                return;
            }
            paddle.moveRight();
            break;
    }

    clearCanvas();
    paddle.drawRect(ctx);
}
//DI CHUYỂN: BALL
function moveBall() {
    let request = requestAnimationFrame(moveBall)
    ball.moveBall(dX, dY)
    checkCollisionBallAndPaddle();
    checkCollisionBallAndBrick()
    if (ball.x + ball.radius >= widthCanvas || ball.x - ball.radius <= 0) {
        dX = -dX
    } else if (ball.y - radius <= 0) {
        dY = -dY;
    } else if (ball.y + ball.radius === heightCanvas) {
        alert('Thua!')
        window.cancelAnimationFrame(request)
        window.location.reload()
    }

    clearCanvas()
    ball.drawCircle(ctx)
    paddle.drawRect(ctx)
    drawBricks();
    if (score == arrBricks.length) {
        alert('WIN! Play Again!')
        window.cancelAnimationFrame(request)
        window.location.reload()
    }
}
function reload() {
    alert('WIN')
    window.location.reload();
}
//CHECK VA TRẠM: Ball vs Paddle
function checkCollisionBallAndPaddle() {
    if (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width
        && ball.y + radius == paddle.y) { //Check va trạm xảy ra khi quả bóng trong khoảng của thanh paddle
        dY = -dY;
    } else if (ball.x < paddle.x + paddle.width + radius && ball.x + radius > paddle.x
        && ball.y + radius > paddle.y) { //Check điều kiện trong khoảng dài hơn 2 đầu nhưng kết hợp y ball bề mặt thanh paddle
        dX = -dX;
        dY = -dY;
    } else if ((ball.x + radius == paddle.x || ball.x - ball.radius == paddle.x + paddle.width) && ball.y > paddle.y) {
        dX = -dX
    }
}
//CHECK VA TRẠM: Ball and Brick
function checkCollisionBallAndBrick() {
    for (let i = 0; i < arrBricks.length; i++) {
        if (arrBricks[i].status) {
            if (ball.x >= arrBricks[i].x && ball.x <= arrBricks[i].x + widthBrick &&
                (ball.y - ball.radius === arrBricks[i].y + heightBrick ||
                    ball.y + radius === arrBricks[i].y)) {
                dY = -dY
                arrBricks[i].status = false;
                collide.play()
                score++;
            }
            else if ((ball.x + radius > arrBricks[i].x && ball.x < arrBricks[i].x)
                && (ball.y - radius < arrBricks[i].y + heightBrick && ball.y > arrBricks[i].y + heightBrick)) { //check góc 1 dưới

                if (dX !== dY) {
                    dX = -dX;
                    dY = -dY;
                    arrBricks[i].status = false;
                    collide.play()
                    score++;
                } else {
                    if (dX < 0) {
                        dY = -dY
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    } else {
                        dX = -dX
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    }
                }

            }
            else if (ball.x + radius > arrBricks[i].x && ball.x < arrBricks[i].x &&
                ball.y + radius > arrBricks[i].y && ball.y < arrBricks[i].y) {
                if (dX === dY) {
                    dX = -dX;
                    dY = -dY;
                    arrBricks[i].status = false;
                    collide.play()
                    score++;
                } else {
                    if (dX > 0) {
                        dX = -dX
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    } else {
                        dY = - dY;
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    }
                }
            }
            else if (ball.x - radius < arrBricks[i].x + widthBrick && ball.x > arrBricks[i].x + widthBrick &&
                ball.y - radius < arrBricks[i].y + heightBrick && ball.y > arrBricks[i].y + heightBrick) {
                if (dX === dY) {
                    dX = -dX;
                    dY = -dY;
                    arrBricks[i].status = false;
                    collide.play()
                    score++;
                } else {
                    if (dX > 0) {
                        dY = -dY
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    } else {
                        dX = -dX
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    }
                }
            }
            else if (ball.x - radius < arrBricks[i].x + widthBrick && ball.x > arrBricks[i].x + widthBrick &&
                ball.y + radius > arrBricks[i].y && ball.y < arrBricks[i].y) {
                if (dX !== dY) {
                    dX = -dX;
                    dY = -dY;
                    arrBricks[i].status = false;
                    collide.play()
                    score++;
                } else {
                    if (dX > 0) {
                        dY = -dY
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    } else {
                        dX = -dX
                        arrBricks[i].status = false;
                        collide.play()
                        score++;
                    }
                }
            }
            else if ((ball.x + radius === arrBricks[i].x || ball.x - radius === arrBricks[i].x + widthBrick) &&
                (ball.y >= arrBricks[i].y && ball.y <= arrBricks[i].y + heightBrick)) {
                dX = -dX
                arrBricks[i].status = false;
                collide.play()
                score++;
            }

        }

    }
    document.getElementById('score').innerHTML = score;
}
function drawBricks() {
    for (let i = 0; i < arrBricks.length; i++) {
        if (arrBricks[i].status) {
            arrBricks[i].drawRect(ctx);
        }
    }
}

//clear khung canvas
function clearCanvas() {
    ctx.clearRect(0, 0, widthCanvas, heightCanvas);
}
let score = 0;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
//Lấy chiều dài chiều rộng của khung canvas
let widthCanvas = canvas.width;
let heightCanvas = canvas.height;
//Khai báo thuộc tính cho: Paddle
let widthPaddle = 300;
let heightPaddle = 30;
let xPaddle = (widthCanvas - widthPaddle) / 2;
let yPaddle = heightCanvas - heightPaddle;
let colorPaddle = 'green';
let paddle = new Rectangle(xPaddle, yPaddle, widthPaddle, heightPaddle, colorPaddle)
paddle.drawRect(ctx);

//Khai báo thuộc tính cho: Ball
let radius = 20;
let xBall = widthCanvas / 2;
let yBall = heightCanvas - radius - heightPaddle;
let colorBall = '#f10bee'
let ball = new Circle(xBall, yBall, radius, colorBall)
let dX = 5;
let dY = -5;
ball.drawCircle(ctx)
//Khai báo Bricks
let column = 3;
let row = 3;
let widthBrick = 100;
let heightBrick = 20;
let betweenLeftRight = 70;
let betweenTopDow = 50;
let marginAuto = (widthCanvas - column * widthBrick - (column - 1) * betweenLeftRight) / 2;
let marginTop = 100;
let colorBrick = 'red';
let xBrick = 0;
let yBrick = 0;
let arrBricks = [];

createBricks();
addEventListener('keydown', selectKeyBoard)
moveBall();





