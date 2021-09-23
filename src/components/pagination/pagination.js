import 'paginationjs/dist/pagination.min';

$(
  function() {
    $('#demo').pagination({
      dataSource: generateDataByCount,
      className: 'custom-paginationjs',
      pageRange: 1,
      pageSize: 12,
      autoHidePrevious: true,
      autoHideNext: true,
      prevText: 'arrow_forward',
      nextText: 'arrow_forward',
      showNavigator: true,
      formatNavigator: defineNavigatorText,
      callback: activateTemplating,
    });
  }
);

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
  
  return (`
    ${ numberStart } - ${ numberEnd } из ${ numberTotalFloored }+ вариантов аренды`
  );
}

/*function activateTemplating( data, pagination ) {
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
