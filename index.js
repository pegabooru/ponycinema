const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d') // Context for a 2D canvas, use c.something() to call a canvas function like drawing and stuff

var plySprite = new Image()

canvas.width = innerWidth
canvas.height = innerHeight

class Player { // Local player
    constructor(user, x, y, s, dir, frame) { // user = player's username, x,y = ply coords, s = speed, dir = direction facing, frame = current animation frame
        this.x = x
        this.y = y
        this.speed = s
        this.direction = dir

        this.user = user
        this.frame = frame
    }

    draw(velX, velY) { // Draw the player
        if (this.frame > 15) {this.frame = 0} // Loop frames
        this.x += velX // Add velocityX
        this.y += velY // Add velocityY
        if (velX == 0 && velY == 0) {plySprite.src = 'user/'+this.user+'/stand/'+this.user+'-'+this.direction+'.png' // Standing still sprite when ply not moving
            this.frame = 0
        }
        else {plySprite.src = 'user/'+this.user+'/trot/'+this.user+'-'+this.direction+'-'+'trot'+Math.floor(this.frame)+'.png'} // When ply moving and on ground, trot
        c.beginPath()
        c.drawImage(plySprite, this.x, this.y) // Draw image onto canvas
        this.frame += 0.33
    }

    update() { // Updates player data
        var velX = 0
        var velY = 0

        // Obviously if you need more keybinds for stuff just copy one of the if statements
        if (keys['SHIFT']) {this.speed = 2} else {this.speed = 1} // Sprint
        if (keys['S']) { // Down
            velY = this.speed
        }
        if (keys['W']) { // Up
            velY = -this.speed
        }
        if (keys['D']) { // Right
            velX = this.speed
            this.direction = 'right'
        }
        if (keys['A']) { // Left
            velX = -this.speed
            this.direction = 'left'
        }

        this.draw(velX, velY)
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

keys = []

const ply = new Player('simon', x, y, 1, 'right', 0)

function animate() { // Constant game loop, update frames, etc
    c.clearRect(0, 0, canvas.width, canvas.height)
    ply.update()
    requestAnimationFrame(animate) // Loop back to animate function
}

addEventListener('keydown', function (e) { // Keys down
    keys[e.key.toUpperCase()] = true
})
addEventListener('keyup', function (e) { // Keys up
    keys[e.key.toUpperCase()] = false
})

animate() // Run the whole thangy
