let superHero, bg_01, gold, bg_02, bg_03, Bomb, bg_4, bom;

function startGame() {
    superHero = new supperHero(30, 50, "images/hero-idle.gif", 10, 230, "image", 'bg1');
    bg_4 = new supperHero(700, 300, "image/11_background.png", 0, 0, "background", 'bg');
    bg_01 = new supperHero(700, 300, "image/01_ground.png", 0, 10, "background", 'bg');
    bg_02 = new supperHero(700, 300, "image/02_trees and bushes.png", 0, 50, "background", 'bg');
    bg_03 = new supperHero(700, 300, "image/03_distant_trees.png", 0, 0, "background", 'bg');
    Bomb = new supperHero(50, 50, "image/Acme_Bomb.png", 600, 200, "image", "bg10");
    gold = new supperHero(30, 30, "images/cc_coins_gold_7.png", 650, 230, "image", 'gold');
    myGameArea.start();

}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.frameNo = 0;
        this.canvas.width = 700;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = move();
            myGameArea.key = accelerate(0.5);
        });
        this.interval = setInterval(updateGameArea, 50);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        alert('Game Over');
    },
}

function supperHero(width, height, img, x, y, type, figure) {
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
    this.gravity = 0.05;
    this.gravitySpeed = 0;

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
        if (this.type === "background") {
            if (this.x <= -(this.width)) {
                this.x = 0;
                this.y = 0;
            }
        }

        if (this.figure === 'gold') {
            this.x += -0.5;
            if (this.x <= 0) {
                this.x = myGameArea.canvas.width;
            }
        }

        if (this.figure === "bg10") {
            this.x += -1;
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
        Bomb.speedX -=0.005
        gold.speedX -=0.05
    }
    if (superHero.crashWith(Bomb)) {
        superHero.image.src = "image/ring_blast0004@2x.png";
        myGameArea.stop();

    } else {
        myGameArea.clear();
        document.getElementById('1').innerHTML = "SCORE: " + myGameArea.frameNo;
        Bomb.update();
        Bomb.newPos();

        gold.update();
        gold.newPos();



        bg_01.speedX = 0;
        bg_01.newPos();
        bg_01.update();

        bg_03.speedX = -0.5;
        bg_03.newPos();
        bg_03.update();

        bg_02.speedX = -2;
        bg_02.update();
        bg_02.newPos();

        gold.update();
        gold.newPos();

        superHero.newPos();
        superHero.update();

        Bomb.update();
        Bomb.newPos();
        ClearMove();
    }
}

function accelerate(n) {
    superHero.gravity = n;
}

function move() {
    superHero.speedX = 0;
    superHero.speedY = 0;
    superHero.image.src = "images/run.gif";
}

function ClearMove() {
    if (myGameArea.key === 39) {
        superHero.speedX = 5;
        superHero.image.src = "images/jump.png";
    }
    if (myGameArea.key === 37) {
        superHero.speedX = -3;
    }
    if (myGameArea.key === 32) {
        superHero.speedY = -1
        superHero.image.src = "images/ledgegrab.gif";
        accelerate(-0.2)
    }
}