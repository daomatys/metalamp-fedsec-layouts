import './pagination.scss';
import 'paginationjs/dist/pagination.min';

import '@components/material-icon-cell/material-icon-cell';

function defineNavigatorText(currentPage, __, totalNumber) {
  const numberStart = 11 * (currentPage - 1) + currentPage;
  const numberEnd = 12 * currentPage;
  const numberTotalFloored = Math.floor((totalNumber / 100), 2) * 100;

  const result = `${numberStart} - ${numberEnd} из ${numberTotalFloored}+ вариантов аренды`;

  return result;
}

function initPaginationModule() {
  $('#pagination').pagination({
    className: 'custom-paginationjs',
    dataSource: Array(180),
    pageRange: 1,
    pageSize: 12,
    autoHidePrevious: true,
    autoHideNext: true,
    prevText: 'arrow_forward',
    nextText: 'arrow_forward',
    showNavigator: true,
    formatNavigator: defineNavigatorText,
  });
}

function findPaginationContainer() {
  const paginationElem = document.querySelector('#pagination');

  if (paginationElem) {
    initPaginationModule();
  }
}

findPaginationContainer();
