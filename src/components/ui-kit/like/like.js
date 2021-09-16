function likeToggling() {
  const aims = document.querySelectorAll('.like-btn');

  for (let aim in aims) {
    aim.onclick = () => {
      aim.firstElementChild.textContent = 'favorite';
      aim.classList.toggle('.like-btn_toggled');
    }
  }  
}

likeToggling();