import {
  loadExerciseCards,
  updateBreadcrumbs,
  initSearch,
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

// Функція для відправки запиту на оформлення підписки
async function subscribeToNewsletter(email) {
  try {
    const response = await fetch(
      'https://your-energy.b.goit.study/api/subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error: error.message };
  }
}

// Початкове завантаження та ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізація модалок
  initExerciseModal();
  initRatingModal();

  // Ініціалізація пошуку
  initSearch();

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

  // Обробка форми підписки
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', async e => {
      e.preventDefault();

      const emailInput = subscribeForm.querySelector(
        '.footer__subscribe-form-input'
      );
      const email = emailInput?.value.trim() || '';

      if (!email) {
        alert('Please enter your email address');
        return;
      }

      const result = await subscribeToNewsletter(email);

      if (result.success) {
        alert(result.data.message);
        subscribeForm.reset();
      } else {
        alert('Failed to subscribe. Please try again later.');
      }
    });
  }
});
