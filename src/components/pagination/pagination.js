import './pagination.scss';
import 'paginationjs/dist/pagination.min';

import '@components/material-icon-cell/material-icon-cell';


function findPaginationContainer() {
  const paginationElem = document.querySelector('#pagination');

  if ( paginationElem ) {
    initPaginationModule();
  }
}

function initPaginationModule() {
  $('#pagination').pagination({
    className: 'custom-paginationjs',
    dataSource: generateDataByCount,
    pageRange: 1,
    pageSize: 12,
    autoHidePrevious: true,
    autoHideNext: true,
    prevText: 'arrow_forward',
    nextText: 'arrow_forward',
    showNavigator: true,
    formatNavigator: defineNavigatorText/*,
    callback: activateTemplating*/
  });
}

function generateDataByCount(done) {
  let result = [];
  for (let i = 0; i < 180; ++i) {
    result.push(i);
  }
  done(result);
}

function defineNavigatorText( currentPage, undefined, totalNumber ) {
  const numberStart = 11 * (currentPage - 1) + currentPage;
  const numberEnd = 12 * currentPage;
  const numberTotalFloored = Math.floor((totalNumber / 100), 2) * 100;

  const result = `${numberStart} - ${numberEnd} из ${numberTotalFloored}+ вариантов аренды`;
  
  return result;
}

/*function activateTemplating( data, paginationElem ) {
  let html = simpleTemplating(data);
  $('#data-container').html(html);
}

function simpleTemplating(data) {
  let html = '<ul>';
  $.each(data, function(index, item){
      html += '<li>'+ item +'</li>';
  });
  html += '</ul>';
  return html;
}*/

findPaginationContainer();
