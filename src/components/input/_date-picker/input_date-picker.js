import AirDatepicker from 'air-datepicker';

const init = function initDatePicker() {
  const datePickerFrames = document.querySelectorAll('.input__frame.adp');

  if ( datePickerFrames ) {
    datePickerFrames.forEach( frame => sortFramesTasks( frame ) );
  }
}

const sortFramesTasks = function sortDatePickerFramesTasksOfInputFrames( frame ) {
  const element = frame.parentNode.querySelector('.date-picker__element');

  if ( frame.classList.contains('master') ) {
    render( frame, element );
  }
  if ( frame.classList.contains('slave') ) {
    trigger( frame );
  }
}

const render = function renderAirDatePicker( masterFrame, element ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const date = text => new Date( text );

  const currentDate = date('2019-08-08');
  const chosenDates = [ date('2019-08-19'), date('2019-08-23') ];

  const frames = defineFrames( masterFrame );
  const buttons = element.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');
  
  const datePicker = new AirDatepicker( element, {
    range: true,
    keyboardNav: false,
    altField: masterFrame,
    altFieldDateFormat: 'dd.MM.yyyy',
    multipleDatesSeparator: ' - ',
    navTitles: {
      days: 'MMMM yyyy',
    },
    prevHtml: icon('arrow_back'),
    nextHtml: icon('arrow_forward'),
    selectedDates: chosenDates,
    minDate:   currentDate,
    startDate: currentDate,
    onSelect: () => validate( frames ),
  });

  validate( frames );

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frame.click();
}

const trigger = function triggerRelativeElementClick( slaveFrame ) {
  
  slaveFrame.onclick = () => masterAim.classList.toggle('expander_active');
}

const validate = function revalidateIncomingValues( masterFrame ) {

}

const defineFrames = function( masterFrame ) {
  const holder = masterFrame.closest('.expander__parent').parentNode;
  const slaveFrame = holder.lastElementChild.querySelector('input__frame');

  return {
    master: masterFrame,
    slave: slaveFrame
  };
}

init();
