const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const initListeners = function initElementsEventListeners( item ) {
  const counters = item.querySelectorAll('.input__option_counter');
  const buttonGroups = item.querySelectorAll('.input__option_buttons');
  const controllersBar = item.querySelector('.input__clear-n-submit');

  if ( controllersBar ) {
    const controllers = defineButtons( controllersBar );
    initControllers( counters, controllers, buttonGroups );
    buttonGroups.forEach( buttons => initButtons( buttons, counters, controllers ) );
  }
  if ( !controllersBar ) {
    buttonGroups.forEach( buttons => initButtons( buttons, counters, undefined ) );
  }
}

const initControllers = function initControllersEventListeners( counters, controllers, buttonGroups ) {
  const resetController = controllers.left;
  const submitController = controllers.right;

  defineResetControllerState( counters, controllers );

  resetController.addEventListener('click', () => resetCounters( controllers, counters, buttonGroups ));
  submitController.addEventListener('click', () => submitForm( submitController ));
}

const defineResetControllerState = function( counters, controllers ) {
  const countersSum = defineCountersSum( counters );

  adjustButtonsState( controllers, countersSum, 'hidden-controller', true )
}

const initButtons = function initOptionButtonsEventListeners( buttons, counters, controllers ) {
  const optionButtons = defineButtons( buttons );
  const optionCounter = buttons.querySelector('.input__option_counter');
  const optionCounterValue = optionCounter.textContent;

  adjustButtonsState( optionButtons, optionCounterValue, 'button-frozen' );

  optionButtons.left.addEventListener('click', () => updateDropdown( optionButtons, optionCounter, -1, controllers, counters ));
  optionButtons.right.addEventListener('click', () => updateDropdown( optionButtons, optionCounter, 1, controllers, counters ));
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

const updateDropdown = function counterIncreaseByAddificationValue( buttons, counter, addification, controllers, counters ) {
  const newCounterValue = parseInt( counter.textContent ) + addification;

  adjustButtonsState( buttons, newCounterValue, 'button-frozen' );

  counter.textContent = newCounterValue;

  if ( controllers ) {
    defineResetControllerState( counters, controllers );
  }
}

const adjustButtonsState = function optionsButtonsStateAccordingToMinAndMaxRanges( buttons, value, selector, leftOnly ) {
  const caseA = value < 1;
  const caseB = value > 9;

  if ( caseA || caseB ) {
    if ( caseA ) {
      buttons.left.classList.add( selector );
    }
    if ( caseB && !leftOnly) {
      buttons.right.classList.add( selector );
    }
  }
  if ( !(caseA || caseB) ) {
    buttons.left.classList.remove( selector );
    buttons.right.classList.remove( selector );
  }
}

const resetCounters = function resetCounterValueOnButtonClick( controllers, counters, buttonGroups ) {
  counters.forEach( counter => counter.textContent = 0 );

  buttonGroups.forEach( group => {
    const buttons = defineButtons( group )
    
    buttons.left.classList.add('button-frozen');
    buttons.right.classList.remove('button-frozen');
  });

  defineResetControllerState( counters, controllers );
}

const defineCountersSum = function( counters ) {
  const result = Array
    .from( counters )
    .map( counter => Number( counter.textContent ) )
    .reduce( (prev, curr) => prev + curr );

  return result;
}

const submitForm = function submitFormOnButtonClick() {
  
}

find();
