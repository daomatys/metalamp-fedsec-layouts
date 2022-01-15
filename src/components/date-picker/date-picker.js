import AirDatepicker from 'air-datepicker';
import customLocale from './_custom-locale/date-picker_custom-locale';

import './date-picker.scss';

import '@components/button/__mean-oval/button__mean-oval';

const SELECTOR__FRAME = 'js-adp-frame';
const SELECTOR__AIM = 'js-expander__aim';
const SELECTOR__PARENT = 'js-expander__parent';
const SELECTOR__ACTIVE = 'js-expander_active';

const defineElements = function defineElements(frame) {
  const holder = frame.closest(`.${SELECTOR__PARENT}`).parentNode;

  const caseRelations = holder.querySelector('.js-master');
  const master = caseRelations ? holder.firstElementChild : frame.parentNode;
  const slave = caseRelations ? holder.lastElementChild : master;

  return {
    relations: !!caseRelations,
    holder,
    frames: {
      master: master.querySelector(`.${SELECTOR__FRAME}`),
      slave: slave.querySelector(`.${SELECTOR__FRAME}`),
    },
    aims: {
      master: master.querySelector(`.${SELECTOR__AIM}`),
      slave: slave.querySelector(`.${SELECTOR__AIM}`),
    },
  };
};

const sendDates = function sendDates(rawDates, holder) {
  const fixedDatesArray = rawDates ? rawDates.split(', ') : [];
  const fixedDates = fixedDatesArray.map((fixedDate) => new Date(fixedDate));

  holder.dispatchEvent(new CustomEvent('incoming-dates', { detail: fixedDates }));
};

const triggerClick = function triggerClick(slaveFrame, masterAim) {
  const clickEventHandler = () => masterAim.classList.toggle(SELECTOR__ACTIVE);

  slaveFrame.addEventListener('click', clickEventHandler);
};

const renderDateValues = function renderDates(datePicker, holder, rawDates, caseMasterAim) {
  const incomingDatesEventHandler = ({ detail }) => datePicker.selectDate(detail);

  holder.addEventListener('incoming-dates', incomingDatesEventHandler, { once: true });

  if (!caseMasterAim) {
    sendDates(rawDates, holder);
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

const renderDatePicker = function renderDatePicker(elements, rawDates, caseMasterAim) {
  const icon = (name) => `<span class="material-icons">${name}</span>`;
  const currentDate = new Date('2019-08-08');
  const dateFormat = elements.relations ? 'dd.MM.yyyy' : 'd MMM';

  const container = elements.aims.master.querySelector('.date-picker__container');

  const { frames } = elements;
  const slaveFrame = frames.slave;
  const masterFrame = frames.master;

  const buttons = container.nextElementSibling;
  const clearButton = buttons.firstElementChild.querySelector('button');
  const acceptButton = buttons.lastElementChild.querySelector('button');

  const routeValues = function routeValues() {
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
  const datePicker = new AirDatepicker(container, {
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
    minDate: currentDate,
    startDate: currentDate,
    onSelect: () => routeValues(),
  });
  defineClearButtonState(masterFrame, clearButton);

  clearButton.onclick = () => datePicker.clear();
  acceptButton.onclick = () => frames.master.click();

  renderDateValues(datePicker, elements.holder, rawDates, caseMasterAim);
};

const sortTasks = function sortDatePickerElementsTasks(frame) {
  const elements = defineElements(frame);

  const currentAim = frame.parentNode.querySelector(`.${SELECTOR__AIM}`);
  const rawDates = currentAim.getAttribute('data-dates');
  const caseSlaveAim = currentAim.classList.contains('js-slave');
  const caseMasterAim = currentAim.classList.contains('js-master');

  if (caseSlaveAim) {
    sendDates(rawDates, elements.holder);
    triggerClick(elements.frames.slave, elements.aims.master);
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
