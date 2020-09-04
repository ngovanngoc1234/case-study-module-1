let bg_4,bg_01,bg_02,bg_03;
function backGround() {
    bg_4 = new backGrounds(700, 300, "image/11_background.png", 0, 0, "background");
    bg_01 = new backGrounds(700, 300, "image/01_ground.png", 0, 10, "background");
    bg_02 = new backGrounds(700, 300, "image/02_trees and bushes.png", 0, 50, "background");
    bg_03 = new backGrounds(700, 300, "image/03_distant_trees.png", 0, 0, "background");
    myGameArea.start();
}
function backGrounds(width, height, img,type) {
    this.type = type;
    if (type === "image" || type === "background") {
        this.image = new Image();
        this.image.src = img;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        let ctx = myGameArea.context;
        if (type === "image" || type === "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if (type === "background") {
                ctx.drawImage(this.image,
                    this.x + this.width,
                    this.y,
                    this.width, this.height);
            }
        } else {
            ctx.fillStyle = img;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    if (this.type === "background") {
        if (this.x <= -(this.width)) {
            this.x = 0;
            this.y = 0;
        }
    }
}
function updateGameArea() {
    bg_4.update();
    bg_4.newPos();

    bg_01.update();
    bg_01.newPos();

    bg_02.update();
    bg_02.newPos();

    bg_03.newPos();
    bg_03.update();
}

