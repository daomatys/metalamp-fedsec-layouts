import './input__dropdown.scss';

import '@entities/__expandable/entities__expandable';
import '@components/material-icon-cell/material-icon-cell';
import '@components/button/__mean-oval/button__mean-oval';
import '@components/button/__circle/button__circle';

function acceptForm(controller) {
  const frame = controller.closest('.input__element').querySelector('.input__frame');

  frame.dispatchEvent(new Event('click'));
}

function defineCountersSum(counters) {
  const result = Array
    .from(counters)
    .map((counter) => Number(counter.textContent))
    .reduce((acc, curr) => acc + curr);

  return result;
}

function defineButtons(parent) {
  const firstElement = parent.firstElementChild;
  const lastElement = parent.lastElementChild;

  const result = {
    left: firstElement,
    right: lastElement,
  };
  return result;
}

function adjustButtonsState(buttons, value, selector, leftOnly) {
  const caseA = value < 1;
  const caseB = value > 9;

  if (caseA || caseB) {
    if (caseA) {
      buttons.left.classList.add(selector);
    }
    if (caseB && !leftOnly) {
      buttons.right.classList.add(selector);
    }
  }
  if (!(caseA || caseB)) {
    buttons.left.classList.remove(selector);
    buttons.right.classList.remove(selector);
  }
}

function defineResetControllerState(counters, controllers) {
  const countersSum = defineCountersSum(counters);

  adjustButtonsState(controllers, countersSum, 'js-mean-oval-button_hidden', true);
}

function defineEnding(currentValue, endings) {
  const caseA = Math.floor(currentValue / 10) === 1;
  const caseB = currentValue % 10 < 1;
  const caseC = currentValue % 10 > 4;

  const caseAppropriateRange = caseA || caseB || caseC;
  const caseNotDividerOfTen = currentValue % 10 > 1;

  if (caseAppropriateRange) {
    const i = 1;
    return endings[i];
  }
  if (caseNotDividerOfTen) {
    const i = 2;
    return endings[i];
  }
  const i = 0;
  return endings[i];
}

function defineText(currentValue, lastValue, word, endings = []) {
  const fixedLastValue = lastValue > 0 ? ', ' : '';
  const fixedCurrentValue = `${currentValue} `;
  const ending = defineEnding(currentValue, endings);

  if (currentValue > 0) {
    const textParts = [
      fixedLastValue,
      fixedCurrentValue,
      word,
      ending,
    ];
    return textParts.join('');
  }
  return '';
}

function defineGuestInputValue(values) {
  const valuesSum = values.reduce((acc, curr) => acc + curr);

  const firstText = defineText(valuesSum, 0, 'гост', ['ь', 'ей', 'я']);
  const lastText = defineText(values[2], valuesSum, 'младен', ['ец', 'цев', 'ца']);

  return firstText + lastText;
}

function defineFacilitiesInputValue(values) {
  const firstText = defineText(values[0], 0, 'cпал', ['ьня', 'ен', 'ьни']);
  const secondText = defineText(values[1], values[0], 'кроват', ['ь', 'ей', 'и']);
  const thirdText = defineText(values[2], values[0] + values[1], 'ванн', ['ая комната', 'ых комнат', 'ые комнаты']);

  const result = `${firstText + secondText + thirdText}…`;

  return result.length < 2 ? '' : result;
}

function updateDropdownValue(anychild, counters) {
  const dropdown = anychild.closest('.input__dropdown');
  const frame = dropdown.parentNode.querySelector('.input__frame');
  const values = Array.from(counters, (item) => Number(item.textContent));
  const dropdownType = dropdown.getAttribute('data-options-type');

  let dropdownValue = '';

  switch (dropdownType) {
    case 'guests': {
      dropdownValue = defineGuestInputValue(values);
      break;
    }
    case 'facilities': {
      dropdownValue = defineFacilitiesInputValue(values);
      break;
    }
    default: {
      break;
    }
  }
  frame.value = dropdownValue;
}

function resetCounters(controllers, counters, buttonGroups) {
  counters.forEach((counter) => {
    const fixedCounter = counter;
    fixedCounter.textContent = 0;
  });
  buttonGroups.forEach((group) => {
    const buttons = defineButtons(group);

    buttons.left.classList.add('circle-button_frozen');
    buttons.right.classList.remove('circle-button_frozen');
  });
  defineResetControllerState(counters, controllers);
  updateDropdownValue([...counters][0], counters);
}

function updateDropdown(buttons, counter, addification, controllers, counters) {
  const fixedCounter = counter;
  const newCounterValue = parseInt(counter.textContent, 10) + addification;

  adjustButtonsState(buttons, newCounterValue, 'circle-button_frozen');
  fixedCounter.textContent = newCounterValue;
  updateDropdownValue(counter, counters);

  if (controllers) {
    defineResetControllerState(counters, controllers);
  }
}

function initButtons(buttons, counters, controllers) {
  const optionButtons = defineButtons(buttons);
  const optionCounter = buttons.querySelector('.input__option-counter');
  const optionCounterValue = optionCounter.textContent;

  adjustButtonsState(optionButtons, optionCounterValue, 'circle-button_frozen');

  const update = function update(elem, shift) {
    const fixedElem = elem;

    fixedElem.onclick = () => {
      updateDropdown(optionButtons, optionCounter, shift, controllers, counters);
    };
  };
  update(optionButtons.left, -1);
  update(optionButtons.right, 1);
}

function initControllers(counters, controllers, buttonGroups) {
  const resetController = controllers.left;
  const acceptController = controllers.right;

  defineResetControllerState(counters, controllers);

  const resetControllerClickHandler = () => resetCounters(controllers, counters, buttonGroups);
  const acceptControllerClickHandler = () => acceptForm(acceptController);

  resetController.addEventListener('click', resetControllerClickHandler);
  acceptController.addEventListener('click', acceptControllerClickHandler);
}

function initEventListeners(dropdown) {
  const counters = dropdown.querySelectorAll('.input__option-counter');
  const buttonGroups = dropdown.querySelectorAll('.input__option-button-block');
  const controllersBar = dropdown.querySelector('.input__state-controllers');

  updateDropdownValue(Array.from(counters)[0], counters);

  if (controllersBar) {
    const controllers = defineButtons(controllersBar);

    initControllers(counters, controllers, buttonGroups);
    buttonGroups.forEach((buttons) => initButtons(buttons, counters, controllers));
  }

  if (!controllersBar) {
    buttonGroups.forEach((buttons) => initButtons(buttons, counters, undefined));
  }
}

function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.input__dropdown');

  dropdowns.forEach((dropdown) => initEventListeners(dropdown));
}

findDropdownContainers();
