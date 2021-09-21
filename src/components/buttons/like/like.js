function likeButtonEventListeners() {
  const items = document.querySelectorAll('.like-button__elem');

  for (let item of items) {
    item.addEventListener('click', likeButtonPressing);
  }
}

function likeButtonPressing({target}) {
  const aim = target.closest('.like-button');
  const input = aim.firstChild;
  const counter = aim.querySelector('.like-button__text_counter');

  if ( input.checked ) {
    --counter.textContent;
    input.checked = false;
  } else {
    ++counter.textContent;
    input.checked = true;
  }
}

likeButtonEventListeners();