import AirDatepicker from 'air-datepicker';

const defineContainer = function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll('.date-picker');

  if ( datePickerItems ) {
    datePickerItems.forEach( item => render( item ) );
  }
}

const render = function renderDatePicker( item ) {
  const date = text => new Date( text );

  const currentDate = date('2019-08-08')
  const chosenDates = [ date('2019-08-19'), date('2019-08-23') ]

  const acceptButton = {
    content: 'Select 2021-07-26',
    className: 'custom-button-classname',
    onClick: item.click(),
  }
  
  const datePicker = new AirDatepicker( item, {
    range: true,
    minDate: currentDate,
    startDate: currentDate,
    selectedDates: chosenDates,
    buttons: [acceptButton, 'clear']
  });
}

defineContainer();
