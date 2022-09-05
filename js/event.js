addEventListener('mousemove', event => {

    mouse = {
        x: event.pageX,
        y: event.pageY
    }

})

addEventListener('click', event => {

    const angle = Math.atan2(

        event.clientY - innerHeight/2,
        event.clientX - innerWidth/2

    )

    const projectileSpeed = 5

    const radius = 10

    const velocity = {
        x: Math.cos(angle) * projectileSpeed,
        y: Math.sin(angle) * projectileSpeed
    }

    if (velocity.x < 1 && velocity.x >= 0) {
        velocity.x = 1
    } else if (velocity.x > -1 && velocity.x < 0) {
        velocity.x = -1
    } if (velocity.y < 1 && velocity.y >= 0) {
        velocity.y = 1
    } else if (velocity.y > -1 && velocity.y < 0) {
        velocity.y = -1
    }

    balls.push(new Ball({

        position: {
            x: canvas.width/2,
            y: canvas.height/2
        },
        velocity: velocity,
        radius: radius,
        color: '#c026d3'

    }))

})