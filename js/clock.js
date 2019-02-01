class Time {
    constructor () {
        this.time = {}
    }
    getTime() {
        let now = new Date()
        this.time.ampm = now.getHours() > 12 ? `PM` : `AM`
        this.time.hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
        this.time.minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
        this.time.second = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
        return this.time
    }
}
let time = new Time()

//TITLE
setTitle()
setInterval(setTitle, 1000)
function setTitle() {
    let now = time.getTime()
    document.querySelector('head > title').textContent = `${now.hour}:${now.minute}:${now.second}${now.ampm}`
}

//CLOCK
window.onload = () => {
    let clock = document.querySelector('.clock')
    let minutes = document.getElementById('minute');
    setInterval(() => {
        ['hour','minute','second'].forEach(digit => setClockDigit(digit));
    }, 1000)
}

function setClockDigit(id) {
    document.getElementById(id).textContent = time.getTime()[id];
}

function getNumArray(num, min, max, extra) {
    let arr = []
    num -= extra
    if(num < min) num += max + (min === 0 ? 1 : 0)
    for(let i=0; i<extra*2+1; i++) {
        arr.push(num++)
        if(num > max) num = min
    }
    return arr
}