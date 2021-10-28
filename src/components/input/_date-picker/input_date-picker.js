import AirDatepicker from 'air-datepicker';

const init = function initDatePicker() {
  const inputFrames = document.querySelectorAll('.input__frame.adp');

  if ( inputFrames ) {
    inputFrames.forEach( frame => sortElementsTasks( frame ) );
  }
}

const defineElements = function( frame ) {
  const holder = frame.closest('.expander__parent').parentNode;

  const master = holder.firstElementChild;
  const slave = holder.lastElementChild.isEqualNode( master ) ? master : holder.lastElementChild ;

  return {
    holder: holder,
    frames: {
      master: master.querySelector('.input__frame'),
      slave:  slave.querySelector('.input__frame')
    },
    aims: {
      master: master.querySelector('.input__date-picker'),
      slave:  slave.querySelector('.input__date-picker')
    }
  }
}

const sortElementsTasks = function sortDatePickerElementsTasks( frame ) {
  const currentAim = frame.parentNode.querySelector('.expander__aim')
  const elements = defineElements( frame );

  const rawDates = currentAim.getAttribute('data-dates');
  const caseSlaveAim = currentAim.classList.contains('slave');
  const caseMasterAim = currentAim.classList.contains('master');

  console.log(rawDates)

  if ( caseSlaveAim ) {
    sendDates( rawDates, elements.holder );
    triggerClick( elements.frames.slave, elements.aims.master );
  } else {
    renderDatePicker( elements.frames, elements.holder, rawDates, caseMasterAim );
  }
}

const renderDatePicker = function renderDatePickerUnderTheMasterFrame( frames, holder, rawDates, caseMasterAim ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';

  const element = frames.master.parentNode.querySelector('.date-picker__element');
  const buttons = element.nextElementSibling;

  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');

  const currentDate = new Date('2019-08-08');
  
  const datePicker = new AirDatepicker( element, {
    navTitles: {
      days: 'MMMM yyyy',
    },
    range: true,
    keyboardNav: false,
    altField: frames.master,
    altFieldDateFormat: 'dd.MM.yyyy',
    multipleDatesSeparator: ' - ',
    prevHtml: icon('arrow_back'),
    nextHtml: icon('arrow_forward'),
    minDate:   currentDate,
    startDate: currentDate,
    onSelect: () => route( frames )
  });

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frames.master.click();

  renderDateValues( datePicker, holder, rawDates, caseMasterAim );
}

const renderDateValues = function Dates( datePicker, holder, rawDates, caseMasterAim ) {
  holder.addEventListener('incoming-dates', ({detail}) => datePicker.selectDate( detail ), { once: true });

  if ( !caseMasterAim ) {
    sendDates( rawDates, holder );
  }
}

const triggerClick = function triggerClickRelativeElementClick( slaveFrame, masterAim ) {
  slaveFrame.onclick = () => masterAim.classList.toggle('expander_active');
}

const sendDates = function sendDatesUsingDispatchCustomEvent( rawDates, holder ) {
  const fixedDatesArray = rawDates.split(', ');
  const fixedDates = fixedDatesArray.map( fixedDate => new Date( fixedDate ) );

  holder.dispatchEvent( new CustomEvent('incoming-dates', { detail: fixedDates }) );
}

const route = function routeIncomingDateValues( frames ) {
  const slaveFrame = frames.slave;
  const masterFrame = frames.master;
  const caseEquivalence = slaveFrame.isEqualNode( masterFrame );

  if ( !caseEquivalence ) {
    const initialValue = masterFrame.value;
    const dividerIndex = initialValue.indexOf('-');

    if ( dividerIndex > -1 ) {
      masterFrame.value = initialValue.slice( 0, dividerIndex - 1 );
      slaveFrame.value = initialValue.slice( dividerIndex + 2 );
    } else {
      slaveFrame.value = '';
      masterFrame.value = initialValue;
    }
  }
}

init();
