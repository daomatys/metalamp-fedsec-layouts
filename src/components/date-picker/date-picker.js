import AirDatepicker from 'air-datepicker';
import customLocale from './_custom-locale/date-picker_custom-locale';

import './date-picker.scss';
import '@components/button/__mean-oval/button__mean-oval';

const SELECTOR__FRAME = 'js-adp-frame';
const SELECTOR__AIM = 'js-expander__aim';
const SELECTOR__CONTAINER = 'js-expander__container';
const SELECTOR__ACTIVE = 'js-expander_active';

const sendDates = function sendDates(rawDates, twinwrap) {
  const fixedDatesArray = rawDates ? rawDates.split(', ') : [];
  const fixedDates = fixedDatesArray.map((fixedDate) => new Date(fixedDate));

  twinwrap.dispatchEvent(new CustomEvent('incoming-dates', { detail: fixedDates }));
};

const triggerClick = function triggerClick(slaveFrame, masterContainer) {
  const clickEventHandler = () => masterContainer.classList.toggle(SELECTOR__ACTIVE);
  slaveFrame.addEventListener('click', clickEventHandler);
};

const renderDateValues = function renderDates(datePicker, twinwrap, rawDates, caseMasterAim) {
  const incomingDatesEventHandler = ({ detail }) => datePicker.selectDate(detail);

  twinwrap.addEventListener('incoming-dates', incomingDatesEventHandler, { once: true });

  if (!caseMasterAim) {
    sendDates(rawDates, twinwrap);
  }
};

const defineClearButtonState = function defineClearButtonState(masterFrame, clearButton) {
  const caseValuesExists = masterFrame.value;

  if (caseValuesExists) {
    clearButton.classList.remove('js-mean-oval-button_hidden');
  } else {
    clearButton.classList.add('js-mean-oval-button_hidden');
  }
};

const routeValues = function routeValues(frames, clearButton) {
  const slaveFrame = frames.slave;
  const masterFrame = frames.master;
  const caseEquivalence = slaveFrame.isEqualNode(masterFrame);

  if (!caseEquivalence) {
    const initialValue = masterFrame.value.split(' - ');
    const caseBothValuesExists = initialValue.length > 1;
    const startIndex = 0;
    const endIndex = 1;

    if (caseBothValuesExists) {
      masterFrame.value = initialValue[startIndex];
      slaveFrame.value = initialValue[endIndex];
    } else {
      slaveFrame.value = '';
      masterFrame.value = initialValue[startIndex];
    }
  }
  defineClearButtonState(masterFrame, clearButton);
};

const renderDatePicker = function renderDatePicker(elements, rawDates, caseMasterAim) {
  const icon = (name) => `<span class="material-icons">${name}</span>`;
  const currentDate = new Date('2019-08-08');
  const dateFormat = elements.relations ? 'dd.MM.yyyy' : 'd MMM';

  const container = elements.containers.master.querySelector('.date-picker__container');

  const { frames } = elements;
  const masterFrame = frames.master;

  const buttons = container.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');

  const datePicker = new AirDatepicker(container, {
    navTitles: {
      days: 'MMMM yyyy',
    },
    locale: customLocale,
    range: true,
    keyboardNav: false,
    altField: masterFrame,
    altFieldDateFormat: dateFormat,
    multipleDatesSeparator: ' - ',
    prevHtml: icon('arrow_back'),
    nextHtml: icon('arrow_forward'),
    minDate: currentDate,
    startDate: currentDate,
    onSelect: () => routeValues(frames, clearButton),
  });
  defineClearButtonState(masterFrame, clearButton);

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frames.master.click();

  renderDateValues(datePicker, elements.twinwrap, rawDates, caseMasterAim);
};

const defineElements = function defineElements(frame) {
  const twinwrap = frame.closest(`.${SELECTOR__CONTAINER}`).parentNode.parentNode;

  console.log(twinwrap)

  const caseRelations = !!twinwrap.querySelector('.js-master');
  const master = caseRelations ? twinwrap.firstElementChild : frame.parentNode;
  const slave = caseRelations ? twinwrap.lastElementChild : master;

  return {
    relations: caseRelations,
    twinwrap,
    frames: {
      master: master.querySelector(`.${SELECTOR__FRAME}`),
      slave: slave.querySelector(`.${SELECTOR__FRAME}`),
    },
    containers: {
      master: master.closest(`.${SELECTOR__CONTAINER}`),
      slave: slave.closest(`.${SELECTOR__CONTAINER}`),
    }
  };
};

const sortTasks = function sortDatePickerElementsTasks(frame) {
  const elements = defineElements(frame);

  const currentAim = frame.parentNode.querySelector(`.${SELECTOR__AIM}`);
  const rawDates = currentAim.getAttribute('data-dates');
  const caseSlaveAim = currentAim.classList.contains('js-slave');
  const caseMasterAim = currentAim.classList.contains('js-master');

  console.log(currentAim)

  if (caseSlaveAim) {
    sendDates(rawDates, elements.twinwrap);
    triggerClick(elements.frames.slave, elements.containers.master);
  } else {
    renderDatePicker(elements, rawDates, caseMasterAim);
  }
};

const init = function initDatePicker() {
  const inputFrames = document.querySelectorAll(`.${SELECTOR__FRAME}`);

  if (inputFrames) {
    inputFrames.forEach((frame) => sortTasks(frame));
  }
};

init();
