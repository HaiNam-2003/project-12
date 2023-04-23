const commentItem = document.querySelectorAll('.comment__item');
const commentGrid = document.querySelector('.comment__grid');
const slideWidth = commentItem[0].getBoundingClientRect().width;
let slideIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Set initial position of slide carousel
setPositionByIndex();

commentGrid.addEventListener('mousedown', e => {
  isDragging = true;
  startPos = e.clientX;
  commentGrid.style.cursor = 'grabbing';
});

commentGrid.addEventListener('mousemove', e => {
  if (isDragging) {
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
    requestAnimationFrame(() => {
      commentGrid.style.transform = `translateX(${currentTranslate}px)`;
    });
  }
});

commentGrid.addEventListener('mouseup', () => {
  isDragging = false;
  const moveBy = currentTranslate - prevTranslate;

  if (moveBy < -slideWidth / 4 && slideIndex < commentItem.length - 1) {
    slideIndex++;
  } else if (moveBy > slideWidth / 4 && slideIndex > 0) {
    slideIndex--;
  }

  setPositionByIndex();
  commentGrid.style.cursor = 'grab';
});

commentGrid.addEventListener('mouseleave', () => {
  isDragging = false;
  setPositionByIndex();
  commentGrid.style.cursor = 'grab';
});

// Set the position of slide carousel by slide index
function setPositionByIndex() {
    currentTranslate = slideIndex * -slideWidth;
    prevTranslate = currentTranslate;
    requestAnimationFrame(() => {
    commentGrid.style.transform = `translateX(${currentTranslate}px)`;
    });

    // Hide Shanai Gough if slide index is not 0
    if (slideIndex !== 0) {
        commentItem[3].classList.remove('hide');
    } else {
        commentItem[3].classList.add('hide');
    }
}
