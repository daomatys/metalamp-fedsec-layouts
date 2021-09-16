function toggleButtonEventListeners() {
  const items = document.querySelectorAll('.toggle-mode');

  for (let item of items) {
    item.addEventListener('click', toggleButtonToggling);
  }
}

function toggleButtonToggling({target}) {
  const aim = target.closest('.toggle-mode'); 
  const icon = aim.querySelector('.toggle-mode__icon').firstElementChild;
  const counter = aim.querySelector('.toggle-mode__counter').firstElementChild;

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