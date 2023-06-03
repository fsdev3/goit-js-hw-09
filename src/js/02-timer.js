import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const calendarEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let userDate = selectedDates[0].getTime();
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// function updateDateTime() {
//   const selectedDate = datetimePicker.selectedDates[0].getTime();
//   const currentDate = new Date().getTime();
//   const difference = selectedDate - currentDate;
//   const { days, hours, minutes, seconds } = convertMs(difference);
//   daysEl.textContent = addLeadingZero(days);
//   hoursEl.textContent = addLeadingZero(hours);
//   minutesEl.textContent = addLeadingZero(minutes);
//   secondsEl.textContent = addLeadingZero(seconds);
//   if (difference <= 0) {
//     clearInterval(timerId);
//     daysEl.textContent = '00';
//     hoursEl.textContent = '00';
//     minutesEl.textContent = '00';
//     secondsEl.textContent = '00';
//     return;
//   }
// }
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }
// function onBtnClick() {
//   updateDateTime();
//   timerId = setInterval(() => updateDateTime(), 1000);
// }
// btnEl.addEventListener('click', onBtnClick);
