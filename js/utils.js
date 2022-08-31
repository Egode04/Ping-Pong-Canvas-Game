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
        x: 0,
        y: 0
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

    // Last
    animate()

}

function animate() {

    requestAnimationFrame(animate)
    
    c.fillStyle = 'rgba(255, 255, 255, 0.4)'
    c.fillRect(0, 0, innerWidth, innerHeight)

    balls.forEach((ball, index) => {

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
            // ball.velocity.x *= 1.001
            // ball.velocity.y *= 1.001
        }
        
        if (
            ball.position.x - ball.radius <= 0 ||
            ball.position.x + ball.radius >= canvas.width
        ) balls.splice(index, 1)
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