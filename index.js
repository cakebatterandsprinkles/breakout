const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function handleFirstLayout() {
  const info = document.querySelector('.small-screen');
  const scoreboardContainer = document.querySelector('.scoreboard-container');
  const gameContainer = document.querySelector('.game-container');
  if (window.innerWidth >= 1250) {
    info.classList.add('invisible');
    scoreboardContainer.classList.remove('invisible');
    gameContainer.classList.remove('invisible');
  } else if (window.innerWidth < 1250 && window.innerWidth >= 1000) {
    info.classList.add('invisible');
    scoreboardContainer.classList.remove('invisible');
    gameContainer.classList.remove('invisible');
    canvas.width = 800;
    canvas.height = 560
  } else if (window.innerWidth >= 760 && window.innerWidth < 1000) {
    info.classList.add('invisible');
    scoreboardContainer.classList.remove('invisible');
    gameContainer.classList.remove('invisible');
    canvas.width = 700;
    canvas.height = 490;
  } else if (window.innerWidth < 760) {
    info.classList.remove('invisible');
    scoreboardContainer.classList.add('invisible');
    gameContainer.classList.add('invisible');
  }
}

window.addEventListener('resize', e => {
  handleLayoutChanges(e)
})

function handleLayoutChanges(e) {
  const info = document.querySelector('.small-screen');
  const scoreboardContainer = document.querySelector('.scoreboard-container');
  const gameContainer = document.querySelector('.game-container');
  if (e.target.innerWidth < 1250 && e.target.innerWidth >= 1000) {
    info.classList.add('invisible');
    scoreboardContainer.classList.remove('invisible');
    gameContainer.classList.remove('invisible');
    canvas.width = 800;
    canvas.height = 560
  } else if (e.target.innerWidth >= 760 && e.target.innerWidth < 1000) {
    info.classList.add('invisible');
    scoreboardContainer.classList.remove('invisible');
    gameContainer.classList.remove('invisible');
    canvas.width = 700;
    canvas.height = 490;
  } else if (e.target.innerWidth < 760) {
    info.classList.remove('invisible');
    scoreboardContainer.classList.add('invisible');
    gameContainer.classList.add('invisible');
  }
}

handleFirstLayout();