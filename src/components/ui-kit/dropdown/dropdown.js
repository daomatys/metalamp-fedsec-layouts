class Dropdown {

  constructor() {
    this.eventListeners();
  }

  eventListeners() {
    const items = document.querySelectorAll('input.dropdown-is-closed');

    for (let item of items) {
      item.addEventListener('click', this.onClickEvent);
    }
  }

  onClickEvent({target}) {
    const dropdown = target.closest('.input').querySelector('.dropdown');

    const classOne = 'dropdown-is-closed';
    const classTwo = 'dropdown-is-opened';
    const classThree = 'dropdown-ejected';

    const switchClass = (aim, arg) => aim.classList.toggle( arg );

    switchClass(target, classOne);
    switchClass(target, classTwo);
    switchClass(dropdown, classThree);
  }
}

function dropdownEjection() {
  const dropdownInit = new Dropdown();
}

dropdownEjection();