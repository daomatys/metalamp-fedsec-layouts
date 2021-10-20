const find = function findDropdownContainers() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach( item => initListeners( item ) );
}

const defineButtons = function defineFirstAndLastChildByItsParent( parent ) {
  const firstElement = parent.firstElementChild;
  const lastElement = parent.lastElementChild;

  return { left: firstElement, right: lastElement };
}

const initListeners = function initDropdownElementsEventListeners( item ) {
  const controllersBar = item.querySelector('.input__clear-n-submit')
  const optionCalcSections = item.querySelectorAll('input__option_buttons')

  const controllerButtons = defineButtons( controllersBar );

  controllerButtons.left.addEventListener('click', resetCounters);
  controllerButtons.right.addEventListener('click', submitForm);

  optionCalcSections.forEach( item => {
    const optionButtons = defineButtons( item );

    optionButtons.left.addEventListener('click', counterDec( item ));
    optionButtons.right.addEventListener('click', counterInc( item ));
  })
}

const resetCounters = function resetCounterValueOnButtonClick() {
  
}