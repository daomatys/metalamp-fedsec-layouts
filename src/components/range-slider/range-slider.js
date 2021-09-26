import 'jquery-ui/ui/widgets/slider';

const sliderId = "#" + document.querySelector(".range-slider__elem").id;
const sliderMarkerId = sliderId + "_state";

$( 
  function() {
    $( sliderId ).slider({
      animate: "fast",
      range: true,
      min: 100,
      max: 15500,
      step: 50,
      values: [ 5000, 10000 ],
      stop: displaySliderChosenValues
    });
    
    displaySliderChosenValues(); //initial displaying
  }
);

function displaySliderChosenValues() {
  $( sliderMarkerId ).text(
    $( sliderId ).slider( "values", 0 ).toLocaleString("ru-RU") + "₽ - " + 
    $( sliderId ).slider( "values", 1 ).toLocaleString("ru-RU") + "₽"
  );
}