const init = function init() {
  const activator = document.querySelector('.search-page__shift-activator');

  if ( activator ) {
    activator.onclick = activator.closest('.search-page__input-parameters-block').classList.toggle('window-shifted');
  }
}

init();
