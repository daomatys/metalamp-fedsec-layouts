function createArrowScrollersEventListeners() {
  const findScrollersByDirection = suffix => document.querySelectorAll(`.room-sample__arrow-scroller_${suffix}`);

  const leftScrollers = findScrollersByDirection('left');
  const rightScrollers = findScrollersByDirection('right');

  leftScrollers.addEventListener('click', initLeftScrollersEventListeners);
  rightScrollers.addEventListener('click', initRightScrollersEventListeners);
}


function scrollAnimation() {
  
}

function scrollBorderTeleportation() {

}