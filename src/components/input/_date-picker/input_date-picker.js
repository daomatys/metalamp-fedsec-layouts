import 'jquery-ui/ui/widgets/datepicker';

const DATENAMES = {
  months: {
    full:  ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    short: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
  },
  days: {
    full:  ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    short: ['вс','пн','вт','ср','чт','пт','сб'],
    min:   ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
  }
}

const defineDefaults = function defineDatePickerDefaultProperties () {
  $.datepicker.regional['ru'] = {
    closeText:   'Закрыть',
    prevText:    'Предыдущий месяц',
    nextText:    'Следующий месяц',
    currentText: 'Сегодня',
    monthNames:      DATENAMES.months.full,
    monthNamesShort: DATENAMES.months.short,
    dayNames:        DATENAMES.days.full,
    dayNamesShort:   DATENAMES.days.short,
    dayNamesMin:     DATENAMES.days.min,
    weekHeader:  'Не',
    dateFormat:  'dd.mm.yyyy',
    yearSuffix:  '',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false
  };

  $.datepicker.setDefaults($.datepicker.regional['ru']);
}

const defineContainer = function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll('.date-picker');

  if ( datePickerItems ) {
    datePickerItems.forEach( item => render( item ) );
  }
}

const render = function renderDatePicker( item ) {
  const itemId = '#' + item.id;
  const currentDate = new Date('2019-08-08')
  
  $( itemId ).datepicker({
    showOtherMonths: true,
    minDate: currentDate,
    maxDate: '+6m',
    defaultDate: currentDate,
    //onSelect: onSelect(),
  });
}

const onSelect = function defineRangePickerPossibility() {
  const date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $('#input1').val());
  const date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $('#input2').val());
  const selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

  if ( !date1 || date2 ) {
    $('#input1').val( dateText );
    $('#input2').val('');
    $(this).datepicker();
  } else {
    if( selectedDate < date1 ) {
      $('#input2').val( $('#input1').val() );
      $('#input1').val( dateText );
      $(this).datepicker();
    } else {
      $('#input2').val( dateText );
      $(this).datepicker();
    }
  }
}

defineContainer();
defineDefaults();
