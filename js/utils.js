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
        radius: 10,
        color: '#c026d3'

    }))

    mouse = {
        x: 0,
        y: 0
    }

    players.push(new Rect({

        position: {
            x: 15,
            y: innerHeight/2 - 80
        },
        dimention: {
            width: 20,
            height: 160
        },
        color: '#10b981'

    }))

    players.push(new Rect({

        position: {
            x: innerWidth - 35,
            y: innerHeight/2 - 80
        },
        dimention: {
            width: 20,
            height: 160
        },
        color: '#10b981'

    }))

    // Last
    animate()

}

function animate() {

    requestAnimationFrame(animate)
    
    c.fillStyle = 'rgba(255, 255, 255, 0.4)'
    c.fillRect(0, 0, innerWidth, innerHeight)

    balls.forEach((ball, index) => {

        ball.update()

        if (players[1] !== undefined) {
            if (
                crashWith(
                    players[1],
                    ball,
                    "rectangular",
                    "circular",
                ) ||
                crashWith(
                    players[0],
                    ball,
                    "rectangular",
                    "circular",
                )
            ) {
                ball.velocity.x = -ball.velocity.x

                if (ball.velocity.x * 1.1 > -8 && ball.velocity.x < 8) {
                    ball.velocity.x *= 1.1
                    ball.velocity.y *= 1.1
                }
                
                console.log("x:", ball.velocity.x, "y:", ball.velocity.y)
            }
            players[1].update()
        }
        
        if ( !ball.isAlive ) {
            balls.splice(index, 1)
        }

        players[1].position.y = ball.position.y - players[1].dimention.height/2

    })

    players.forEach(player => {

        players[0].position.y = mouse.y - players[0].dimention.height/2
        
        player.update()

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