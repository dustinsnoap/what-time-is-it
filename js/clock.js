class Time {
    constructor () {
        this.time = {}
    }
    getTime() {
        let now = new Date()
        this.time.ampm = now.getHours() > 12 ? `PM` : `AM`
        this.time.hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
        this.time.minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
        this.time.seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
        return this.time
    }
}
let time = new Time()

//TITLE
setTitle()
setInterval(setTitle, 1000)
function setTitle() {
    let now = time.getTime()
    document.querySelector('head > title').textContent = `${now.hours}:${now.minutes}:${now.seconds}${now.ampm}`
}
