// Змінна для зберігання ID вправи для рейтингу
let currentExerciseIdForRating = null;

// Функція для закриття модального вікна рейтингу
function closeRatingModal() {
  const modal = document.getElementById('js-rating-modal');
  if (!modal) return;

  modal.classList.remove('rating-modal--open');
  document.body.style.overflow = '';
  currentExerciseIdForRating = null;
}

// Функція для відкриття модального вікна рейтингу
export function openRatingModal(exerciseId) {
  const modal = document.getElementById('js-rating-modal');
  if (!modal) return;

  currentExerciseIdForRating = exerciseId;

  // Скидаємо форму
  const form = document.getElementById('js-rating-modal-form');
  const emailInput = document.getElementById('js-rating-modal-email');
  const commentTextarea = document.getElementById('js-rating-modal-comment');
  const ratingValue = document.getElementById('js-rating-modal-value');
  const stars = document.querySelectorAll('.rating-modal__star');

  if (form) form.reset();
  if (ratingValue) ratingValue.textContent = '0.0';

  // Скидаємо активні зірки
  stars.forEach(star => {
    star.classList.remove('rating-modal__star--active');
    const svg = star.querySelector('svg');
    if (svg) {
      const path = svg.querySelector('path');
      if (path) {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
      }
    }
  });

  // Відкриваємо модальне вікно
  modal.classList.add('rating-modal--open');
  document.body.style.overflow = 'hidden';
}

// Експорт функції закриття для використання в інших модулях
export { closeRatingModal };

// Ініціалізація event listeners для модального вікна рейтингу
export function initRatingModal() {
  // Обробники для модального вікна рейтингу
  const ratingModalCloseBtn = document.getElementById('js-rating-modal-close');
  const ratingModal = document.getElementById('js-rating-modal');
  const ratingModalOverlay = ratingModal?.querySelector(
    '.rating-modal__overlay'
  );

  if (ratingModalCloseBtn) {
    ratingModalCloseBtn.addEventListener('click', closeRatingModal);
  }

  if (ratingModalOverlay) {
    ratingModalOverlay.addEventListener('click', closeRatingModal);
  }

  // Обробка зірок рейтингу
  const ratingStars = document.querySelectorAll('.rating-modal__star');
  const ratingValue = document.getElementById('js-rating-modal-value');
  let selectedRating = 0;

  ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;

      if (ratingValue) {
        ratingValue.textContent = selectedRating.toFixed(1);
      }

      // Оновлюємо зірки
      ratingStars.forEach((s, i) => {
        if (i < selectedRating) {
          s.classList.add('rating-modal__star--active');
          const svg = s.querySelector('svg');
          if (svg) {
            const path = svg.querySelector('path');
            if (path) {
              path.setAttribute('fill', '#EEA10C');
              path.setAttribute('stroke', '#EEA10C');
            }
          }
        } else {
          s.classList.remove('rating-modal__star--active');
          const svg = s.querySelector('svg');
          if (svg) {
            const path = svg.querySelector('path');
            if (path) {
              path.setAttribute('fill', 'none');
              path.setAttribute('stroke', 'currentColor');
            }
          }
        }
      });
    });

    // Hover ефект
    star.addEventListener('mouseenter', () => {
      const hoverRating = index + 1;
      ratingStars.forEach((s, i) => {
        if (
          i < hoverRating &&
          !s.classList.contains('rating-modal__star--active')
        ) {
          s.style.color = 'rgba(255, 255, 255, 0.6)';
        }
      });
    });

    star.addEventListener('mouseleave', () => {
      ratingStars.forEach((s, i) => {
        if (!s.classList.contains('rating-modal__star--active')) {
          s.style.color = 'rgba(255, 255, 255, 0.3)';
        }
      });
    });
  });

  // Обробка форми рейтингу
  const ratingForm = document.getElementById('js-rating-modal-form');
  if (ratingForm) {
    ratingForm.addEventListener('submit', e => {
      e.preventDefault();

      const ratingStars = document.querySelectorAll('.rating-modal__star');
      const ratingValue = document.getElementById('js-rating-modal-value');
      let selectedRating = 0;

      // Знаходимо вибраний рейтинг
      ratingStars.forEach((star, index) => {
        if (star.classList.contains('rating-modal__star--active')) {
          selectedRating = Math.max(selectedRating, index + 1);
        }
      });

      if (selectedRating === 0) {
        alert('Please select a rating');
        return;
      }

      const emailInput = document.getElementById('js-rating-modal-email');
      const commentTextarea = document.getElementById(
        'js-rating-modal-comment'
      );

      const email = emailInput?.value.trim() || '';
      const review = commentTextarea?.value.trim() || '';

      if (!email) {
        alert('Please enter your email');
        return;
      }

      // Відправка рейтингу на сервер
      if (currentExerciseIdForRating) {
        fetch(
          `https://your-energy.b.goit.study/api/exercises/${currentExerciseIdForRating}/rating`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rate: selectedRating,
              email,
              review,
            }),
          }
        )
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to submit rating');
            }
            return response.json();
          })
          .then(data => {
            console.log('Rating submitted:', data);
            alert('Thank you for your rating!');
            closeRatingModal();
          })
          .catch(error => {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
          });
      }
    });
  }
}

