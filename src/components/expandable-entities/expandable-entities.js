function expanderInitEventListeners() {
  const items = document.querySelectorAll('.expander');

  for (let item of items) {
    item.addEventListener('click', expanderActivation);
  }
}

function expanderActivation({target}) {
  const expander = target;
  const parent = expander.closest('.expander__parent');
  const aim = parent.querySelector('.expander__aim');
  const icon = parent.querySelector('.material-icons');

  console.log(expander)

  const isExpanderActive = !expander.hasAttribute('checked');

  if ( isExpanderActive ) {
    expander.setAttribute('checked', '');
  } else {
    expander.removeAttribute('checked');
  }

  expanderToggle();

  function expanderToggle() {
    iconAnimation( icon );
    aim.classList.toggle('expander_active');
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
  });
  animation.persist();
}

expanderInitEventListeners();
