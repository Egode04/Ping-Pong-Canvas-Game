let canvas
let c

let player
let rect

const balls = []
const goals = []

let mouse

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

        if (this.position.y + this.radius + this.velocity.x > canvas.height) {

            this.velocity.y = -this.velocity.y

        } else if (this.position.y - this.radius + this.velocity.y < 0) {

            this.velocity.y = -this.velocity.y

        } 
        // Collition with Sides
        if (this.position.x + this.radius + this.velocity.x > canvas.width) {

            this.velocity.x = -this.velocity.x

        } else if (this.position.x - this.radius + this.velocity.x < 0) {

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

    draw() {

        c.fillStyle = this.color
        c.fillRect(
            this.position.x,
            this.position.y,
            this.dimention.width,
            this.dimention.height
        )

    }

    update() {

        this.draw()

        this.position.x = mouse.x - this.dimention.width/2
        this.position.y = mouse.y - this.dimention.height/2

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

    mouse = {
        x: innerWidth/2,
        y: innerHeight/2
    }

    rect = new Rect({
        position: {
            x: mouse.x,
            y: mouse.y
        },
        dimention: {
            width: 30,
            height: 30
        },
        color: '#10b981'
    })

}

function animate() {

    requestAnimationFrame(animate)
    
    c.fillStyle = 'rgba(255, 255, 255, 0.4)'
    c.fillRect(0, 0, innerWidth, innerHeight)

    balls.forEach(ball => {

        ball.update()

        if (
            crashWith(
                rect,
                ball,
                "rectangular",
                "circular",
            )
        ) {
            console.log("Collided!")
            ball.velocity.x *= 1.02
            ball.velocity.y *= 1.02
        }
    })

    rect.update()

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

                return true

            }
        } else if (collistionType1 === "rectangular") {
            if (
                object1.position.x + object1.dimention.width > object2.position.x &&
                object1.position.y + object1.dimention.height > object2.position.y &&
                object1.position.x < object2.position.x + object2.dimention.width &&
                object1.position.y < object2.position.y + object2.dimention.height
            ) {

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

                return true

            }
        } else if (collistionType1 === "rectangular") {
            if (
                object1.position.x + object1.dimention.width > object2.position.x - object2.radius &&
                object1.position.y + object1.dimention.height > object2.position.y - object2.radius &&
                object1.position.x < object2.position.x + object2.radius &&
                object1.position.y < object2.position.y + object2.radius
            ) {

                return true

            }
        }
    }

    return false

}

init()
animate()

addEventListener('mousemove', event => {

    mouse = {
        x: event.pageX,
        y: event.pageY
    }

})