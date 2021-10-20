const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const initListeners = function initElementsEventListeners( item ) {
  const buttonGroups = item.querySelectorAll('.input__option_buttons');
  const controllersBar = item.querySelector('.input__clear-n-submit');

  if ( controllersBar ) {
    const counters = item.querySelectorAll('.input__option_counter');
    initControllers( counters, controllersBar, buttonGroups );
  }

  buttonGroups.forEach( buttons => initButtons( buttons ) );
}

const initControllers = function initControllersEventListeners( counters, controllersBar, buttonGroups ) {
  const controllers = defineButtons( controllersBar );
  const resetController = controllers.left;
  const submitController = controllers.right;

  defineResetControllerState( counters, resetController );

  resetController.addEventListener('click', () => resetCounters( resetController, counters, buttonGroups ));
  submitController.addEventListener('click', () => submitForm( submitController ));
}

const defineResetControllerState = function( counters, controller ) {
  const countersSum = defineCountersSum( counters );

  if ( countersSum === 0 ) {
    changeControllerState( controller );
  }
}

const initButtons = function initOptionButtonsEventListeners( buttons ) {
  const optionButtons = defineButtons( buttons );
  const optionCounter = buttons.querySelector('.input__option_counter');
  const optionCounterValue = optionCounter.textContent;

  adjustButtonsState( optionButtons, optionCounterValue );

  optionButtons.left.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, -1 ));
  optionButtons.right.addEventListener('click', () => counterMathOps( optionButtons, optionCounter, 1 ));
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

const resetCounters = function resetCounterValueOnButtonClick( controller, counters, buttonGroups ) {
  counters.forEach( counter => counter.textContent = 0 );

  buttonGroups.forEach( group => defineButtons( group ).left.classList.add('button-frozen') );

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
