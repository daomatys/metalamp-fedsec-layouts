import AirDatepicker from 'air-datepicker';
import customLocale from './_custom-locale/date-picker_custom-locale';

import './date-picker.scss';

import '@components/button/__mean-oval/button__mean-oval';

const SELECTOR__FRAME = 'js-adp-frame';
const SELECTOR__AIM = 'js-expander__aim';
const SELECTOR__PARENT = 'js-expander__parent';
const SELECTOR__ACTIVE = 'js-expander_active';

const init = function initDatePicker() {
  const inputFrames = document.querySelectorAll('.' + SELECTOR__FRAME);

  if ( inputFrames ) {
    inputFrames.forEach( frame => sortTasks( frame ) );
  }
}

const sortTasks = function sortDatePickerElementsTasks( frame ) {
  const elements = defineElements( frame );

  const currentAim = frame.parentNode.querySelector('.' + SELECTOR__AIM);
  const rawDates = currentAim.getAttribute('data-dates');
  const caseSlaveAim = currentAim.classList.contains('js-slave');
  const caseMasterAim = currentAim.classList.contains('js-master');

  if ( caseSlaveAim ) {
    sendDates( rawDates, elements.holder );
    triggerClick( elements.frames.slave, elements.aims.master );
  } else {
    renderDatePicker( elements, rawDates, caseMasterAim );
  }
}

const defineElements = function( frame ) {
  const holder = frame.closest('.' + SELECTOR__PARENT).parentNode;
  
  const caseRelations = holder.querySelector('.js-master');
  const master = caseRelations ? holder.firstElementChild : frame.parentNode ;
  const slave = caseRelations ? holder.lastElementChild : master ;

  return {
    relations: caseRelations ? true : false,
    holder: holder,
    frames: {
      master: master.querySelector('.' + SELECTOR__FRAME),
      slave:  slave.querySelector('.' + SELECTOR__FRAME)
    },
    aims: {
      master: master.querySelector('.' + SELECTOR__AIM),
      slave:  slave.querySelector('.' + SELECTOR__AIM)
    }
  }
}

const sendDates = function sendDatesUsingDispatchCustomEvent( rawDates, holder ) {
  const fixedDatesArray = rawDates ? rawDates.split(', ') : [] ;
  const fixedDates = fixedDatesArray.map( fixedDate => new Date( fixedDate ) );

  holder.dispatchEvent( new CustomEvent('incoming-dates', { detail: fixedDates }) );
}

const triggerClick = function triggerClickRelativeElementClick( slaveFrame, masterAim ) {
  slaveFrame.onclick = () => masterAim.classList.toggle(SELECTOR__ACTIVE);
}

const renderDatePicker = function renderDatePickerUnderTheMasterFrame( elements, rawDates, caseMasterAim ) {
  const icon = name => '<span class="material-icons">' + name + '</span>';
  const currentDate = new Date('2019-08-08');
  const dateFormat = elements.relations ? 'dd.MM.yyyy' : 'd MMM' ;

  const container = elements.aims.master.querySelector('.date-picker__container');

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

  defineClearButtonState( masterFrame, clearButton );

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
  defineClearButtonState( masterFrame, clearButton );
}

const defineClearButtonState = function defineClearButtonState( masterFrame, clearButton ) { 
  const caseValuesExists = masterFrame.value;

  if ( caseValuesExists ) {
    clearButton.classList.remove('js-mean-oval-button_hidden');
  } else {
    clearButton.classList.add('js-mean-oval-button_hidden');
  }
}

init();
