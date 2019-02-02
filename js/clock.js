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
        max:    12
    },{ id:     'minute',
        min:    0,
        max:    59
    },{ id:     'second',
        min:    0,
        max:    59
    }]

//CLOCK
window.onload = () => {
    let id = setInterval(() => {
        digits.forEach(digit => {
            let digitEl = document.getElementById(digit.id);
            while(digitEl.firstChild) digitEl.removeChild(digitEl.firstChild);
            getNumArray(time.getTime()[digit.id], digit.min, digit.max, 5).forEach((num,i) => {
                if(digit.id !== 'hour') if(num < 10) num = `0${num}`
                let el = i === 5 ? creatEl('li',num,'current') : creatEl('li',num)
                document.getElementById(digit.id).append(el)
            })
        })
        // clearInterval(id);
    }, 1000)
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