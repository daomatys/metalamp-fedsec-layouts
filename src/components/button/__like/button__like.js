import './button__like.scss';
import '../button.scss';

import '@components/material-icon-cell/material-icon-cell';

function likeButtonPressing({ target }) {
  const aim = target.closest('.like-button');
  const input = aim.firstElementChild;
  const icon = aim.querySelector('.material-icons');
  const counter = aim.querySelector('.like-button__text-counter');
  const caseInputChecked = input.hasAttribute('checked');

  if (caseInputChecked) {
    icon.textContent = 'favorite_border';
    counter.textContent = parseInt(counter.textContent, 10) - 1;
    input.removeAttribute('checked');
  }
  if (!caseInputChecked) {
    icon.textContent = 'favorite';
    counter.textContent = parseInt(counter.textContent, 10) + 1;
    input.setAttribute('checked', '');
  }
}

function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-button__elem');

  items.forEach((item) => item.addEventListener('click', likeButtonPressing));
}

likeButtonEventListeners();
