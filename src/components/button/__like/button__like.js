import './button__like.scss';
import '../button.scss';

import '@components/material-icon-cell/material-icon-cell';

function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-button__elem');

  for (const item of items) {
    item.addEventListener('click', likeButtonPressing);
  }
}

function likeButtonPressing({ target }) {
  const aim = target.closest('.like-button');
  const input = aim.firstElementChild;
  const icon = aim.querySelector('.material-icons');
  const counter = aim.querySelector('.counter-elem');

  if (input.hasAttribute('checked')) {
    icon.textContent = 'favorite_border';
    --counter.textContent;
    input.removeAttribute('checked');
  } else {
    icon.textContent = 'favorite';
    ++counter.textContent;
    input.setAttribute('checked', true);
  }
}

likeButtonEventListeners();
