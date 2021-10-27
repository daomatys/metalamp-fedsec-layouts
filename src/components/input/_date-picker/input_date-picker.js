import AirDatepicker from 'air-datepicker';

const init = function initDatePicker() {
  const datePickerFrames = document.querySelectorAll('.input__frame.adp');

  if ( datePickerFrames ) {
    datePickerFrames.forEach( frame => sortFramesTasks( frame ) );
  }
}

const sortFramesTasks = function sortDatePickerFramesTasksOfInputFrames( frame ) {
  const caseSlaveFrame = frame.classList.contains('slave');
  const frames = defineFrames( frame );

  if ( caseSlaveFrame ) {
    trigger( frames );
  } else {
    render( frames );
    validate( frames );
  }
}

const render = function renderAirDatePicker( frames ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const date = text => new Date( text );

  const element = frames.master.parentNode.querySelector('.date-picker__element');
  const buttons = element.nextElementSibling;

  const currentDate = date('2019-08-08');
  const chosenDates = [ date('2019-08-19'), date('2019-08-23') ];

  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');
  
  const datePicker = new AirDatepicker( element, {
    range: true,
    keyboardNav: false,
    altField: frames.master,
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

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frames.master.click();
}

const trigger = function triggerRelativeElementClick( frames ) {
  const masterAim = frames.master.querySelector('.expander__aim');

  console.log(masterAim)

  frames.slave.onclick = () => masterAim.classList.toggle('expander_active');
}

const validate = function revalidateIncomingValues( frames ) {
  const slave = frames.slave;
  const master = frames.master;
  const initialValue = master.value;
  const dividerIndex = initialValue.indexOf('-')

  console.log(slave)
  
  if ( dividerIndex > -1 && slave ) {
    master.value = initialValue.slice( 0, dividerIndex - 1 );
    slave.value = initialValue.slice( dividerIndex + 2 );
  } else {
    master.value = initialValue;
    slave.value = '';
  }
}

const defineFrames = function( frame ) {
  const holder = frame.closest('.expander__parent').parentNode;
  const masterFrame = holder.firstElementChild.querySelector('.input__frame');
  const slaveFrame = holder.querySelector('slave').querySelector('.input__frame');

  return { master: masterFrame, slave: slaveFrame };
}

init();
