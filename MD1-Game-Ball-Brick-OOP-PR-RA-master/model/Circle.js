class Circle {
    x;
    y;
    radius;
    color;

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    drawCircle(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, )
        ctx.fill();
        ctx.closePath();
    }
    moveBall(dX, dY){
        this.x += dX;
        this.y += dY;
    }
}
