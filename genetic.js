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

document.addEventListener('visibilitychange', function() {
    // document.title = document.hidden; // change tab text for demo
    focused = !document.hidden
})


function loop () {
    if (! focused) {
        document.title =  "PAUSED"
        return
    } else {
        document.title = "RUNNING"
    }

    ctx.fillStyle = "#333333"
    ctx.fillRect(0,0, ww, wh)
    // ctx.clearRect(0, 0, ww, wh)

}

function resize () {
    ww = gc.clientWidth
    wh = gc.clientHeight

    gc.width = ww
    gc.height = wh
    console.log(`OnResize: ww: ${ww}, wh: ${wh}`)
}

// function click (evt) {
//     console.log((evt.clientX) / ts, evt.clientY / ts)

//     lvl.handleClick(evt.clientX, evt.clientY)

// //    lvl.player.acc.add(new Vector.toan)
// }
