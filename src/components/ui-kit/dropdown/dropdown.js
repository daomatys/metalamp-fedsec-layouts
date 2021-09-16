function dropdownEventListeners() {
  const items = document.querySelectorAll('input.dropdown-is-closed');

  for (let item of items) {
    item.addEventListener('click', onClickEvent);
  }
}

function onClickEvent({target}) {
  const dropdown = target.closest('.input').querySelector('.dropdown');

  const classOne = 'dropdown-is-closed';
  const classTwo = 'dropdown-is-opened';
  const classThree = 'dropdown-ejected';

  const switchClass = (aim, arg) => aim.classList.toggle( arg );

  switchClass(target, classOne);
  switchClass(target, classTwo);
  switchClass(dropdown, classThree);
}

dropdownEventListeners();