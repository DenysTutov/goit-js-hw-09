import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  submitBtn: document.querySelector('button'),
};

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

refs.submitBtn.addEventListener('click', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delay = refs.formEl.elements.delay.value;
  const step = refs.formEl.elements.step.value;
  const amount = refs.formEl.elements.amount.value;

  generatePromises(+delay, +step, +amount);
}

function generatePromises(delay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 10000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 10000,
        });
      });

    delay += step;
  }
}
