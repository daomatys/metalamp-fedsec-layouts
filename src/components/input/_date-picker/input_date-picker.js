import AirDatepicker from 'air-datepicker';

const init = function initDatePicker() {
  const datePickerFrames = document.querySelectorAll('.input__frame.adp');

  if ( datePickerFrames ) {
    datePickerFrames.forEach( frame => sortElementsTasks( frame ) );
  }
}

const defineElements = function( frame ) {
  const holder = frame.closest('.expander__parent').parentNode;

  const master = holder.firstElementChild;
  const slave = holder.lastElementChild.isEqualNode( master ) ? master : holder.lastElementChild ;

  return {
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
  const caseSlaveAim = frame.parentNode.querySelector('.expander__aim').classList.contains('slave');
  const rawDates = frame.getAttribure('data-dates');
  const elements = defineElements( frame );

  if ( caseSlaveAim ) {
    trigger( elements );
    sendDates( rawDates );
  } else {
    render( elements );
  }
}

const render = function renderAirDatePicker( elements ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const date = text => new Date( text );

  const element = elements.frames.master.parentNode.querySelector('.date-picker__element');
  const buttons = element.nextElementSibling;

  const currentDate = date('2019-08-08');

  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');
  
  const datePicker = new AirDatepicker( element, {
    range: true,
    keyboardNav: false,
    altField: elements.frames.master,
    altFieldDateFormat: 'dd.MM.yyyy',
    multipleDatesSeparator: ' - ',
    navTitles: {
      days: 'MMMM yyyy',
    },
    prevHtml: icon('arrow_back'),
    nextHtml: icon('arrow_forward'),
    minDate:   currentDate,
    startDate: currentDate,
    onSelect: () => route( elements.frames )
  });

  datePicker.selectDate( chosenDates );

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => elements.frames.master.click();
}

const trigger = function triggerRelativeElementClick( elements ) {
  const slaveFrame = elements.frames.slave;
  const masterAim = elements.aims.master;

  slaveFrame.onclick = () => masterAim.classList.toggle('expander_active');
}

const sendDates = function sendDatesUsingDispatchCustomEvent( rawDates ) {
  const chosenDates = [ date('2019-08-19'), date('2019-08-23') ];
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
