function expanderInitEventListeners() {
  const items = document.querySelectorAll('.expander');

  for (let item of items) {
    item.addEventListener('click', expanderActivation);
  }
}

function expanderActivation({target}) {
  const parent = target.closest('.expander__parent')
  const aim = parent.querySelector('.expander__aim');
  const icon = parent.querySelector('.material-icons');

  aim.classList.toggle('expander_active');
  iconAnimation(icon);
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

expanderInitEventListeners();
