function createArrowScrollersEventListeners() {
  const containers = document.querySelectorAll('.room-sample__container_top');

  for ( let container of containers ) {

    let indication = {
      position: 1,
      left: {
        get case() { return --this.position < 1; }, 
        set jump( val = 4 ) { this.position = val }
      },
      right: {
        get case() { return ++this.position > 4; },
        set jump( val = 1 ) { this.position = val }
      }
    };

    container.addEventListener(
      'click',
      ({target}) => filterAnimation({ parent: container, target: target, indication: indication })
    );
  }
}

function filterAnimation( click ) {
  const target = click.target.querySelector('.room-sample__arrow-scroller_left, .room-sample__arrow-scroller_right');
  const side = target.classList.contains('room-sample__arrow-scroller_left') ? 'left' : 'right' ;
  const aim = click.parent.querySelector('.room-sample__image');

  if ( indicationUpdate.case ) {
    scrollAnimation({ aim: aim, side: side })
  } else {
    scrollAnimation({ aim: aim, side: side, borderline: true })
  }
}

function scrollAnimation( click ) {
  const shiftModifier = click.side === 'left' ? 1 : -1 ;
  const shiftValue = shiftModifier * 270 + 'px';

  const shiftAnimation = click.aim.animate({
    transform: `translateX(${ shiftValue })`
  },{
    easing: 'ease',
    duration: 500,
    fill: 'forwards',
    composite: 'add'
  });

  shiftAnimation.persist();

  if ( click.borderline ) {
    shiftAnimation.onfinish = () => scrollBorderTeleportation( click.aim, shiftModifier );
  }
}

function scrollBorderTeleportation( aim, modifier ) {
  const jumpValue = modifier * -1080 + 'px';

  const jumpAnimation = aim.animate({
    transform: `translateX(${ jumpValue })`
  });

  jumpAnimation.persist();
}

createArrowScrollersEventListeners();
