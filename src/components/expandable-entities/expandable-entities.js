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
  const caseExpanderIsDisabled = expander.hasAttribute('checked');

  if ( caseExpanderIsDisabled ) {
    expander.removeAttribute('checked');
  } else {
    expander.setAttribute('checked', '');
  }

  animate( icon );
  
  if ( aim ) {
    aim.classList.toggle('expander_active');
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
