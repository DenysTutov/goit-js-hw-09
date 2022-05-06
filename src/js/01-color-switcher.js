function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const { bodyEl, startBtn, stopBtn } = refs;

startBtn.addEventListener('click', onStartGenerateColor);
stopBtn.addEventListener('click', onStopGenerateColor);

let timerId = null;
stopBtn.setAttribute('disabled', 'disabled');

function onStartGenerateColor() {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopGenerateColor() {
  clearInterval(timerId);

  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}
