// Описан в документации
import flatpickr from "flatpickr";
import notiflix from "notiflix";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
let inputTime =  document.querySelector('#datetime-picker')
let btnStart = document.querySelector('button[data-start]')
btnStart.disabled = true;
let timeEl = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()){
        alert("Please choose a date in the future")
        btnStart.disabled = true
    } else {
        btnStart.disabled = false
    }
  },
};
flatpickr(inputTime, options)
const convertMs = (ms) => {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  const formatTime = (timeObj) => ({
    days: timeObj.days < 10 ? `0${timeObj.days}` : timeObj.days,
    hours: timeObj.hours < 10 ? `0${timeObj.hours}` : timeObj.hours,
    minutes: timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes,
    seconds: timeObj.seconds < 10 ? `0${timeObj.seconds}` : timeObj.seconds
  })
  const printTime = (lastTime) => {
    const timeObj = formatTime(convertMs(lastTime))
    timeEl.days.innerHTML = timeObj.days
    timeEl.hours.innerHTML = timeObj.hours
    timeEl.minutes.innerHTML = timeObj.minutes
    timeEl.seconds.innerHTML = timeObj.seconds

  }
 btnStart.addEventListener('click',() =>{
    inputTime.disabled = true;
    btnStart.disabled = true;
    let interval = setInterval(() => {
        let lastTime = new Date(inputTime.value) - new Date()
       if (lastTime>1){
        printTime(lastTime)
       } else {
        clearInterval(interval);
            inputTime.disabled = false;
    btnStart.disabled = false;
       }
    },1000)
 })