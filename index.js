const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

var mdl = new Image()

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(mdl, x, y, s, dir, frame) {
        this.x = x
        this.y = y
        this.speed = s
        this.direction = dir

        this.mdl = mdl
        this.frame = frame
    }

    draw(velX, velY) {
        if (this.frame > 15) {this.frame = 0}
        this.x += velX
        this.y += velY
        var X = this.x
        var Y = this.y
        if (velX == 0 && velY == 0) {mdl.src = 'user/'+this.mdl+'/stand/'+this.mdl+'-'+this.direction+'.png'
            this.frame = 0
        }
        else {mdl.src = 'user/'+this.mdl+'/trot/'+this.mdl+'-'+this.direction+'-'+'trot'+Math.floor(this.frame)+'.png'}
        c.beginPath()
        c.drawImage(mdl, X, Y)
        this.frame += 0.33
    }

    update() {
        var velX = 0
        var velY = 0

        if (keys['SHIFT']) {this.speed = 2} else {this.speed = 1}
        if (keys['S']) {
            velY = this.speed
        }
        if (keys['W']) {
            velY = -this.speed
        }
        if (keys['D']) {
            velX = this.speed
            this.direction = 'right'
        }
        if (keys['A']) {
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

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    ply.update()
    requestAnimationFrame(animate)
}

addEventListener('keydown', function (e) {
    keys[e.key.toUpperCase()] = true
})
addEventListener('keyup', function (e) {
    keys[e.key.toUpperCase()] = false
})

animate()