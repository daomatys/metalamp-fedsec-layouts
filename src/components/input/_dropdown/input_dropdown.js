const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const defineButtons = function defineFirstAndLastChildByItsParent( parent ) {
  const firstElement = parent.firstElementChild;
  const lastElement = parent.lastElementChild;

  return { left: firstElement, right: lastElement };
}

const initListeners = function initDropdownElementsEventListeners( item ) {
  const controllersBar = item.querySelector('.input__clear-n-submit');

  if ( controllersBar ) {
    const controllerButtons = defineButtons( controllersBar );
    const counters = item.querySelectorAll('.input__option_counter');
  
    controllerButtons.left.addEventListener('click', () => resetCounters( counters ));
    controllerButtons.right.addEventListener('click', submitForm);
  }

  const optionCalcSections = item.querySelectorAll('input__option_buttons');

  optionCalcSections.forEach( item => {
    const optionButtons = defineButtons( item );
    const optionCounter = item.querySelector('.input__option_counter');

    optionButtons.left.addEventListener('click', () => counterDec( optionCounter ));
    optionButtons.right.addEventListener('click', () => counterInc( optionCounter ));
  })
}

const counterDec = function( counter ) {
  counter.textContent -= 1;
}

const counterInc = function( counter ) {
  counter.textContent += 1;
}

const resetCounters = function resetCounterValueOnButtonClick() {
  
}

const submitForm = function submitFormOnButtonClick() {
  
}

find();
