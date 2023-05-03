const body = document.querySelector('body');
let interval = null;
const btns = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]')
}
const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;

btns.stop.disabled = true
btns.start.addEventListener('click',() => {
    interval = setInterval(()=>{
        body.style.backgroundColor = getRandomHexColor()
    },1000) 
    btns.start.disabled = true;
    btns.stop.disabled = false;
})

btns.stop.addEventListener('click',() => {
    clearInterval(interval)
    btns.stop.disabled = true;
    btns.start.disabled = false
})