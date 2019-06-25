'use strict'

const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')

let ww
let wh
let wox
let woy
let ts

const TILES_PER_VIEW = 16
const FPS = 60
const DT = 1000 / FPS

let lvl
let focused = true

window.setInterval(
    loop,
    DT
)
window.addEventListener('resize', resize)
resize()

gc.addEventListener('click', click)


document.addEventListener('visibilitychange', function() {
    // document.title = document.hidden; // change tab text for demo
    focused = !document.hidden
})

window.addEventListener('blur', (e) => console.log(e))
// window.onfocus = function() {
//     console.log('got focus')
// }

function rngtest (range, cycles, seed) {
    let results = []
    let rng = new Random(seed)
    for(let i = 0; i < cycles; i++) {
        let r = rng.next() % range
        results[r] = (results[r] + 1) || 1
    }

    for ( let i = 0; i < range; i++ ) {
        console.log(`${i}: ${results[i]} - ${(results[i] / cycles) * 100}%`)
    }
}
// rngtest(7, 100000, 1)

function loop () {
    if (! focused) {
        document.title =  "PAUSED"
        return
    } else {
        "RUNNING"
    }

    // ctx.fillStyle = "#000000"
    // ctx.fillRect(0,0, ww, wh)
    ctx.clearRect(0, 0, ww, wh)


    // guarantee view rect
    lvl.update()

    ctx.fillStyle = "#ffffff20"
    ctx.fillRect(0 + wox, 0 + woy, ts*(TILES_PER_VIEW), ts*(TILES_PER_VIEW))

    lvl.draw()

    // * Center of canvas lines
    // ctx.strokeStyle = "#ffff0020"
    // ctx.moveTo(0, 0)
    // ctx.lineTo(ww, wh)

    // ctx.moveTo(ww, 0)
    // ctx.lineTo(0, wh)
    // ctx.stroke()

}

function resize () {
    ww = gc.clientWidth
    wh = gc.clientHeight

    ts = Math.min( (ww / TILES_PER_VIEW), (wh / TILES_PER_VIEW) )
    ts = Math.floor(ts)

    wox = (ww - (ts * TILES_PER_VIEW)) / 2
    woy = (wh - (ts * TILES_PER_VIEW)) / 2

    gc.width = ww
    gc.height = wh

    if (lvl) {
        lvl = new Level(lvl.seed+1)
    } else {
        lvl = new Level(1)
    }
    lvl.generate()
    lvl.draw()
}

function click (evt) {
    console.log((evt.clientX) / ts, evt.clientY / ts)

    lvl.handleClick(evt.clientX, evt.clientY)

//    lvl.player.acc.add(new Vector.toan)
}
