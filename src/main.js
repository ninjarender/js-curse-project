import {
  loadExerciseCards,
  updateBreadcrumbs,
} from './js/modules/exercises.js';
import {
  initExerciseModal,
  closeExerciseModal,
} from './js/modules/exercise-modal.js';
import {
  initRatingModal,
  closeRatingModal,
} from './js/modules/rating-modal.js';

// Завантаження цитати
fetch('https://your-energy.b.goit.study/api/quote')
  .then(response => response.json())
  .then(data => {
    const quoteTextElement = document.getElementById('js-exercises-quote-text');
    const quoteAuthorElement = document.getElementById(
      'js-exercises-quote-author'
    );

    if (quoteTextElement) {
      quoteTextElement.textContent = data.quote;
    }

    if (quoteAuthorElement) {
      quoteAuthorElement.textContent = data.author;
    }
  })
  .catch(error => {
    console.error('Error fetching quote:', error);
  });

// Початкове завантаження та ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізація модалок
  initExerciseModal();
  initRatingModal();

  // Початкове завантаження карток
  loadExerciseCards('Muscles', 1);

  // Закриття по Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeExerciseModal();
      closeRatingModal();
    }
  });

  // Обробка кліків на фільтри
  const filterButtons = document.querySelectorAll(
    '.exercises__content__header-filters-item'
  );

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Видаляємо активний клас з усіх кнопок
      filterButtons.forEach(btn =>
        btn.classList.remove('exercises__content__header-filters-item--active')
      );

      // Додаємо активний клас до натиснутої кнопки
      button.classList.add('exercises__content__header-filters-item--active');

      // Отримуємо значення фільтра
      const filter = button.getAttribute('data-filter');
      updateBreadcrumbs(null); // Оновлюємо breadcrumbs

      // Завантажуємо нові картки
      loadExerciseCards(filter, 1);
    });
  });
});
