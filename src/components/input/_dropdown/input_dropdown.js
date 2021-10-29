const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const initListeners = function initElementsEventListeners( item ) {
  const counters = item.querySelectorAll('.input__option_counter');
  const buttonGroups = item.querySelectorAll('.input__option_buttons');
  const controllersBar = item.querySelector('.input__state-controllers');

  updateDropdownValue( [...counters][0], counters );

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
  const acceptController = controllers.right;

  defineResetControllerState( counters, controllers );

  resetController.addEventListener('click', () => resetCounters( controllers, counters, buttonGroups ));
  acceptController.addEventListener('click', () => acceptForm( acceptController ));
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

  const update = function( elem, shift ){
    elem.addEventListener('click', () => updateDropdown( optionButtons, optionCounter, shift, controllers, counters ));
  }
  update( optionButtons.left, -1);
  update( optionButtons.right, 1);
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

const updateDropdown = function updateCalcsAndControllersToCurrentState( buttons, counter, addification, controllers, counters ) {
  const newCounterValue = parseInt( counter.textContent ) + addification;

  adjustButtonsState( buttons, newCounterValue, 'button-frozen' );
  counter.textContent = newCounterValue;
  updateDropdownValue( counter, counters );

  if ( controllers ) {
    defineResetControllerState( counters, controllers );
  }
}

const updateDropdownValue = function( anychild, counters ) {
  const frame = anychild.closest('.input__dropdown').parentNode.querySelector('.input__frame');

  const values = [...counters].map( item => Number( item.textContent ) );
  const valuesSum = values.reduce( (prev, curr) => prev + curr );

  const firstText = `${valuesSum} гост${defineEnding( valuesSum, 'ь', 'ей', 'я' )}`;
  const lastText = `, ${values[2]} младен${defineEnding( values[2], 'ец', 'цев', 'ца' )}`;

  const firstTextPart = valuesSum > 0 ? firstText : '' ;
  const lastTextPart = values[2] > 0 ? lastText : '' ;

  frame.value = firstTextPart + lastTextPart;
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

const defineEnding = function defineWordEndingAccordingToNumber( num, unoEnding, deciEnding, onefourEnding ) {
  let result = unoEnding;

  if ( Math.floor(num/10)===1 || num%10<1 || num%10>4 ) {
    result = deciEnding;
  } else {
    if ( num%10>1 ) {
      result = onefourEnding;
    }
  }
  return result;
}

const acceptForm = function acceptFormOnButtonClick( controller ) {
  const frame = controller.closest('.input__element').querySelector('.input__frame');

  frame.dispatchEvent( new Event('click') );
}

find();
