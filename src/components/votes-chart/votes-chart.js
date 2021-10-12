function eternalCircleRotation() {
  const circle = document.querySelector('.votes-chart__diagram-element');

  if ( circle ) {
    const circleAnimation = circle.animate({
      transform: 'rotateZ(360deg)'
    }, {
      easing: 'linear',
      duration: 60000,
      iterations: Infinity,
      composite: 'add'
    });
  }
}

eternalCircleRotation();
