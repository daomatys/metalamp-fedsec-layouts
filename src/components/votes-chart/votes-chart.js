const init = function initEventListeners() {
  const arcs = document.querySelectorAll('.votes-chart__diagram-element_unit');
  const legendItems = document.querySelectorAll('.votes-chart__legend-item');

  arcs.forEach( arc => arc.addEventListener('focus', () => onFocus( arc )) );
  legendItems.forEach( item => item.addEventListener('pointerdown', (event) => onLegendClick( event, item )) );
}

const onLegendClick = function onLegendClickEvent( event, item ) {
  event.preventDefault();

  const relatedID = '#' + item.getAttribute('data-link');
  const aim = document.querySelector( relatedID );

  aim.focus();
}

const onFocus = function onFocusEvent( arc ) {
  const defineElement = suffix => document.querySelector(`.votes-chart__diagram-text_${suffix}`);

  const centralTextVotes = defineElement('votes');
  const centralTextWord = defineElement('word');

  const votesTotal = centralTextVotes.textContent;
  const votes = arc.getAttribute('data-votes');

  const wordOriginal = centralTextWord.textContent;
  const word = 'голос' + wordEnding( votes );

  const lastWidthValue = arc.getAttribute('stroke-width');
  const newWidthValue = 32;

  const apply = function applyProperties( vvalue, vvote, wword ) {
    const switchState = function switchElementsContentAndClasses( elem, text ) {
      elem.textContent = text;
      elem.classList.toggle(`gradient__${arc.id.slice(12)}_start`);
    }
    switchState( centralTextVotes, vvote );
    switchState( centralTextWord, wword );

    arc.setAttribute('stroke-width', vvalue);
  }

  apply( newWidthValue, votes, word );

  arc.addEventListener('blur', () => apply( lastWidthValue, votesTotal, wordOriginal ), { once: true });
}

const wordEnding = function defineWordEndingAccordingToNumber( num ) {
  let result = ""

  if ( Math.floor(num/10)===1 || num%10<1 || num%10>4 ) {
    result = "ов";
 } else {
    if ( num%10>1 ) {
      result = "a";
   }
 }
  return result;
}

init();
