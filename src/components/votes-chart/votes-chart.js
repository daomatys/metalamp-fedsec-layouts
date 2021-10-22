const votes = function() {
  const arcs = document.querySelectorAll('.votes-chart__diagram-element_unit');

  arcs.forEach( arc => arc.addEventListener('pointerover', onPointerOver ) );
}

const onPointerOver = function XXZ({target}) {
  const lastWidthValue = target.getAttribute('stroke-width');
  const newWidthValue = 36;

  target.setAttribute('stroke-width', newWidthValue);

  target.addEventListener('pointerout', () => onPointerOut( target, lastWidthValue ), {once: true});
}

const onPointerOut = function ASFSA( target, lastWidthValue ) {
  target.setAttribute('stroke-width', lastWidthValue);
}

votes();
