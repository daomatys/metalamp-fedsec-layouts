import './entities__expandable.scss';

const init = function expanderInitEventListeners() {
  const expanders = document.querySelectorAll('.js-expander');

  if (expanders) {
    expanders.forEach((expander) => expander.addEventListener('click', () => activate(expander)));
  }
};

const activate = function expanderActivation(expander) {
  const parent = expander.closest('.js-expander__parent');
  const aim = parent.querySelector('.js-expander__aim');
  const icon = parent.querySelector('.material-icons');
  const caseExpanderIsDisabled = expander.hasAttribute('checked');

  if (caseExpanderIsDisabled) {
    expander.removeAttribute('checked');
  } else {
    expander.setAttribute('checked', '');
  }

  animate(icon);

  if (aim) {
    aim.classList.toggle('js-expander_active');
  }
};

const animate = function iconAnimation(icon) {
  const animation = icon.animate({
    transform: 'rotateX(0.5turn)',
  }, {
    easing: 'ease',
    duration: 400,
    fill: 'both',
    composite: 'add',
  });
  animation.persist();
};

init();
