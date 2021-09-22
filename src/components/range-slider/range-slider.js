$( 
  function() {
    $( "#range-slider" ).slider({
      animate: "fast",
      range: true,
      min: 1000,
      max: 15000,
      step: 100,
      values: [ 5000, 10000 ],
      stop: function( event, ui ) {
        $( "#range-slider-marker" ).text(
          ui.values[ 0 ].toLocaleString("ru-RU") + "₽ - " +
          ui.values[ 1 ].toLocaleString("ru-RU") + "₽"
        );
      }
    });

    $( "#range-slider-marker" ).text(
      $( "#range-slider" ).slider( "values", 0 ).toLocaleString("ru-RU") + "₽ - " + 
      $( "#range-slider" ).slider( "values", 1 ).toLocaleString("ru-RU") + "₽"
    );
  }
);