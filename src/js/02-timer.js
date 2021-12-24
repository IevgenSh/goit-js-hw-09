import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
button.disabled = true;
let startTime = 0;

const refs = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0];
    if (startTime <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future!')
    }
    else {
      Notiflix.Notify.success('Yes, that`s it! Now click Start');
      button.disabled = false;
    }
  },
};

function convertMs(ms) {
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

flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onBtnClick() {
  const timer = setInterval(() => {
    let deltaTime = startTime - new Date();
    console.log(deltaTime);
    let time = convertMs(deltaTime);
    refs.days.innerHTML = addLeadingZero(time.days);
    refs.hours.innerHTML = addLeadingZero(time.hours);
    refs.minutes.innerHTML = addLeadingZero(time.minutes);
    refs.seconds.innerHTML = addLeadingZero(time.seconds);
    if (deltaTime < 10000) {
      refs.seconds.style.color = "red";
    }
    if (deltaTime < 1000) {
      clearInterval(timer)
    }
  }, 1000);

}

button.addEventListener('click', onBtnClick);
