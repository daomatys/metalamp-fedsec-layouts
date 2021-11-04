const init = function() {
  const ejectors = document.querySelectorAll(".header__ejector");

  console.log( ejectors )

  ejectors.forEach( ejector => ejector.addEventListener("click", ({target}) => onEjectorClick(target)) );
}

const onEjectorClick = function onEjectorClickEvent( target ) {
  const aim = target.closest(".header__ejector");

  console.log( aim )

  if ( aim ) {
    aim.closest(".header__container_ejectable").classList.toggle("container-ejected");
  }
}

init();
