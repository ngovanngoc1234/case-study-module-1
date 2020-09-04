function starGold() {
    golds = new gold(30, 30, "images/cc_coins_gold_7.png", 650, 230, "image", 'gold');
    myGameArea.start();
}
let golds;
function gold(width, height, img, x, y, type, figure) {
    this.figure = figure;
    this.type = type;
    if (type === "image" || type === "background") {
        this.image = new Image();
        this.image.src = img;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        let ctx = myGameArea.context;
        if (type === "image" || type === "background") {
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
        if (this.figure === 'gold') {
            this.x += -2;
            if (this.x <= 0) {
                this.x = myGameArea.canvas.width;
            }
        }
    }
    this.crashWith = function (b) {
        let myLeft = this.x;
        let myRight = this.x + (this.width);
        let myTop = this.y;
        let myBottom = this.y + (this.height);
        let otherLeft = b.x;
        let otherRight = b.x + (b.width);
        let otherTop = b.y;
        let otherBottom = b.y + (b.height);
        let crash = true;
        if ((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)) {
            crash = false;
        }
        return crash;
    }
}
function updateGameArea() {
    if (superHero.crashWith(gold)) {
        myGameArea.frameNo += 1;
    }
    golds.update();
    golds.newPos();
}