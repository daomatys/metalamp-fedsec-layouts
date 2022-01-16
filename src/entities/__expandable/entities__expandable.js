import './entities__expandable.scss';

function animateIcon(icon) {
  const animation = icon.animate({
    transform: 'rotateX(0.5turn)',
  }, {
    easing: 'ease',
    duration: 400,
    fill: 'both',
    composite: 'add',
  });
  animation.persist();
}

function changeExpanderDisplayState(expander) {
  const parent = expander.closest('.js-expander__parent');
  const aim = parent.querySelector('.js-expander__aim');
  const icon = parent.querySelector('.material-icons');

  const caseExpanderIsDisabled = expander.hasAttribute('checked');

  if (caseExpanderIsDisabled) {
    expander.removeAttribute('checked');
  } else {
    expander.setAttribute('checked', '');
  }
  animateIcon(icon);

  if (aim) {
    aim.classList.toggle('js-expander_active');
  }
}

function initEventListeners() {
  const expanders = document.querySelectorAll('.js-expander');
  const clickEventHandler = (expander) => changeExpanderDisplayState(expander);

  expanders.forEach((expander) => {
    expander.addEventListener('click', clickEventHandler);
  });
}

initEventListeners();
