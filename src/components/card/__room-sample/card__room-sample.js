function createArrowScrollersEventListeners() {
  const containers = document.querySelectorAll('.room-sample__container_top');

  for ( let container of containers ) {
    let indication = {
      position: 1,
      left: {
        jump() { indication.position = 4; },
        get case() { return --indication.position < 1; }
      },
      right: {
        jump() { indication.position = 1; },
        get case() { return ++indication.position > 4; }
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
    const listingIndicator = click.parent.querySelectorAll('.room-sample__listing-indicator .material-icons');
    const index = () => click.indication.position - 1;

    listingIndicator[ index() ].textContent = 'trip_origin';

    if ( !indicator.case ) {
      scrollAnimation({ aim: aim, side: side })
    } else {
      scrollAnimation({ aim: aim, side: side, borderjump: true })
      indicator.jump();
    }

    listingIndicator[ index() ].textContent = 'circle';
  }
}

function scrollAnimation( click ) {
  const shiftModifier = click.side === 'left' ? 1 : -1 ;
  const shiftValue = shiftModifier * 270 + 'px';

  if ( click.borderjump ) {
    scrollBorderJump( click.aim, shiftModifier );
  }

  const shiftAnimation = click.aim.animate({
    transform: `translateX(${ shiftValue })`
  }, {
    easing: 'ease',
    duration: 500,
    fill: 'forwards',
    composite: 'add'
  });

  shiftAnimation.persist();
}

function scrollBorderJump( aim, modifier ) {
  const jumpValue = -modifier * 1080 + 'px';

  const jumpAnimation = aim.animate({
    transform: `translateX(${ jumpValue })`
  }, {
    fill: 'both',
    composite: 'add'
  });

  jumpAnimation.persist();
}

createArrowScrollersEventListeners();
