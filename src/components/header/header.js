const initEjector = function() {
  const ejectors = document.querySelectorAll(".header__ejector");

  ejectors.forEach( ejector => ejector.addEventListener("click", ({target}) => onEjectorClick(target)) );
}

const onEjectorClick = function onEjectorClickEvent( target ) {
  const aim = target.closest(".header__ejector");

  if ( aim ) {
    aim.closest(".header__container_ejectable").classList.toggle("container-ejected");
  }
}

initEjector();


const initButtons = function initButtons() {
  const main = document.querySelector('.website__main');

  if ( main ) {
    const footer = document.querySelector('.website__footer');

    const elementClassListToggle = element => {
      element.classList.toggle('window_invisible');
    }

    const windowsClassListToggle = window => {
      elementClassListToggle( main );
      elementClassListToggle( window );
      elementClassListToggle( footer );
    }

    const defineButon = suffix => document.querySelector(`#ejectable-button_${suffix}-1`);
    const defineButtonAction = ( button, window ) => button.addEventListener('click', () => windowsClassListToggle( window ) );

    const buttonFilter = defineButon('filtration');
    const buttonNavigation = defineButon('navigation');
    const buttonAuthorization = defineButon('authorization');

    const modalWindowFilter = document.querySelector('.modal-window_filtration');
    const modalWindowNavigation = document.querySelector('.modal-window_navigation');
    const modalWindowAuthorization = document.querySelector('.modal-window_authorization');

    if ( modalWindowFilter ) defineButtonAction( buttonFilter, modalWindowFilter );
    defineButtonAction( buttonNavigation,    modalWindowNavigation );
    defineButtonAction( buttonAuthorization, modalWindowAuthorization );
  }
}

initButtons();
