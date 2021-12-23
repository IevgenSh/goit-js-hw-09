const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
}

let changeBckgColor = null;

const onStartBtnClick = () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  changeBckgColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

const onStopBtnClick = () => {
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  clearInterval((changeBckgColor));
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);