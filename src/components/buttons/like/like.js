function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-mode');

  for (let item of items) {
    item.addEventListener('click', likeButtonPressing);
  }
}

function likeButtonPressing({target}) {
  const aim = target.closest('.like-mode'); 
  const icon = aim.querySelector('.like-mode__icon').firstElementChild;
  const counter = aim.querySelector('.like-mode__counter').firstElementChild;

  aim.classList.toggle('micro-button_pressed');
  icon.classList.toggle('gradient-fill');

  switch ( aim.classList.contains('micro-button_pressed') ) {
    case true: {
      icon.textContent = 'favorite'
      ++counter.textContent;
      break;
    }
    case false: {
      icon.textContent = 'favorite_border';
      --counter.textContent;
      break;
    }
  }
}

likeButtonEventListeners();