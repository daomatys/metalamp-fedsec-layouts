const init = function expanderInitEventListeners() {
  const expanders = document.querySelectorAll('.expander');

  if ( expanders ) {
    expanders.forEach( expander => expander.addEventListener('click', () => activate( expander )) );
  }
}

const activate = function expanderActivation( expander ) {
  const parent = expander.closest('.expander__parent');
  const aim = parent.querySelector('.expander__aim');
  const icon = parent.querySelector('.material-icons');

  const isExpanderActive = !expander.hasAttribute('checked');

  if ( isExpanderActive ) {
    expander.setAttribute('checked', '');
  } else {
    expander.removeAttribute('checked');
  }

  animate( icon );
  expander.onblur = () => expander.click();
    
  if ( aim ) {
    const toggle = () => aim.classList.toggle('expander_active');

    toggle();
  }
}

const animate = function iconAnimation( icon ) {
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

init();
