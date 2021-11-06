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
  const windowClassListToggle = window => {
    window.classList.toggle('.modal-window_visible');
    window.classList.toggle('.modal-window-invisible');
  }
  const defineButon = suffix => document.querySelector(`#ejectable-button_${suffix}-1`);
  const defineButtonAction = ( button, window ) => button.addEventListener('click', () => windowClassListToggle( window ) );

  const buttonFilter = defineButon('filter-room');
  const buttonNavigation = defineButon('navigation');
  const buttonAuthorization = defineButon('authorization');

  const modalWindowFilter = document.querySelector('.search-page__input-parameters');
  const modalWindowNavigation = document.querySelector('.modal-window_navigation');
  const modalWindowAuthorization = document.querySelector('.modal-window_authorization');

  defineButtonAction( buttonFilter,        modalWindowFilter );
  defineButtonAction( buttonNavigation,    modalWindowNavigation );
  defineButtonAction( buttonAuthorization, modalWindowAuthorization );
}

initButtons();
