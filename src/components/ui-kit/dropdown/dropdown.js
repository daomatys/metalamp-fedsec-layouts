class Dropdown {

  constructor() {
    this.elems = document.querySelectorAll('input.dropdown-is-closed');

    this.eventListeners();
  }

  eventListeners() {
    for (let elem of this.elems) {
      elem.addEventListener('click', this.onClickEvent);
    }
  }

  onClickEvent({target}) {
    const dropdownElem = target.parentElement.querySelector('.dropdown');
    const classOne = 'dropdown-is-closed';
    const classTwo = 'dropdown-is-opened';
    const classThree = 'dropdown-ejected';

    const switchClass = (aim, arg) => aim.classList.toggle( arg );

    switchClass(target, classOne);
    switchClass(target, classTwo);
    switchClass(dropdownElem, classThree);
  }
}

function dropdownEjection() {
  const dropdown = new Dropdown();
}

dropdownEjection();