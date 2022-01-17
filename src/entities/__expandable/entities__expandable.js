import './entities__expandable.scss';

function changeExpanderDisplayState(container, expander) {
  if (expander.hasAttribute('checked')) {
    expander.removeAttribute('checked');
  } else {
    expander.setAttribute('checked', '');
  }
  container.classList.toggle('js-expander_active');
}

function initEventListeners() {
  const containers = document.querySelectorAll('.js-expander__container');
  
  containers.forEach((container) => {
    const expander = container.querySelector('.js-expander');

    const clickEventHandler = () => {
      changeExpanderDisplayState(container, expander);
    };
    expander.addEventListener('click', clickEventHandler);
  });
}

initEventListeners();
