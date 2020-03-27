const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const qmark = document.querySelector('#rules');
const ruleContainer = document.querySelector('.rule-container');
const backdrop = document.querySelector('.rule-backdrop');

window.addEventListener('resize', handleLayoutChanges);
qmark.addEventListener('click', handleQmarkClick);

function handleLayoutChanges() {
  updateUIVisibility();
  updateCanvasDimensions();
}

function handleQmarkClick() {
  ruleContainer.classList.toggle("invisible");
  handleBackdrop();
}

function handleBackdrop() {
  backdrop.addEventListener('click', handleQmarkClick);
  backdrop.classList.toggle("invisible");
}

handleLayoutChanges();

function updateCanvasDimensions() {
  if (window.innerWidth >= 1250) {
    canvas.width = 1000;
    canvas.height = 700;
  } else if (window.innerWidth >= 1000) {
    canvas.width = 800;
    canvas.height = 560;
  } else if (window.innerWidth >= 760) {
    canvas.width = 700;
    canvas.height = 490;
  }
}

function updateUIVisibility() {
  const info = document.querySelector('.small-screen');
  const scoreboardContainer = document.querySelector('.scoreboard-container');
  const gameContainer = document.querySelector('.game-container');
  if (window.innerWidth >= 760) {
    info.classList.add('invisible');
    scoreboardContainer.classList.remove('invisible');
    gameContainer.classList.remove('invisible');
  } else {
    info.classList.remove('invisible');
    scoreboardContainer.classList.add('invisible');
    gameContainer.classList.add('invisible');
    ruleContainer.classList.add('invisible');
    backdrop.classList.add('invisible');
  }
}