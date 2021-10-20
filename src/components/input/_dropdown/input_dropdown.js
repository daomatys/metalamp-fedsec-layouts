const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const initListeners = function initDropdownElementsEventListeners( item ) {
  const optionCalcSections = item.querySelectorAll('.input__option_buttons');
  const controllersBar = item.querySelector('.input__clear-n-submit');

  if ( controllersBar ) {
    const optionCounters = item.querySelectorAll('.input__option_counter');

    const countersSum = defineCountersSum( optionCounters );
    const controllers = defineButtons( controllersBar );
    const resetController = controllers.left;
    const submitController = controllers.right;

    if ( countersSum === 0 ) {
      changeControllerState( resetController );
    }
  
    resetController.addEventListener('click', () => resetCounters( resetController, optionCalcSections ));
    submitController.addEventListener('click', () => submitForm( submitController ));
  }

  optionCalcSections.forEach( section => {
    const optionButtons = defineButtons( section );
    const optionCounter = section.querySelector('.input__option_counter');
    const optionCounterValue = optionCounter.textContent;

    adjustButtonsState( optionButtons, optionCounterValue );

    optionButtons.left.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, -1 ));
    optionButtons.right.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, 1 ));
  });
}

const defineButtons = function defineFirstAndLastChildByItsParent( parent ) {
  const firstElement = parent.firstElementChild;
  const lastElement = parent.lastElementChild;

  const result = {
    left: firstElement,
    right: lastElement
  };

  return result;
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
      buttons.left.classList.add('button-frozen');
    }
    if ( caseB ) {
      buttons.right.classList.add('button-frozen');
    }
  }
  if ( !(caseA || caseB) ) {
    buttons.left.classList.remove('button-frozen');
    buttons.right.classList.remove('button-frozen');
  }
}

const resetCounters = function resetCounterValueOnButtonClick( controller, sections ) {
  sections.forEach( item => {
    const optionButtons = defineButtons( item );
    const optionCounter = item.querySelector('.input__option_counter');

    optionCounter.textContent = 0;

    adjustButtonsState( optionButtons, 0 );
  });

  changeControllerState( controller );
}

const defineCountersSum = function( counters ) {
  const result = Array
    .from( counters )
    .map( counter => Number( counter.textContent ) )
    .reduce( (prev, curr) => prev + curr );

  return result;
}

const changeControllerState = function toggleControllerHiddenClass( controller ) {
  controller.classList.toggle('hidden-controller');
}

const submitForm = function submitFormOnButtonClick() {
  
}

find();
