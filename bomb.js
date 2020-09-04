function starBom() {
    Bom = new bomb(50, 50, "image/Acme_Bomb.png", 600, 200, "image", "bg10");
    myGameArea.start();
}
let Bom;

function bomb(width, height, img, x, y, type, figure) {
    this.figure = figure;
    if (type === "image") {
        this.image = new Image();
        this.image.src = img;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function () {
        let ctx = myGameArea.context;
        if (type === "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = img;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function () {
        let rockBottom = myGameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = 0;
        }
        if (this.figure === "bg10") {
            this.x += -2;
            if (this.x <= 0) {
                this.x = myGameArea.canvas.width;
            }
        }
    }
}

function updateGameArea() {
    if (superHero.crashWith(Bomb)) {
        superHero.image.src = "image/ring_blast0004@2x.png";
        myGameArea.stop();
    }
    Bom.update();
    Bom.newPos();
}