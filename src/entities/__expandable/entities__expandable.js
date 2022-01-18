import './entities__expandable.scss';

export function changeExpanderDisplayState(container) {
  const expander = container.querySelector('.js-expander');
  if (expander.hasAttribute('checked')) {
    expander.removeAttribute('checked');
  } else {
    expander.setAttribute('checked', '');
  }
  container.classList.toggle('js-expander_active');
}

function closeEachActiveContainer(container) {
  const currentActiveContainers = document.querySelectorAll('.js-expander_active');

  currentActiveContainers.forEach((activeContainer) => {
    if (!container.isEqualNode(activeContainer)) {
      changeExpanderDisplayState(activeContainer);
    }
  })
}

function initEventListeners() {
  const containers = document.querySelectorAll('.js-expander__container');

  containers.forEach((container) => {
    const expander = container.querySelector('.js-expander');

    const clickEventHandler = function clickEventHandler() {
      //closeEachActiveContainer(container)
      changeExpanderDisplayState(container);
    };
    expander.addEventListener('click', clickEventHandler);
  });
}

initEventListeners();
