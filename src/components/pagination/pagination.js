require('paginationjs');

$( 
  function() {
    $('#demo').pagination({
      className: 'paginationjs-theme-blue',
      dataSource: [1, 2, 3, 4, 5, 6, 7],
      pageSize: 3,
      showPrevious: false,
      showNext: false,
      callback: function(data, pagination) {
        var html = simpleTemplating(data);
        $('#data-container').html(html);
      }
    });
  }
);

function simpleTemplating(data) {
  var html = '<ul>';
  $.each(data, function(index, item){
      html += '<li>'+ item +'</li>';
  });
  html += '</ul>';
  return html;
}