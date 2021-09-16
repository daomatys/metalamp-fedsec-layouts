function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-btn');

  for (let item of items) {
    item.addEventListener('click', likeButtonToggling);
  }
}

function likeButtonToggling({target}) {
  const aim = target.closest('.like-btn'); 
  const icon = aim.querySelector('.like-btn__icon').firstElementChild;
  const counter = aim.querySelector('.like-btn__counter').firstElementChild;

  aim.classList.toggle('like-btn_toggled');
  icon.classList.toggle('gradient-fill');

  switch ( aim.classList.contains('like-btn_toggled') ) {
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