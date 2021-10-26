import AirDatepicker from 'air-datepicker';

const defineFrames = function findDatePickerFrames() {
  const datePickerFrames = document.querySelectorAll('.adp');

  if ( datePickerFrames ) {
    datePickerFrames.forEach( frame => init( frame ) );
  }
}

const init = function initDatePicker( frame ) {
  const element = frame.querySelector('.date-picker__element');

  if ( element ) {
    render( frame, element );
  }
  if ( !element ) {
    const master = frame.parentNode.querySelector('master');
    frame.onclick = () => master.click();
  }
}

const render = function renderAirDatePicker( frame, element ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const date = text => new Date( text );

  const currentDate = date('2019-08-08');
  const chosenDates = [ date('2019-08-19'), date('2019-08-23') ];

  const buttons = element.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');
  
  const datePicker = new AirDatepicker( element, {
    range: true,
    keyboardNav: false,
    altField: frame,
    altFieldDateFormat: 'dd.MM.yyyy',
    multipleDatesSeparator: ' - ',
    navTitles: {
      days: 'MMMM yyyy',
    },
    prevHtml: icon('arrow_back'),
    nextHtml: icon('arrow_forward'),
    minDate: currentDate,
    startDate: currentDate,
    selectedDates: chosenDates,
  });

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frame.click();
}

defineFrames();
