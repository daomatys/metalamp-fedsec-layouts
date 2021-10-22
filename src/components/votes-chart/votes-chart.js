const votes = function() {
  const arcs = document.querySelectorAll('.votes-chart__diagram-element_unit');

  console.log(arcs)

  arcs.forEach( arc => arc.addEventListener('pointerover', onPointerOver ) );
}

const onPointerOver = function XXZ({target}) {
  const lastAttribute = target.getAttribute('stroke-width');

  target.setAttribute('stroke-width', 9);

  target.addEventListener('pointerout', () => onPointerOut( target, lastAttribute ), {once: true});
}

const onPointerOut = function ASFSA( target, lastAttribute ) {
  target.setAttribute('stroke-width', lastAttribute);
}

votes();
