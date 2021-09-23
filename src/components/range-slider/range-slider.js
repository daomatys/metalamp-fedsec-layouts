import 'jquery-ui/ui/widgets/slider';

$( 
  function() {
    $( "#range-slider" ).slider({
      animate: "fast",
      range: true,
      min: 2000,
      max: 13000,
      step: 50,
      values: [ 5000, 10000 ],
      stop: displaySliderChosenValues
    });
    
    displaySliderChosenValues(); //initial displaying
  }
);

function displaySliderChosenValues() {
  $( "#range-slider-marker" ).text(
    $( "#range-slider" ).slider( "values", 0 ).toLocaleString("ru-RU") + "₽ - " + 
    $( "#range-slider" ).slider( "values", 1 ).toLocaleString("ru-RU") + "₽"
  );
}