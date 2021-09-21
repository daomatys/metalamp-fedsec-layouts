function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-button');

  for (let item of items) {
    item.addEventListener('click', likeButtonPressing);
  }
}

function likeButtonPressing({target}) {
  const aim = target.closest('.like-button'); 
  const icon = aim.querySelector('.like-button__icon');
  const counter = aim.querySelector('.like-button__counter');

  if ( aim.attributes.checked ) {
    icon.textContent = 'favorite'
    ++counter.textContent;
  } else {
    icon.textContent = 'favorite_border';
    --counter.textContent;
  }
}

likeButtonEventListeners();