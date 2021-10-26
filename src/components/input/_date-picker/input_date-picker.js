import AirDatepicker from 'air-datepicker';

const defineContainer = function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll('.date-picker');

  if ( datePickerItems ) {
    datePickerItems.forEach( item => render( item ) );
  }
}

const render = function renderDatePicker( item ) {
  const currentDate = new Date('2019-08-08')
  
  .datepicker({
    showOtherMonths: true,
    minDate: currentDate,
    maxDate: '+6m',
    defaultDate: currentDate,
  });
}

const onSelect = function defineRangePickerPossibility() {

}

defineDefaults();
defineContainer();

