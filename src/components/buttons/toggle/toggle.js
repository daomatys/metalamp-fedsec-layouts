function toggleButtonEventListeners() {
  const items = document.querySelectorAll('.toggle-button__elem');

  for (let item of items) {
    item.addEventListener('click', toggleButtonPressing);
  }
}

function toggleButtonPressing({target}) {
  const aim = target.closest('.toggle-button__elem'); 
  const icon = aim.firstElementChild;

  aim.classList.toggle('toggle-button__elem_pressed');
  icon.classList.toggle('gradient-fill');
}

toggleButtonEventListeners();