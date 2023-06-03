import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const calendarEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    if (userDate < Date.now()) {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr(calendarEl, options);

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

let timerId = null;

function updateDateTime() {
  const difference = userDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(difference);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  if (difference <= 0) {
    clearInterval(timerId);
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function onClick() {
  updateDateTime();
  timerId = setInterval(() => updateDateTime(), 1000);
}
startBtn.addEventListener('click', onClick);
