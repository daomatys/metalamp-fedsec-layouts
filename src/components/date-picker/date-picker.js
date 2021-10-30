import AirDatepicker from 'air-datepicker';
import customLocale from './_custom-locale/date-picker_custom-locale';

const init = function initDatePicker() {
  const inputFrames = document.querySelectorAll('.expander.adp-frame');

  if ( inputFrames ) {
    inputFrames.forEach( frame => sortTasks( frame ) );
  }
}

const sortTasks = function sortDatePickerElementsTasks( frame ) {
  const elements = defineElements( frame );

  const currentAim = frame.parentNode.querySelector('.expander__aim');
  const rawDates = currentAim.getAttribute('data-dates');
  const caseSlaveAim = currentAim.classList.contains('slave');
  const caseMasterAim = currentAim.classList.contains('master');

  if ( caseSlaveAim ) {
    sendDates( rawDates, elements.holder );
    triggerClick( elements.frames.slave, elements.aims.master );
  } else {
    renderDatePicker( elements, rawDates, caseMasterAim );
  }
}

const defineElements = function( frame ) {
  const holder = frame.closest('.expander__parent').parentNode;
  
  const caseRelations = holder.querySelector('.master');
  const master = caseRelations ? holder.firstElementChild : frame.parentNode ;
  const slave = caseRelations ? holder.lastElementChild : master ;

  return {
    relations: caseRelations ? true : false,
    holder: holder,
    frames: {
      master: master.querySelector('.adp-frame'),
      slave:  slave.querySelector('.adp-frame')
    },
    aims: {
      master: master.querySelector('.expander__aim'),
      slave:  slave.querySelector('.expander__aim')
    }
  }
}

const sendDates = function sendDatesUsingDispatchCustomEvent( rawDates, holder ) {
  const fixedDatesArray = rawDates ? rawDates.split(', ') : [] ;
  const fixedDates = fixedDatesArray.map( fixedDate => new Date( fixedDate ) );

  holder.dispatchEvent( new CustomEvent('incoming-dates', { detail: fixedDates }) );
}

const triggerClick = function triggerClickRelativeElementClick( slaveFrame, masterAim ) {
  slaveFrame.onclick = () => masterAim.classList.toggle('expander_active');
}

const renderDatePicker = function renderDatePickerUnderTheMasterFrame( elements, rawDates, caseMasterAim ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const currentDate = new Date('2019-08-08');
  const dateFormat = elements.relations ? 'dd.MM.yyyy' : 'd MMM' ;

  const container = elements.aims.master.firstElementChild;

  const frames = elements.frames;
  const slaveFrame = frames.slave;
  const masterFrame = frames.master;

  const buttons = container.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');

  const datePicker = new AirDatepicker( container, {
    navTitles: {
      days: 'MMMM yyyy',
    },
    locale: customLocale,
    range: true,
    keyboardNav: false,
    altField: frames.master,
    altFieldDateFormat: dateFormat,
    multipleDatesSeparator: ' - ',
    prevHtml: icon('arrow_back'),
    nextHtml: icon('arrow_forward'),
    minDate:   currentDate,
    startDate: currentDate,
    onSelect: () => routeValues( slaveFrame, masterFrame, clearButton )
  });

  defineClearButtonState( slaveFrame, masterFrame, clearButton );

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frames.master.click();

  renderDateValues( datePicker, elements.holder, rawDates, caseMasterAim );
}

const renderDateValues = function Dates( datePicker, holder, rawDates, caseMasterAim ) {
  holder.addEventListener('incoming-dates', ({detail}) => datePicker.selectDate( detail ), { once: true });

  if ( !caseMasterAim ) {
    sendDates( rawDates, holder );
  }
}

const routeValues = function routeIncomingDateValues( slaveFrame, masterFrame, clearButton ) {
  const caseEquivalence = slaveFrame.isEqualNode( masterFrame );

  if ( !caseEquivalence ) {
    const initialValue = masterFrame.value.split(' - ');

    if ( initialValue.length > 1 ) {
      masterFrame.value = initialValue[0];
      slaveFrame.value = initialValue[1];
    } else {
      slaveFrame.value = '';
      masterFrame.value = initialValue[0];
    }
  }
  defineClearButtonState( slaveFrame, masterFrame, clearButton );
}

const defineClearButtonState = function defineClearButtonState( slaveFrame, masterFrame, clearButton ) { 
  const caseValuesExists = masterFrame.value && slaveFrame.value;

  if ( caseValuesExists ) {
    clearButton.classList.remove('mob_hidden');
  } else {
    clearButton.classList.add('mob_hidden');
  }
}

init();
