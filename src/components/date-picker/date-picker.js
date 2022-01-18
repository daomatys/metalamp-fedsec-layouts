import AirDatepicker from 'air-datepicker';
import customLocale from './_custom-locale/date-picker_custom-locale';

import './date-picker.scss';
import '@components/button/__mean-oval/button__mean-oval';

const SELECTOR__AIM = '.js-expander__aim';
const SELECTOR__FRAME = '.js-adp-frame';
const SELECTOR__PARENT = '.js-expander__parent';
const SELECTOR__CONTAINER = '.js-expander__container';
const SELECTOR__BUTTON_HIDDEN = 'js-mean-oval-button_hidden';

function defineClearButtonState(masterFrame, clearButton) {
  const caseValuesExists = masterFrame.value;

  if (caseValuesExists) {
    clearButton.classList.remove(SELECTOR__BUTTON_HIDDEN);
  } else {
    clearButton.classList.add(SELECTOR__BUTTON_HIDDEN);
  }
}

function sendDates(rawDates) {
  const fixedDatesArray = rawDates ? rawDates.split(', ') : [];
  const fixedDates = fixedDatesArray.map((fixedDate) => new Date(fixedDate));

  document.dispatchEvent(new CustomEvent('incoming-dates', { detail: fixedDates }));
}

function renderDatePickerValues(datePicker, rawDates, caseCurrentAimMaster) {
  const eventHandler = function incomingDatesEventHandler({ detail }) {
    datePicker.selectDate(detail);
  };
  document.addEventListener('incoming-dates', eventHandler, { once: true });

  if (!caseCurrentAimMaster) {
    sendDates(rawDates);
  }
}

function routeValues(frames, clearButton) {
  const startIndex = 0;
  const endIndex = 1;

  const slaveFrame = frames.slave;
  const masterFrame = frames.master;

  if (!slaveFrame.isEqualNode(masterFrame)) {
    const initialValue = masterFrame.value.split(' - ');
    const caseBothValuesExists = initialValue.length > 1;

    if (caseBothValuesExists) {
      masterFrame.value = initialValue[startIndex];
      slaveFrame.value = initialValue[endIndex];
    } else {
      slaveFrame.value = '';
      masterFrame.value = initialValue[startIndex];
    }
  }
  defineClearButtonState(masterFrame, clearButton);
}

function renderDatePicker(elements, rawDates, caseCurrentAimMaster) {
  const insertIconMarkup = (name) => `<span class="material-icons">${name}</span>`;
  const currentDate = new Date('2019-08-08');
  const dateFormat = elements.hierarchy ? 'dd.MM.yyyy' : 'd MMM';

  const socket = elements.containers.master.querySelector('.date-picker__socket');
  const { frames } = elements;
  const masterFrame = frames.master;

  const buttons = socket.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');

  const datePicker = new AirDatepicker(socket, {
    navTitles: {
      days: 'MMMM yyyy',
    },
    locale: customLocale,
    range: true,
    keyboardNav: false,
    altField: masterFrame,
    altFieldDateFormat: dateFormat,
    multipleDatesSeparator: ' - ',
    prevHtml: insertIconMarkup('arrow_back'),
    nextHtml: insertIconMarkup('arrow_forward'),
    minDate: currentDate,
    startDate: currentDate,
    onSelect: () => routeValues(frames, clearButton),
  });
  defineClearButtonState(masterFrame, clearButton);

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frames.master.click();

  renderDatePickerValues(datePicker, rawDates, caseCurrentAimMaster);
}

function triggerClick(slaveFrame, masterContainer) {
  const clickEventHandler = function clickEventHandler() {
    masterContainer.classList.toggle('js-expander_active');
  };
  slaveFrame.addEventListener('click', clickEventHandler);
}

function defineElements(currentFrame) {
  const currentFrameParent = currentFrame.closest(SELECTOR__PARENT);
  const twinwrap = currentFrameParent.parentNode;

  const hierarchy = !!twinwrap.querySelector('.js-master');
  const masterInput = hierarchy ? twinwrap.firstElementChild : currentFrameParent;
  const slaveInput = hierarchy ? twinwrap.lastElementChild : masterInput;

  return {
    containers: {
      master: masterInput.querySelector(SELECTOR__CONTAINER),
      slave: slaveInput.querySelector(SELECTOR__CONTAINER),
    },
    frames: {
      master: masterInput.querySelector(SELECTOR__FRAME),
      slave: slaveInput.querySelector(SELECTOR__FRAME),
    },
    hierarchy,
  };
}

function sortTasks(frame) {
  const elements = defineElements(frame);

  const currentAim = frame.parentNode.querySelector(SELECTOR__AIM);
  const caseCurrentAimSlave = currentAim.classList.contains('js-slave');
  const caseCurrentAimMaster = currentAim.classList.contains('js-master');

  const rawDates = currentAim.getAttribute('data-dates');

  if (caseCurrentAimSlave) {
    sendDates(rawDates);
    triggerClick(elements.frames.slave, elements.containers.master);
  } else {
    renderDatePicker(elements, rawDates, caseCurrentAimMaster);
  }
}

function initDatePickerFrames() {
  const frames = document.querySelectorAll(SELECTOR__FRAME);

  frames.forEach((frame) => {
    sortTasks(frame);
  });
}

initDatePickerFrames();
