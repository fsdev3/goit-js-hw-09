const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);
let delay, step, amount;

function onSubmit(event) {
  event.preventDefault();
  delay = event.target.elements.delay.value;
  step = event.target.elements.step.value;
  amount = event.target.elements.amount.value;

  // console.log(delay, step, amount);
  startCreatePromise();
}

function startCreatePromise() {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
