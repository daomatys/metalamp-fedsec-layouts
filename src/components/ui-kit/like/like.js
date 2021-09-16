function likeToggling() {
  const onClickEvent = ({target}) => {
    const aim = target.closest('.like-btn'); 

    if (aim) {
      const icon = aim.querySelector('.like-btn__icon').firstElementChild;
      const counter = aim.querySelector('.like-btn__counter').firstElementChild;

      aim.classList.toggle('like-btn_toggled');

      switch ( aim.classList.contains('like-btn_toggled') ) {
        case true: {
          icon.textContent = 'favorite'
          ++counter.textContent;
          break;
        }
        case false: {
          icon.textContent = 'favorite_border';
          --counter.textContent;
          break;
        }
      }
    }
  }
  document.querySelector('.like-btn__elem').addEventListener('click', onClickEvent)
}

likeToggling();