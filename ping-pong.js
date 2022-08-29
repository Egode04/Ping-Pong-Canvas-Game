let canvas
let c

let player

const balls = []
const goals = []

class Ball{

    constructor({

        position,
        velocity,
        radius,
        color

    }) {

        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color

    }

    draw() {

        c.clearRect(0, 0, innerWidth, innerHeight)

        c.save()
            c.beginPath()

                c.arc(

                    this.position.x,
                    this.position.y,
                    this.radius, 0,
                    Math.PI * 2, false

                )

                c.fillStyle = this.color
                c.shadowColor = this.color
                c.shadowBlur = this.radius/5

                c.fill()

            c.closePath()
        c.restore()
    }

    update() {

        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.radius > canvas.height) {

            this.velocity.y = -this.velocity.y

        } else if (this.position.y - this.radius < 0) {

            this.velocity.y = -this.velocity.y

        } 
        // Collition with Sides
        else if (this.position.x + this.radius > canvas.width) {

            this.velocity.x = -this.velocity.x

        } else if (this.position.x - this.radius < 0) {

            this.velocity.x = -this.velocity.x

        }

    }

}

class Rect{
    constructor({
        position,
        dimention,
        color
    }) {

        this.position = position
        this.dimention = dimention
        this.color = color

    }
}

function init() {

    canvas = document.querySelector('canvas')
    c = canvas.getContext('2d')

    canvas.width = innerWidth
    canvas.height = innerHeight

    balls.push(new Ball({

        position: {
            x: canvas.width/2 - 15,
            y: canvas.height/2 - 15
        },
        velocity: {
            x: 3,
            y: 3
        },
        radius: 15,
        color: '#c026d3'

    }))

}

function animate() {

    requestAnimationFrame(animate)

    balls.forEach(ball => {

        ball.update()

    })

}

function crashWith(object1, object2, collistionType1, collistionType2 = collistionType1) {

    if (collistionType1 === collistionType2) {
        if (collistionType1 === "circular") {
            if (
                object1.position.x + object1.radius > object2.position.x - object2.radius &&
                object1.position.y + object1.radius > object2.position.y - object2.radius &&
                object1.position.x - object1.radius < object2.position.x + object2.radius &&
                object1.position.y - object1.radius < object2.position.y + object2.radius
            ) {

                console.log("Collided!")
                return true

            }
        } else if (collistionType1 === "rectangular") {
            if (
                object1.position.x + object1.dimention.width > object2.position.x &&
                object1.position.y + object1.dimention.height > object2.position.y &&
                object1.position.x < object2.position.x + object2.dimention.width &&
                object1.position.y < object2.position.y + object2.dimention.height
            ) {

                console.log("Collided")
                return true

            }
        }
    } else if (collistionType1 !== collistionType2) {
        if (collistionType1 === "circular") {
            if ( // Circular / Rectangular Collition
                object1.position.x + object1.radius > object2.position.x &&
                object1.position.y + object1.radius > object2.position.y &&
                object1.position.x - object1.radius < object2.position.x + object2.dimention.width &&
                object1.position.y - object1.radius < object2.position.y + object2.dimention.height
            ) {

                console.log("Collided!")
                return true

            }
        } else if (collistionType1 === "rectangular") {
            if (
                object1.position.x + object1.dimention.width > object2.position.x - object2.radius &&
                object1.position.y + object1.dimention.height > object2.position.y - object2.radius &&
                object1.position.x < object2.position.x + object2.radius &&
                object1.position.y < object2.position.y + object2.radius
            ) {

                console.log("Collided!")
                return true

            }
        }
    }

    return false

}

init()
animate()