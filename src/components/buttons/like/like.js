function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-button');

  for (let item of items) {
    item.addEventListener('click', likeButtonPressing);
  }
}

function likeButtonPressing({target}) {
  const aim = target.closest('.like-button'); 
  const icon = aim.querySelector('.like-button__icon').firstElementChild;
  const counter = aim.querySelector('.like-button__counter').firstElementChild;

  aim.classList.toggle('like-button_pressed');
  icon.classList.toggle('gradient-fill');

  switch ( aim.classList.contains('like-button_pressed') ) {
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