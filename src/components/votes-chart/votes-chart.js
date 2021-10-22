const votes = function() {
  const arcs = document.querySelectorAll('.votes-chart__diagram-element_unit');

  arcs.forEach( arc => arc.addEventListener('pointerover', onPointerOver ) );
}

const onPointerOver = function pointerOverEvent({target}) {
  const centralTextValue = document.querySelector('.votes-chart__diagram-text_votes');
  const centralText = centralTextValue.textContent;

  const lastWidthValue = target.getAttribute('stroke-width');
  const newWidthValue = 32;

  target.setAttribute('stroke-width', newWidthValue);
  centralTextValue.textContent = target.getAttribute('data-votes');

  target.addEventListener('pointerout', () => onPointerOut( target, lastWidthValue, centralText ), {once: true});
}

const onPointerOut = function pointerOutEvent( target, lastWidthValue, centralText ) {
  target.setAttribute('stroke-width', lastWidthValue);
  document.querySelector('.votes-chart__diagram-text_votes').textContent = centralText;
}

votes();
