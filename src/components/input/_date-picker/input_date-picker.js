import AirDatepicker from 'air-datepicker';

const defineContainers = function findDatePickerContainers() {
  const datePickerContainers = document.querySelectorAll('.adp');

  if ( datePickerContainers ) {
    datePickerContainers.forEach( container => init( container ) );
  }
}

const init = function initDatePicker( container ) {
  const frame = container.querySelector('.input__frame');
  const element = container.querySelector('.date-picker__element');

  if ( element ) {
    render( frame, element );
  }


  const frameHierarchicalState = frame.classList;

  if ( frameHierarchicalState === 'slave' ) {

  }

  console.log(frameHierarchicalState)
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

defineContainers();
