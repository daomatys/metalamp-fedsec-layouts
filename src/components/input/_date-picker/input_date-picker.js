import 'jquery-ui/ui/widgets/datepicker';

$.datepicker.regional['ru'] = {
	closeText: 'Закрыть',
	prevText: 'Предыдущий',
	nextText: 'Следующий',
	currentText: 'Сегодня',
	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
	dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
	dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
	weekHeader: 'Не',
	dateFormat: 'dd.mm.yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['ru']);

function findDatePickerContainer() {
  const datePickerItems = document.querySelectorAll(".date-picker");

  console.log(datePickerItems)

  if ( datePickerItems ) {
    for ( let item of datePickerItems ) {
      initDatePicker( item );
    }
  }
}

function initDatePicker( item ) {
  const itemId = '#' + item.id;

  $( itemId ).datepicker({
    showOtherMonths: true,
		buttonText: "Выбрать дату"
  });
}

findDatePickerContainer();
