import './entities__expandable.scss';

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
  if (aim) {
    aim.classList.toggle('js-expander_active');
  }
  icon.classList.toggle('js-icon-rotated');
}

function initEventListeners() {
  const expanders = document.querySelectorAll('.js-expander');
  
  expanders.forEach((expander) => {
    const clickEventHandler = () => changeExpanderDisplayState(expander);
    expander.addEventListener('click', clickEventHandler);
  });
}

initEventListeners();
