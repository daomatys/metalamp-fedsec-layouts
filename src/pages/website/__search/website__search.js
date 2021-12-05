import '../website';

import './website__search.scss';

import '../../../components/pagination/pagination';
import '../../../components/card/__filter/card__filter';


const init = function init() {
  const activator = document.querySelector('.search-page__shift-activator');

  if ( activator ) {
    activator.onclick = () => activator.closest('.search-page__input-parameters-block').classList.toggle('window_shifted');
  }
}

init();
