import '../card.scss';
import './card__room-sample.scss';

import '@components/button/__star-rate/button__star-rate';
import '@components/material-icon-cell/material-icon-cell';

function createArrowScrollersEventListeners() {
  const containers = document.querySelectorAll('.card-room-sample__container_top');

  for (const container of containers) {
    const indication = {
      position: 1,
      left: {
        jump() { indication.position = 4; },
        get case() { return --indication.position < 1; },
      },
      right: {
        jump() { indication.position = 1; },
        get case() { return ++indication.position > 4; },
      },
    };

    container.addEventListener(
      'click',
      ({ target }) => filterAnimation({ parent: container, target, indication }),
    );
  }
}

function filterAnimation(click) {
  const target = click.target.closest('.card-room-sample__arrow-scroller_left, .card-room-sample__arrow-scroller_right');

  if (target) {
    const aim = click.parent.querySelector('.card-room-sample__image');
    const side = target.classList.contains('card-room-sample__arrow-scroller_left') ? 'left' : 'right';
    const indicator = side === 'left' ? click.indication.left : click.indication.right;
    const listingIndicator = click.parent.querySelectorAll('.card-room-sample__listing-indicator .material-icons');

    const defineIndex = () => click.indication.position - 1;
    const adjustIndicatorByIndex = (text) => listingIndicator[defineIndex()].textContent = text;

    adjustIndicatorByIndex('panorama_fish_eye');

    if (!indicator.case) {
      scrollAnimation({ aim, side });
    } else {
      scrollAnimation({ aim, side, borderjump: true });
      indicator.jump();
    }

    adjustIndicatorByIndex('circle');
  }
}

function scrollAnimation(click) {
  const shiftModifier = click.side === 'left' ? 1 : -1;
  const shiftValue = `${shiftModifier * 270}px`;

  if (click.borderjump) {
    borderJumpAnimation(click.aim, shiftModifier);
  }

  const shiftAnimation = click.aim.animate({
    transform: `translateX(${shiftValue})`,
  }, {
    easing: 'ease',
    duration: 500,
    fill: 'forwards',
    composite: 'add',
  });

  shiftAnimation.persist();
}

function borderJumpAnimation(aim, modifier) {
  const jumpRange = `${modifier * -1080}px`;

  const jumpAnimation = aim.animate({
    transform: `translateX(${jumpRange})`,
  }, {
    fill: 'both',
    composite: 'add',
  });

  jumpAnimation.persist();
}

createArrowScrollersEventListeners();
