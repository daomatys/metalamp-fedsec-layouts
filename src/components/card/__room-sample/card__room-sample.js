function createArrowScrollersEventListeners() {
  const containers = document.querySelectorAll('.room-sample__container_top');

  for ( let container of containers ) {

    let indication = {
      position: 1,
      left: {
        shift()    { --indication.position; },
        jump()     { indication.position = 4; },
        get case() { return indication.position < 1; }
      },
      right: {
        shift()    { ++indication.position; },
        jump()     { indication.position = 1; },
        get case() { return indication.position > 4; },
        
      }
    };

    container.addEventListener(
      'click',
      ({target}) => filterAnimation({ parent: container, target: target, indication: indication })
    );
  }
}

function filterAnimation( click ) {
  const target = click.target.closest('.room-sample__arrow-scroller_left, .room-sample__arrow-scroller_right');

  if ( target ) {
    const aim = click.parent.querySelector('.room-sample__image');
    const side = target.classList.contains('room-sample__arrow-scroller_left') ? 'left' : 'right' ;
    const indicator = side === 'left' ? click.indication.left : click.indication.right ;

    indicator.shift();

    if ( !indicator.case ) {
      scrollAnimation({ aim: aim, side: side })
    } else {
      scrollAnimation({ aim: aim, side: side, borderline: true })
      indicator.jump();
    }
  }
}

function scrollAnimation( click ) {
  const shiftModifier = click.side === 'left' ? 1 : -1 ;
  const shiftValue = shiftModifier * 270 + 'px';

  const shiftAnimation = click.aim.animate({
    transform: `translateX(${ shiftValue })`
  }, {
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
  
  console.log('jump!')

  const jumpAnimation = aim.animate({
    transform: `translateX(${ jumpValue })`
  }, {
    fill: 'forwards',
    composite: 'replace'
  });

  jumpAnimation.persist();
}

createArrowScrollersEventListeners();
