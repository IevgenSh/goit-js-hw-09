import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget;

  let newDelay = Number(delay.value);
  let newStep = Number(step.value);
  let newAmount = Number(amount.value);

  for (let position = 1; position <= newAmount; position += 1) {
    createPromise(position, newDelay);
    console.log("delayPromise", newDelay, "position", position);
    newDelay += newStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const values = { position, delay };
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(values);
      } else {
        // Reject
        reject(values);
      }
    }, delay);
  });
  promise
    .then((values) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch((values) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });

}