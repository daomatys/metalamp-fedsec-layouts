function toggleButtonEventListeners() {
  const items = document.querySelectorAll('.toggle-mode');

  for (let item of items) {
    item.addEventListener('click', toggleButtonPressing);
  }
}

function toggleButtonPressing({target}) {
  const aim = target.closest('.toggle-mode'); 
  const icon = aim.querySelector('.toggle-mode__icon').firstElementChild;

  aim.classList.toggle('micro-button_pressed');
  icon.classList.toggle('gradient-fill');

  switch ( aim.classList.contains('micro-button_pressed') ) {
    case true: {

      break;
    }
    case false: {
      
      break;
    }
  }
}

toggleButtonEventListeners();