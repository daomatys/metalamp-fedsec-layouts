const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const initListeners = function initDropdownElementsEventListeners( item ) {
  const controllersBar = item.querySelector('.input__clear-n-submit');
  const optionCalcSections = item.querySelectorAll('.input__option_buttons');

  if ( controllersBar ) {
    const controllers = defineButtons( controllersBar );
    const resetController = controllers.left;
    const submitController = controllers.right;
  
    resetController.addEventListener('click', () => resetCounters( resetController, optionCalcSections ));
    submitController.addEventListener('click', () => submitForm( submitController ));
  }

  optionCalcSections.forEach( item => {
    const optionButtons = defineButtons( item );
    const optionCounter = item.querySelector('.input__option_counter');
    const optionCounterValue = optionCounter.textContent;

    adjustButtonsState( optionButtons, optionCounterValue );

    optionButtons.left.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, -1 ));
    optionButtons.right.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, 1 ));
  });
}

const defineButtons = function defineFirstAndLastChildByItsParent( parent ) {
  const firstElement = parent.firstElementChild;
  const lastElement = parent.lastElementChild;

  return { left: firstElement, right: lastElement };
}

const counterMathOps = function counterIncreaseByAddificationValue( buttons, counter, addification ) {
  const newCounterValue = parseInt( counter.textContent ) + addification;

  adjustButtonsState( buttons, newCounterValue );

  counter.textContent = newCounterValue;
}

const adjustButtonsState = function optionsButtonsStateAccordingToMinAndMaxRanges( buttons, value ) {
  const caseA = value < 1;
  const caseB = value > 9;

  if ( caseA || caseB ) {
    if ( caseA ) {
      buttons.left.classList.add('frozen');
    }
    if ( caseB ) {
      buttons.right.classList.add('frozen');
    }
  } 
  if ( !(caseA || caseB) ) {
    buttons.left.classList.remove('frozen');
    buttons.right.classList.remove('frozen');
  }
}

const resetCounters = function resetCounterValueOnButtonClick( buttons, counters ) {
  counters.forEach( item => item.textContent = 0 );
}

const submitForm = function submitFormOnButtonClick() {
  
}

find();
