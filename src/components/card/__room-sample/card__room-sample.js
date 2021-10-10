function createArrowScrollersEventListeners() {

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

  const scrollers = document.querySelectorAll('.room-sample__arrow-scroller_left, .room-sample__arrow-scroller_right');

  for ( let scroller of scrollers ) {
    scroller.addEventListener(
      'click',
      ({target}) => filterAnimation({ target: target, indication: indication })
    );
  }
}

function filterAnimation( click ) {
  const target = click.target.closest('.room-sample__arrow-scroller_left, .room-sample__arrow-scroller_right');
  const side = target.classList.contains('room-sample__arrow-scroller_right') ? 'left' : 'right' ;
  const parent = target.closest('.room-sample__container_top');
  const aim = parent.querySelector('.room-sample__image');
  const indicationUpdate = side === 'left' ? click.indication.left : click.indication.right ;

  if ( indicationUpdate.case ) {
    scrollAnimation({ aim: aim, side: side })
  } else {
    scrollAnimation({ aim: aim, side: side, borderline: true })
    indicationUpdate.jump;
  }

  console.log(click.indication.left.position)
}

function scrollAnimation( click ) {
  const shiftModifier = click.side === 'left' ? -1 : 1 ;
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
