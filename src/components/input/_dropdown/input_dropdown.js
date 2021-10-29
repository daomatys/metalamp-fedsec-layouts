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

//init controllers section

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

//init buttons section

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

// general input_dropdown state section

const updateDropdown = function updateCalcsAndControllersToCurrentState( buttons, counter, addification, controllers, counters ) {
  const newCounterValue = parseInt( counter.textContent ) + addification;

  adjustButtonsState( buttons, newCounterValue, 'button-frozen' );
  counter.textContent = newCounterValue;
  updateDropdownValue( counter, counters );

  if ( controllers ) {
    defineResetControllerState( counters, controllers );
  }
}

const updateDropdownValue = function updateDropdownValue( anychild, counters ) {
  const dropdown = anychild.closest('.input__dropdown');
  const frame = dropdown.parentNode.querySelector('.input__frame');
  const values = [...counters].map( item => Number( item.textContent ) );
  const dropdownType = dropdown.getAttribute('data-options-type');

  let dropdownValue = '';

  switch ( dropdownType ) {
    case 'guests': {
      dropdownValue = defineGuestInputValue( values );
      break;
    }
    case 'facilities': {
      dropdownValue = defineFacilitiesInputValue( values );
      break;
    }
  }
  frame.value = dropdownValue;
}

const defineGuestInputValue = function defineGuestInputValue( values ) {
  const valuesSum = values.reduce( (prev, curr) => prev + curr );

  const firstText = defineWord( valuesSum, 0,         'гост',   [ 'ь', 'ей', 'я' ]    );
  const lastText =  defineWord( values[2], valuesSum, 'младен', [ 'ец', 'цев', 'ца' ] );

  return firstText + lastText;
}

const defineFacilitiesInputValue = function defineFacilitiesInputValue( values ) {
  const firstText =  defineWord( values[0], 0,         'cпал',   [ 'ьня', 'ен', 'ьни' ] );
  const secondText = defineWord( values[1], values[0], 'кроват', [ 'ь', 'ей', 'и' ]     );
  const thirdText =  defineWord( values[2], values[1], 'ванн',   [ 'а', 'ых', 'ых' ]    );

  return firstText + secondText + thirdText;;
}

const defineWord = function defineWordEndingAccordingToNumber( currentValue, lastValue, word, endings=[] ) {
  let result = '';
  let ending = endings[0];

  if ( currentValue > 0 ) {
    if ( Math.floor(currentValue/10)===1 || currentValue%10<1 || currentValue%10>4 ) {
      ending = endings[1];
    } else {
      if ( currentValue%10>1 ) {
        ending = endings[2];
      }
    }

    const textParts = [
      lastValue > 0 ? ', ' : '' ,
      currentValue + ' ',
      word,
      ending,
    ];

    result = textParts.reduce( (prev, curr) => prev + curr );
  }

  return result;
}

//controllers state section

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

const acceptForm = function acceptFormOnButtonClick( controller ) {
  const frame = controller.closest('.input__element').querySelector('.input__frame');

  frame.dispatchEvent( new Event('click') );
}

find();
