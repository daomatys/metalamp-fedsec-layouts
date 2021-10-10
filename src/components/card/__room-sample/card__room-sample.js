function createArrowScrollersEventListeners() {

  let positioning = {
    position: 1,
    left: {
      shift() { return --this.position < 1; }, 
      jump()  { this.position = 4 }
    },
    right: {
      shift() { return ++this.position > 4; },
      jump()  { this.position = 1 }
    }
  };

  const scrollers = document.querySelectorAll('.room-sample__arrow-scroller_left, .room-sample__arrow-scroller_right');

  for ( let scroller of scrollers ) {
    scroller.addEventListener(
      'click',
      ({target}) => filterAnimation({ target: target, positioning: positioning })
    );
  }
}

function filterAnimation( click ) {
  const target = click.target;
  const side = target.classList.contains('.room-sample__arrow-scroller_left') ? 'left' : 'right' ;
  const parent = target.closest('.room-sample__container_top');
  const aim = parent.querySelector('.room-sample__image');
  const changePosition = side === 'left' ? click.positioning.left : click.positioning.right ;

  if ( click.case ) {
    scrollAnimation({ aim: aim, side: side })
    changePosition().shift();
  } else {
    scrollAnimation({ aim: aim, side: side, borderline: true })
    changePosition().warp();
  }
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
    shiftAnimation.onfinish = scrollBorderTeleportation( click.aim, shiftModifier );
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
