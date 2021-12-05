import './votes-chart.scss';

const init = function() {
  const charts = document.querySelectorAll('.votes-chart');

  if ( charts ) {
    charts.forEach( chart => initListeners( chart ) );
  }
}

const calcSum = function calcSumOfNeededParametersOfArcsCollectionItems( arcs, extractNeededNumbers ) {
  return [...arcs].map( extractNeededNumbers ).reduce( (prev, curr) => prev + curr );
}

const initListeners = function initEverythingForRenderAndListen( chart ) {
  const arcs = chart.querySelectorAll('.votes-chart__diagram-element_unit');
  const legendItems = chart.querySelectorAll('.votes-chart__legend-item');

  const diagramText = chart.querySelector('.votes-chart__diagram-text');
  const diagramTextCounter = diagramText.firstElementChild;
  const diagramTextWorder = diagramText.lastElementChild;

  const votesTotal = calcSum( arcs, ( arc => Number(arc.getAttribute('data-votes')) ) );

  renderArcs( arcs, votesTotal );
  renderTexts( diagramTextCounter, diagramTextWorder, votesTotal );

  arcs.forEach( arc => arc.addEventListener('focus', () => onFocus( arc, diagramTextCounter, diagramTextWorder )) );
  legendItems.forEach( item => item.addEventListener('pointerdown', (event) => onLegendClick( event, item )) );
}

const renderArcs = function renderArcsSVGFigures( arcs, votesTotal ) {
  const calcVotesTotalFixed = function calcVotesTotalFixedValueToPreventRenderBugs( arc ) {
    const minimalPercent = 0.01;
    const votes = arc.getAttribute('data-votes');
    const votesPercentage = votes / votesTotal;
    const votesFiltrator = ( votesPercentage > minimalPercent || votesPercentage === 0 ) ? votes : votesTotal * minimalPercent;
    const result = Number( votesFiltrator ).toFixed();

    arc.setAttribute('data-votes-fixed', result);

    return Number( result );
  }

  const strokeWidth = 4;
  const figureOuterRadius = 60;
  const figureInnerRadius = figureOuterRadius - strokeWidth / 2;
  const strokeLength = 2 * Math.PI.toFixed(3) * figureInnerRadius;
  const strokeGap = 2;
  const votesTotalFixed = calcSum( arcs, ( arc => calcVotesTotalFixed( arc ) ) );

  let strokeOffset = 0;

  arcs.forEach( arc => {
    const votes = arc.getAttribute('data-votes-fixed');
    const votesPercentage = votes / votesTotalFixed;
    const strokeFilled = votesPercentage > 0 ? strokeLength * votesPercentage : strokeGap ;

    const calculatedAttributes = {
      r: figureInnerRadius,
      'stroke-width': strokeWidth,
      'stroke-dasharray': `${strokeFilled - strokeGap} ${strokeLength}`,
      'stroke-dashoffset': strokeOffset
    };
    Object.entries( calculatedAttributes ).forEach( ([key, value]) => arc.setAttribute(key, value) );

    strokeOffset -= strokeFilled;
  });
}

const renderTexts = function renderDiagramBlockInnerTextSpans( counter, worder, num ) {
  counter.textContent = num;
  worder.textContent = defineWord( num );
}

const onLegendClick = function onLegendClickEvent( event, item ) {
  event.preventDefault();

  const relatedID = '#' + item.getAttribute('data-link');
  const aim = document.querySelector( relatedID );

  aim.focus();
}

const onFocus = function onFocusEvent( arc, counter, worder ) {
  const votesTotal = counter.textContent;
  const votes = arc.getAttribute('data-votes');

  const wordOriginal = worder.textContent;
  const word = defineWord( votes );

  const lastWidthValue = arc.getAttribute('stroke-width');
  const newWidthValue = 32;

  const apply = function applyProperties( vvalue, vvote, wword ) {
    const switchState = function switchElementsContentAndClasses( elem, text ) {
      elem.textContent = text;
      elem.classList.toggle(`gradient__${arc.id.slice(14)}_start`);
    }
    switchState( counter, vvote );
    switchState( worder, wword );

    arc.setAttribute('stroke-width', vvalue);
  }

  apply( newWidthValue, votes, word );

  arc.addEventListener('blur', () => apply( lastWidthValue, votesTotal, wordOriginal ), { once: true });
}

const defineWord = function defineWordEndingAccordingToNumber( num ) {
  let result = 'голос'

  if ( Math.floor(num/10)===1 || num%10<1 || num%10>4 ) {
    result += 'ов';
  } else {
    if ( num%10>1 ) {
      result += 'a';
    }
  }
  return result;
}

init();
