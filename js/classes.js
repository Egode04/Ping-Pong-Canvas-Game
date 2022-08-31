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