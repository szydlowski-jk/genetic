const ResourceTypes = [
    {color: "#ffff00", growth: 0.01, spread: 1.0, energy: 5},
    {color: "#ff00ff", growth: 0.05, spread: 0.5, energy: 1}
]

class Resource {
    constructor (x, y, type) {
        this.pos = new Vector(x, y)
        this.type = type
    }

    update () {

    }

    draw () {

    }
}

class Environment {
    constructor () {
        this.specimens = []
        this.resources = []
    }

    update () {
        for (const r of this.resources) {
            r.update()
        }

        for (const s of this.specimens) {
            s.update()
        }
    }

    draw () {

    }
}