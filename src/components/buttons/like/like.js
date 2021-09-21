function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-button');

  for (let item of items) {
    item.addEventListener('click', likeButtonPressing);
  }
}

function likeButtonPressing({target}) {
  const aim = target.closest('.like-button__elem'); 
  const icon = aim.parentElement.querySelector('.like-button__text_icon');
  const counter = aim.parentElement.querySelector('.like-button__text_counter');

  if ( aim.attributes.checked ) {
    icon.textContent = 'favorite'
    ++counter.textContent;
  } else {
    icon.textContent = 'favorite_border';
    --counter.textContent;
  }
}

likeButtonEventListeners();