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

  const optionCalcSections = item.querySelectorAll('.input__option_buttons');

  optionCalcSections.forEach( item => {
    const optionButtons = defineButtons( item );
    const optionCounter = item.querySelector('.input__option_counter');

    optionButtons.left.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, -1 ));
    optionButtons.right.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, 1 ));
  })
}

const counterMathOps = function counterIncreaseByAddificationValue( buttons, counter, addification ) {
  const newCounterValue = parseInt( counter.textContent ) + addification;

  checkValue( buttons, newCounterValue );

  counter.textContent = newCounterValue;
}

const checkValue = function checkCounterValueEquivalencyToMinAndMax( buttons, value ) {
  const caseA = value < 1;
  const caseB = value > 9;

  if ( caseA || caseB ) {
    if ( caseA ) {
      buttons.left.classList.add('frozen');
    }
    if ( caseB ) {
      buttons.right.classList.add('frozen');
    }
  } else {
    buttons.left.classList.remove('frozen');
    buttons.right.classList.remove('frozen');
  }
}

const resetCounters = function resetCounterValueOnButtonClick( counters ) {
  counters.forEach( item => item.textContent = 0 );
}

const submitForm = function submitFormOnButtonClick() {
  
}

find();
