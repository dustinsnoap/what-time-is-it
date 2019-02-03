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

let digits = [
    {   id:     'hour',
        min:    1,
        max:    12,
        sec:    3600,
        tens:   false,
    },{ id:     'minute',
        min:    0,
        max:    59,
        sec:    60,
        tens:   true,
    },{ id:     'second',
        min:    0,
        max:    59,
        sec:    1,
        tens:   true,
    }]

//CLOCK
window.onload = () => {
    digits.forEach(digit => addNums(digit))
    digits.forEach(digit => {
        setInterval(() => {
            moveUp(digit)
            console.log(`digit: ${digit.id} - sec: ${digit.sec}`)
        }, digit.sec * 1000)
    })
}

function addNums(digit) {
    let arr = getNumArray(time.getTime()[digit.id], digit.min, digit.max, 2)
    arr.forEach((num, i) => {
        if(num < 10) num = `0${num}`
        let el = i === 2 ? creatEl('li', num) : creatEl('li', num)
        document.getElementById(digit.id).append(el)
    })
}

function moveUp(digit) {
    let el = document.getElementById(digit.id)
    el.style.transition = "transform 0.5s ease-in-out"
    el.style.transform = "translateY(-40vh)"
    setTimeout(() => {
        el.style.transition = ""
        el.style.transform = "translateY(0)"
        while(el.firstChild) el.removeChild(el.firstChild);
        addNums(digit)

    },500)
}

function setClockDigit(id) {
    document.getElementById(id).textContent = time.getTime()[id];
}

function creatEl(_tag, _text, _class) {
    let el = document.createElement(_tag)
    if(_text) el.textContent = _text
    if(_class) el.classList.add(_class)
    return el
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