import 'jquery-ui/ui/widgets/slider';
import './range-slider.scss';
import '@components/title-bar/title-bar';

const renderSlider = function renderRangeSlider(slider) {
  const sliderId = `#${slider.id}`;
  const sliderMarkerId = `${sliderId}_state`;

  const defineValues = function defineNewSliderChosenValues() {
    $(sliderMarkerId).text(
      `${$(sliderId).slider('values', 0).toLocaleString('ru-RU')}₽ - ${
        $(sliderId).slider('values', 1).toLocaleString('ru-RU')}₽`,
    );
  };
  $(sliderId).slider({
    animate: 'fast',
    range: true,
    min: 100,
    max: 15500,
    step: 50,
    values: [5000, 10000],
    stop: defineValues,
  });

  defineValues();
};

const init = function findRangeSliderContainer() {
  const sliders = document.querySelectorAll('.range-slider__elem');

  if (sliders) {
    sliders.forEach((slider) => renderSlider(slider));
  }
};

init();
