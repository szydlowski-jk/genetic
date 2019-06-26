function clone (obj) {return JSON.parse(JSON.stringify(obj))}

class Genotype {
    constructor () {
        this.speed = 0
        this.sensorRange = 0
        this.sensorRGB = {r:0, g:0, b:0}
        this.lightRGB = {r:0, g:0, b:0}
        this.energyCapacity = 0
    }
}

class Specimen {
    constructor () {
        genes = new Genotype()
    }
}