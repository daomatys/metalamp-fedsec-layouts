class Dropdown {

  constructor() {
    this.elems = document.querySelectorAll('input.dropdown-closed');

    this.eventListeners();
  }

  eventListeners() {
    for (let elem of this.elems) {
      elem.addEventListener('click', this.onClickEvent);
    }
  }

  onClickEvent({target}) {
    const dropdownElem = target.parentElement.lastElementChild;
    const classOne = 'dropdown-closed';
    const classTwo = 'dropdown-opened';
    const classThree = 'dropdown-shown';

    const switchClass = (aim, arg) => aim.classList.toggle( arg );

    console.log(dropdownElem)

    switchClass(target, classOne);
    switchClass(target, classTwo);
    switchClass(dropdownElem, classThree);
  }
}

function main() {
  const dropdown = new Dropdown();
}

main();