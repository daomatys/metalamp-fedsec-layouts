import AirDatepicker from 'air-datepicker';

const defineContainer = function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll('.date-picker__element');

  if ( datePickerItems ) {
    datePickerItems.forEach( item => render( item ) );
  }
}

const render = function renderDatePicker( item ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const date = text => new Date( text );

  const currentDate = date('2019-08-08');
  const chosenDates = [ date('2019-08-19'), date('2019-08-23') ];

  const frame = item.closest('.input__element').querySelector('.input__frame');
  const buttons = item.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');
  
  const datePicker = new AirDatepicker( item, {
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

  console.log(frame.value)

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frame.click();
}

defineContainer();
