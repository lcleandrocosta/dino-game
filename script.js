const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyup(event) {
    if(event.keyCode === 32) {
      if (!isJumping) {
        jump();
      } 
    }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 500) {
      clearInterval(upInterval);

      //Descendo
      let downInterval = setInterval(() => {
        if (position <= 150) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    }else {
      //Subindo
      position += 40;
      dino.style.bottom = position + 'px';
    }
  }, 40);
}

function createPtero () {
  const ptero = document.createElement('div');
  let pteroPosition = 1000;
  let randomTime = Math.random() * 10000;

  ptero.classList.add('ptero');
  ptero.style.left = 1000 + 'px';
  background.appendChild(ptero);

  let leftInterval = setInterval(() => {
    if (pteroPosition < -150) {
      clearInterval(leftInterval);
      background.removeChild(ptero);
    } else if (pteroPosition > 0 && pteroPosition < 150 && position < 150){
      // Game Over
      clearInterval(leftInterval);
      //document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
      document.body.innerHTML = '<img class="game-over" src="img/background-gameover.png"/>';
    } else {
      pteroPosition -= 40;
      ptero.style.left = pteroPosition + 'px';
    }
  }, 40);

  setTimeout(createPtero, randomTime);
}

createPtero();
document.addEventListener('keyup', handleKeyup);