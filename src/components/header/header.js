const init = function() {
  const ejectors = document.querySelectorAll(".header__ejector");

  ejectors.forEach( ejector => ejector.addEventListener("click", ({target}) => onEjectorClick(target)) );
}

const onEjectorClick = function onEjectorClickEvent( target ) {
  const aim = target.closest(".header__ejector");

  if ( aim ) {
    aim.closest(".header__container_ejectable").classList.toggle("container-ejected");
  }
}

init();
