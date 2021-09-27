function checkboxListButtonEventListeners() {
  const items = document.querySelectorAll('.checkbox-list__title-button_hidden-input');

  for (let item of items) {
    item.addEventListener('click', checkboxListButtonPressing);
  }
}

function checkboxListButtonPressing({target}) {
  const parent = target.closest('.checkbox-list')
  const list = parent.querySelector('.checkbox-list__checkboxes-array');
  const icon = parent.querySelector('.material-icons');

  iconAnimation(icon);
  list.classList.toggle('checkbox-list_inserted')

  if ( target.hasAttribute('checked') ) {
    target.removeAttribute('checked')
  } else {
    target.setAttribute('checked', true)
  }
}

function iconAnimation(icon) {
  const animation = icon.animate({
    transform: 'rotateX(0.5turn)'
  }, {
    easing: 'ease',
    duration: 400,
    fill: 'both',
    composite: 'add'
  })
  animation.persist();
}

checkboxListButtonEventListeners();
