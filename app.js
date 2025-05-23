const btn = document.querySelector('#start-button');
const int = document.querySelector('#intro');
const g = document.querySelector('#game');
const sp = document.querySelector('#spaceman');
let score = 0;
const scoreDisplay = document.querySelector('#score');

let obsInterval;

// StARTING THE GAME
btn.addEventListener('click', () => {
  int.style.display = 'none';
  g.style.display = 'block';
  btn.remove();
  startGame();
});

function startGame(){
let topSp = 120;

// MOVE
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowUp'){
    topSp = topSp - 20;
  }else if(e.key === 'ArrowDown'){
    topSp = topSp + 20;
  }

  // مساحة اللعب
  if(topSp < 0){
    topSp = 0;
  }
  if(topSp > 260){
    topSp = 260;
  }

  sp.style.top = topSp + 'px';
});

//  سرعة تكوين الاوبستكلز
obsInterval = setInterval(makeObstacle, 700);
}

//  الحواجز
function makeObstacle(){
let obs = document.createElement('div');
obs.classList.add('obstacle');
obs.style.position = 'absolute';
obs.style.top = Math.floor(Math.random() * 270) + 'px';
obs.style.left = g.offsetWidth + 'px';

g.appendChild(obs);

let oLeft = g.offsetWidth;

// تحرك الحواجز من اليمين لليسار
let moveObs = setInterval(function(){
  oLeft = oLeft - 5;
  obs.style.left = oLeft + 'px';

if (checkHit(obs)) {
  gameOver = true;
  clearInterval(moveObs);
  clearInterval(obsInterval);

  const gameOverMessage = document.querySelector('#game-over-message');
  const finalScoreText = document.querySelector('#final-score-text');
  gameOverMessage.classList.remove('hidden');

  if (score >= 20) {
    finalScoreText.textContent = `✅ You Win! Your Score: ${score}`;
  } else {
    finalScoreText.textContent = `💥 Game Over! Your Score: ${score}`;
  }

  return;
}


  // إذا انتهت العقبات تنحذف عشان لا تشير اللعبة
  if(oLeft < -30){
    obs.remove();
    clearInterval(moveObs);
  score++;
  scoreDisplay.textContent = 'Score: ' + score;
  }
}, 20);
}

// ضبط التصادم لمستوى طبيعي
function checkHit(obs) {
  let r1 = sp.getBoundingClientRect();
  let r2 = obs.getBoundingClientRect();

  let padding = 10;

  return !(
    (r1.top + padding) > (r2.bottom - padding) ||
    (r1.bottom - padding) < (r2.top + padding) ||
    (r1.right - padding) < (r2.left + padding) ||
    (r1.left + padding) > (r2.right - padding)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const restartButton = document.querySelector('#restart-button');
  if (restartButton) {
    restartButton.addEventListener('click', () => {
      location.reload(); // Reload the page
    });
  }
});