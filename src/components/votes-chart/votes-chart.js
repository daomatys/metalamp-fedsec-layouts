const votes = function() {
  const arcs = document.querySelectorAll('.votes-chart__diagram-element_unit');

  arcs.forEach( arc => arc.addEventListener('pointerover', onPointerOver ) );
}

const onPointerOver = function pointerOverEvent({target}) {
  const defineElement = suffix => document.querySelector(`.votes-chart__diagram-text_${suffix}`);

  const centralTextVotes = defineElement('votes');
  const centralTextWord = defineElement('word');

  const votesTotal = centralTextVotes.textContent;
  const votes = target.getAttribute('data-votes');

  const wordOriginal = centralTextWord.textContent;
  const word = 'голос' + wordEnding( votes );

  const lastWidthValue = target.getAttribute('stroke-width');
  const newWidthValue = 32;

  const apply = function applyProperties( vvalue, vvote, wword ) {
    const switchState = (elem, text) => {
      elem.textContent = text;
      elem.classList.toggle( `gradient__${target.id.slice(12)}_end` );
    }

    switchState( centralTextVotes, vvote );
    switchState( centralTextWord, wword );

    target.setAttribute('stroke-width', vvalue);
  }

  apply( newWidthValue, votes, word );

  target.addEventListener('pointerout', () => apply( lastWidthValue, votesTotal, wordOriginal ), {once: true});
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

votes();
