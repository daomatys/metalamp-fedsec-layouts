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
  dateFormat:  'dd.mm.yy',
  yearSuffix:  '',
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false
};

$.datepicker.setDefaults($.datepicker.regional['ru']);

function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll(".date-picker");

  if ( datePickerItems ) {
    datePickerItems.forEach( item => initDatePicker( item ) );
  }
}

function initDatePicker( item ) {
  const itemId = '#' + item.id;

  const dateToday = new Date('2019-08-08');

  //const today = new Date();
  //const dateToday =`${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`;

  const something = id => $.datepicker.parseDate( $.datepicker._defaults.dateFormat, $( id ).val() );

  $( itemId ).datepicker({
    showOtherMonths: true,
    minDate: dateToday,
    currentDate: dateToday,
  })
}

findDatePickerContainer();
