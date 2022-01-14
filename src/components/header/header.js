import './header.scss';

import '@components/logo/logo';
import '@components/material-icon-cell/material-icon-cell';
import '@components/navigation-bar/navigation-bar';
import '@components/button/__mean-oval/button__mean-oval';

const onEjectorClick = function onEjectorClickEvent(target) {
  const aim = target.closest('.header__ejector');

  if (aim) {
    aim.closest('.header__container_ejectable').classList.toggle('container-ejected');
  }
};

const initEjector = function initEjector() {
  const ejectors = document.querySelectorAll('.header__ejector');
  const clickEventHandler = ({ target }) => onEjectorClick(target);

  ejectors.forEach((ejector) => ejector.addEventListener('click', clickEventHandler));
};

initEjector();

const initButtons = function initButtons() {
  const main = document.querySelector('.website__main');

  if (main) {
    const footer = document.querySelector('.website__footer');

    const elementClassListToggle = function elementClassListToggle(element) {
      element.classList.toggle('modal-window_invisible');
    };
    const windowsClassListToggle = function windowsClassListToggle(window) {
      elementClassListToggle(main);
      elementClassListToggle(window);
      elementClassListToggle(footer);
    };
    const defineButtonAction = function defineButtonActionForCertainModalWindow(button, window) {
      const clickEventHandler = () => windowsClassListToggle(window);
      button.addEventListener('click', clickEventHandler);
    };
    const defineButon = (suffix) => document.querySelector(`#ejectable-button_${suffix}-1`);
    const defineModalWindow = (suffix) => document.querySelector(`.modal-window__${suffix}`);

    const buttonFiltration = defineButon('filtration');
    const buttonNavigation = defineButon('navigation');
    const buttonAuthorization = defineButon('authorization');

    const modalWindowFiltration = defineModalWindow('filtration');
    const modalWindowNavigation = defineModalWindow('navigation');
    const modalWindowAuthorization = defineModalWindow('authorization');

    if (modalWindowFiltration) {
      defineButtonAction(buttonFiltration, modalWindowFiltration);
    }
    defineButtonAction(buttonNavigation, modalWindowNavigation);
    defineButtonAction(buttonAuthorization, modalWindowAuthorization);
  }
};

initButtons();
