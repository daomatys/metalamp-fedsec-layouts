import './votes-chart.scss';

function calcSum(arcs, extractedNumbers) {
  return [...arcs].map(extractedNumbers).reduce((prev, curr) => prev + curr);
}

function defineWord(num) {
  const caseFirstRange = Math.floor(num / 10) === 1 || num % 10 < 1 || num % 10 > 4;
  const caseLastRange = num % 10 > 1;

  if (caseFirstRange) {
    return 'голосов';
  }
  if (caseLastRange) {
    return 'голосa';
  }
  return 'голос';
}

function renderTexts(counter, worder, num) {
  const isolatedCounter = counter;
  const isolatedWorder = worder;

  isolatedCounter.textContent = num;
  isolatedWorder.textContent = defineWord(num);
}

function onLegendClick(event, item) {
  event.preventDefault();

  const relatedID = '#' + item.getAttribute('data-link');
  const aim = document.querySelector(relatedID);

  aim.focus();
}

function onFocus(arc, counter, worder) {
  const votesTotal = counter.textContent;
  const votes = arc.getAttribute('data-votes');

  const wordOriginal = worder.textContent;
  const word = defineWord(votes);

  const lastWidthValue = arc.getAttribute('stroke-width');
  const newWidthValue = 32;

  const apply = function applyProperties(vvalue, vvote, wword) {
    const switchState = function switchElementsContentAndClasses(elem, text) {
      const isolatedElem = elem;
      isolatedElem.textContent = text;
      isolatedElem.classList.toggle(`gradient__${arc.id.slice(14)}_start`);
    };
    switchState(counter, vvote);
    switchState(worder, wword);

    arc.setAttribute('stroke-width', vvalue);
  };
  apply(newWidthValue, votes, word);

  const arcBlurEventHandler = () => apply(lastWidthValue, votesTotal, wordOriginal);
  arc.addEventListener('blur', arcBlurEventHandler, { once: true });
}

function calcVotesTotalFixed(arc, votesTotal) {
  const minimalPercent = 0.01;
  const votes = arc.getAttribute('data-votes');
  const votesPercentage = votes / votesTotal;
  const caseVotesFiltration = votesPercentage > minimalPercent || votesPercentage === 0;
  const votesFiltrator = caseVotesFiltration ? votes : votesTotal * minimalPercent;
  const result = Number(votesFiltrator).toFixed();

  arc.setAttribute('data-votes-fixed', result);

  return Number(result);
}

const renderArcs = function renderArcsSVGFigures(arcs, votesTotal) {
  const strokeWidth = 4;
  const figureOuterRadius = 60;
  const figureInnerRadius = figureOuterRadius - strokeWidth / 2;
  const strokeLength = 2 * Math.PI.toFixed(3) * figureInnerRadius;
  const strokeGap = 2;
  const votesTotalFixed = calcSum(arcs, ((arc) => calcVotesTotalFixed(arc, votesTotal)));

  let strokeOffset = 0;

  arcs.forEach((arc) => {
    const votes = arc.getAttribute('data-votes-fixed');
    const votesPercentage = votes / votesTotalFixed;
    const strokeFilled = votesPercentage > 0 ? strokeLength * votesPercentage : strokeGap;

    const calculatedAttributes = {
      r: figureInnerRadius,
      'stroke-width': strokeWidth,
      'stroke-dasharray': `${strokeFilled - strokeGap} ${strokeLength}`,
      'stroke-dashoffset': strokeOffset,
    };
    Object.entries(calculatedAttributes).forEach(([key, value]) => arc.setAttribute(key, value));

    strokeOffset -= strokeFilled;
  });
};

function initListeners(chart) {
  const arcs = chart.querySelectorAll('.votes-chart__diagram-element_unit');
  const legendItems = chart.querySelectorAll('.votes-chart__legend-item');

  const diagramText = chart.querySelector('.votes-chart__diagram-text');
  const diagramTextCounter = diagramText.firstElementChild;
  const diagramTextWorder = diagramText.lastElementChild;

  const votesTotal = calcSum(arcs, ((arc) => Number(arc.getAttribute('data-votes'))));

  renderArcs(arcs, votesTotal);
  renderTexts(diagramTextCounter, diagramTextWorder, votesTotal);

  arcs.forEach((arc) => {
    const arcFocusEventHandler = () => onFocus(arc, diagramTextCounter, diagramTextWorder);
    arc.addEventListener('focus', arcFocusEventHandler);
  });

  legendItems.forEach((item) => {
    const legendPointerDownEventHandler = () => onLegendClick(event, item);
    item.addEventListener('pointerdown', legendPointerDownEventHandler);
  });
}

function initCharts() {
  const charts = document.querySelectorAll('.votes-chart');

  if (charts) {
    charts.forEach((chart) => initListeners(chart));
  }
}

initCharts();
