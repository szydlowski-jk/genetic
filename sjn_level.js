'use strict'

const PLAYER_SIZE = 0.25
const PLAYER_HALF_SIZE = PLAYER_SIZE * 0.5

const GRAVITY = new Vector(0, 0.008)

class Level {
    constructor(seed) {
        this.seed = seed

        this.generated = false

        this.ox = 0
        this.oy = 0

        this.player = {}
        this.player.jmp = false
        this.player.lastDrawPos = new Vector()
        this.player.pos = new Vector(5.5, 5.5)
        this.player.spd = new Vector()
        this.player.acc = new Vector()
    }

    generate () {
        let rng = new Random(this.seed)
        this.sizex = 14 // TODO randomize this
        this.sizey = 14 // TODO randomize this
        this.tiles = []
        for (let y = 0; y < this.sizey; y++) {
            let r = []
            for (let x = 0; x < this.sizex; x++) {
                //                let t = rng.next() % 4
                let t = 0
                if (x == 0 || y == 0 || x == this.sizex - 1 || y == this.sizey - 1) {
                    t = (rng.next() % 3) + 1
                } else if (y < 7 && x == 10) {
                    t = 1
                }
                r.push(t)
            }
            this.tiles.push(r)
        }
        

        //        debugger
    }



    isSolid (x, y) {
        if (x >= 0 &&
            x < this.sizex &&
            y >= 0 &&
            y < this.sizey) {
                switch(this.tiles[Math.floor(x)][Math.floor(y)]) {
                    case 0:
                        return false
                        break
                    case 1:
                    case 2:
                    case 3:
                        return true
                        break
                }
            }
    }

    handleClick (x, y) {
        let v = new Vector(x, y)
        v.subtract(this.player.lastDrawPos)
        v.normalize().divide(4)
        this.player.jmp = v
    }

    update () {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // TODO Add acceleration to speed calculations
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        let isOnGround =
            this.isSolid(
                this.player.pos.x,
                this.player.pos.y + PLAYER_HALF_SIZE
            )

        // * Update Acceleration here
        let newacc = Vector.add(this.player.acc, GRAVITY)

        if (isOnGround && this.player.jmp) {
            newacc.add(this.player.jmp)
            this.player.jmp = false
        }

        let newspd = Vector.add(this.player.spd, newacc)

        console.log(this.player.spd)
//        debugger

        // * is on ground
        if ( isOnGround ) {
            if (newspd.y > 0) {
                newspd.y = 0
            }
            newspd.x *= 0.9
            if (Math.abs(newspd.x) < 0.0000001) {
                newspd.x = 0
            }
        }

        this.player.spd = newspd

        let newpos = Vector.add(this.player.pos, newspd)

        // * Collisions
        let down = this.isSolid(newpos.x, newpos.y + PLAYER_HALF_SIZE)
        let up = this.isSolid(newpos.x, newpos.y - PLAYER_HALF_SIZE)

        if (down && this.player.spd.y > 0) {
            // debugger
            if (!isOnGround) {
                newpos.y = Math.floor(newpos.y + PLAYER_HALF_SIZE) - PLAYER_HALF_SIZE
            }
            this.player.spd.y = 0
        }

        if (up && this.player.spd.y < 0) {
            this.player.spd.y *= -1
            newpos.y = Math.ceil(newpos.y - PLAYER_HALF_SIZE) + PLAYER_HALF_SIZE
        }

        let left = this.isSolid(newpos.x - PLAYER_HALF_SIZE, newpos.y)
        let right = this.isSolid(newpos.x + PLAYER_HALF_SIZE, newpos.y)

        if (left && this.player.spd.x < 0) {
            newpos.x = Math.ceil(newpos.x - PLAYER_HALF_SIZE) + PLAYER_HALF_SIZE
            this.player.spd.x *= -1
        }
        
        if (right && this.player.spd.x > 0) {
            newpos.x = Math.floor(newpos.x - PLAYER_HALF_SIZE) + PLAYER_HALF_SIZE
            this.player.spd.x *= -1
        }

        this.player.pos = newpos
        //// this.player.pos.add(this.player.spd)
        this.player.acc.set(0, 0)
    }

    drawTile (x, y) {
        ctx.strokeStyle = "#ffffff40"
        ctx.strokeRect(Math.floor((x * ts) + this.ox), Math.floor((y * ts) + this.oy), ts, ts)
        ctx.fillStyle = "#00ffff60"
        if (x >= 0 && x < this.sizex && y >= 0 && y < this.sizey) {
            switch (this.tiles[x][y]) {
                case 0: {
                    ctx.fillStyle = "#000000"
                    break
                }
                case 1: {
                    ctx.fillStyle = "#ffffff60"
                    break
                }
                case 2: {
                    ctx.fillStyle = "#00ff0060"
                    break
                }
                case 3: {
                    ctx.fillStyle = "#0000ff60"
                    break
                }
                default: {
                    ctx.fillStyle = "#ff00ff60"
                }

            }
        }

        //! Debug player tile marking
        if (
            Math.floor(this.player.pos.x) == x &&
            Math.floor(this.player.pos.y) == y
        ) {
            ctx.fillStyle = "#ff000060"
        } else if (
            (Math.floor(this.player.pos.x + PLAYER_HALF_SIZE) == x &&
            Math.floor(this.player.pos.y + PLAYER_HALF_SIZE) == y) ||
            (Math.floor(this.player.pos.x - PLAYER_HALF_SIZE) == x &&
            Math.floor(this.player.pos.y - PLAYER_HALF_SIZE) == y)
        ) {
            ctx.fillStyle = "#ff880060"
        }

        ctx.fillRect((x * ts) + this.ox, (y * ts) + this.oy, ts, ts)
    }

    draw () {
        this.ox = ((ww * 0.5) - (this.player.pos.x * ts)) || 0
        this.oy = ((wh * 0.5) - (this.player.pos.y * ts)) || 0

        for (let x = 0; x < lvl.sizex; x++) {
            for (let y = 0; y < lvl.sizey; y++) {
                this.drawTile(x, y)
            }
        }

        //! Player Draw
        ctx.fillStyle = "#884411"
        this.player.lastDrawPos.x = (this.player.pos.x * ts) - (ts * PLAYER_HALF_SIZE) + this.ox
        this.player.lastDrawPos.y = (this.player.pos.y * ts) - (ts * PLAYER_HALF_SIZE) + this.oy
        ctx.fillRect(
            this.player.lastDrawPos.x,
            this.player.lastDrawPos.y,
            ts * PLAYER_SIZE,
            ts * PLAYER_SIZE
        )
    }
}