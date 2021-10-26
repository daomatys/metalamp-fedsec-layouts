import AirDatepicker from 'air-datepicker';

const defineContainer = function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll('.date-picker');

  if ( datePickerItems ) {
    datePickerItems.forEach( item => render( item ) );
  }
}

const render = function renderDatePicker( item ) {
  const currentDate = new Date('2019-08-08')
  const chosenDates = [ new Date('2019-08-19'), new Date('2019-08-23') ]
  
  const datePicker = new AirDatepicker( item, {
    range: true,
    minDate: currentDate,
    //maxDate: '+6m',
    startDate: currentDate,
    selectedDates: chosenDates,
  });
}

defineContainer();
