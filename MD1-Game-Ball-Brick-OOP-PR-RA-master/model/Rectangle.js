// Lớp hình chữ nhật vẽ Paddle
class Rectangle {

    constructor(x, y, width, height, color, status) {
        // Tọa độ x
        this.x = x;
        // Tọa độ y
        this.y = y;
        // Chiều rộng hình chữ nhật
        this.width = width;
        // Chiều cao hình chữ nhật
        this.height = height;
        // Màu sắc hình chữ nhật
        this.color = color;
        // 
        this.status = status;
    }
    drawRect(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        // fillRect(tọa độ x, tọa độ y, chiều rộng, chiều cao)
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
    moveLeft() {
        this.x -= 50;
    }
    moveRight() {
        this.x += 50;
    }
}
