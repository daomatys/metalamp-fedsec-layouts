import './entities__expandable.scss';

function defineNeededInnerElements(parent) {
  return {
    expander: parent.querySelector('.js-expander'),
    aim: parent.querySelector('.js-expander__aim'),
    icon: parent.querySelector('.material-icons'),
  };
}

function changeExpanderDisplayState(parent) {
  const parentsMarkedActive = document.querySelectorAll('.js-expander_active')
  const that = defineNeededInnerElements( parent );

  aim.classList.add('js-expander_pending');

  parentsMarkedActive.forEach( item => {
    if (!item.classList.contains('js-expander_pending')) {
      item.classList.remove('js-expander_active');
      item.parentElement.firstChild.removeAttribute('checked');
      item.parentElement.querySelector('.material-icons').classList.toggle('js-icon-rotated');
    }
  });
  if (expander.hasAttribute('checked')) {
    expander.removeAttribute('checked');
  } else {
    expander.setAttribute('checked', '');
  }
  if (that.aim) {
    that.aim.classList.remove('js-expander_pending');
    that.aim.classList.toggle('js-expander_active');
  }
  that.icon.classList.toggle('js-icon-rotated');
}

function initEventListeners() {
  const parents = document.querySelectorAll('.js-expander__parent');
  
  parents.forEach((parent) => {
    const clickEventHandler = () => changeExpanderDisplayState(parent);
    expander.addEventListener('click', clickEventHandler);
  });
}

initEventListeners();
