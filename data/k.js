class Ball {
    constructor(x, y){
        this.x = x,
        this.y = y
    }

    get xPos(){
        return this.x
    }

    set xPos(num){
        this.x = num 
    }

}

const ball = new Ball(0, 0)
ball.xPos()