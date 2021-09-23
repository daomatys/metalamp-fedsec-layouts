import 'paginationjs/dist/pagination.min';

$(
  function() {
    $('#demo').pagination({
      dataSource: function(done){
        let result = [];
        for (let i = 1; i < 180; i++) {
            result.push(i);
        }
        done(result);
      },
      pageRange: 1,
      pageSize: 12,
      autoHidePrevious: true,
      autoHideNext: true,
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