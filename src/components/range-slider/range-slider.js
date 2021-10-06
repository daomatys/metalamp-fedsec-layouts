import 'jquery-ui/ui/widgets/slider';

function findRangeSliderContainer() {
  const sliderElem = document.querySelector(".range-slider__elem");

  if ( sliderElem ) {
    initRangeSlider( sliderElem );
  }
}

function initRangeSlider( sliderElem ) {
  const sliderId = "#" + sliderElem.id;
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
  )

  function displaySliderChosenValues() {
    $( sliderMarkerId ).text(
      $( sliderId ).slider( "values", 0 ).toLocaleString("ru-RU") + "₽ - " + 
      $( sliderId ).slider( "values", 1 ).toLocaleString("ru-RU") + "₽"
    );
  }
}

findRangeSliderContainer();
