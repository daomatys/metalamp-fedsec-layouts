const votes = function() {
  const arcs = document.querySelectorAll('.votes-chart__diagram-element_unit');

  console.log(arcs)

  arcs.forEach( arc => arc.addEventListener('pointerover', onPointerOver ) );
}

const onPointerOver = function XXZ({target}) {
  const lastWidthValue = target.getAttribute('stroke-width');
  const lastRadius = target.getAttribute('r');
  const newWidthValue = 25;
  const newRadius = 60 - newWidthValue / 2;

  target.setAttribute('stroke-width', newWidthValue);
  target.setAttribute('r', newRadius);

  target.addEventListener('pointerout', () => onPointerOut( target, lastWidthValue, lastRadius ), {once: true});
}

const onPointerOut = function ASFSA( target, lastWidthValue, lastRadius ) {
  target.setAttribute('stroke-width', lastWidthValue);
  target.setAttribute('r', lastRadius);
}

votes();
