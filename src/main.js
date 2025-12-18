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

// Функція для створення HTML картки категорії
function createExerciseCard(exercise) {
  return `
    <div class="exercises__content__main__cards-item" data-category-name="${exercise.name}">
      <div class="exercises__content__main__cards-item-image">
        <img src="${exercise.imgURL}" alt="${exercise.name} exercise" />
        <div class="exercises__content__main__cards-item-overlay">
          <div class="exercises__content__main__cards-item-overlay-name">${exercise.name}</div>
          <div class="exercises__content__main__cards-item-overlay-category">${exercise.filter}</div>
        </div>
      </div>
    </div>
  `;
}

// Функція для створення HTML картки вправи
function createExerciseItemCard(exercise) {
  const rating = exercise.rating || 0;
  const burnedCalories = exercise.burnedCalories || 0;
  const time = exercise.time || 0;
  const bodyPart = exercise.bodyPart || '';
  const target = exercise.target || '';
  const exerciseId = exercise._id || '';

  return `
    <div class="exercises__content__main__cards-item exercises__content__main__cards-item--exercise" data-exercise-id="${exerciseId}">
      <div class="exercises__content__main__cards-item-header">
        <button class="exercises__content__main__cards-item-workout-btn">WORKOUT</button>
        <div class="exercises__content__main__cards-item-rating">
          <span class="exercises__content__main__cards-item-rating-value">${rating.toFixed(
            1
          )}</span>
          <svg class="exercises__content__main__cards-item-rating-star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0L11.0206 6.21885L17.5595 6.21885L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885L6.97937 6.21885L9 0Z" fill="#EEA10C"/>
          </svg>
        </div>
        <button class="exercises__content__main__cards-item-start-btn">
          Start
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="exercises__content__main__cards-item-body">
        <div class="exercises__content__main__cards-item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="exercises__content__main__cards-item-title">${
          exercise.name
        }</h3>
      </div>
      <div class="exercises__content__main__cards-item-footer">
        <div class="exercises__content__main__cards-item-info">
          <span class="exercises__content__main__cards-item-info-label">Burned calories:</span>
          <span class="exercises__content__main__cards-item-info-value">${burnedCalories}</span>
          <span class="exercises__content__main__cards-item-info-label">/ ${time} min</span>
        </div>
        <div class="exercises__content__main__cards-item-info">
          <span class="exercises__content__main__cards-item-info-label">Body part:</span>
          <span class="exercises__content__main__cards-item-info-value">${bodyPart}</span>
        </div>
        <div class="exercises__content__main__cards-item-info">
          <span class="exercises__content__main__cards-item-info-label">Target:</span>
          <span class="exercises__content__main__cards-item-info-value">${target}</span>
        </div>
      </div>
    </div>
  `;
}

// Функція для рендерингу карток категорій
function renderExerciseCards(exercises) {
  const cardsContainer = document.querySelector(
    '.exercises__content__main__cards'
  );

  if (!cardsContainer) {
    console.warn('Cards container not found');
    return;
  }

  // Видаляємо клас для карток вправ (якщо був)
  cardsContainer.classList.remove('exercises__content__main__cards--exercises');

  // Очищаємо контейнер
  cardsContainer.innerHTML = '';

  // Рендеримо кожну картку
  exercises.forEach(exercise => {
    const cardHTML = createExerciseCard(exercise);
    cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Додаємо обробники кліків на картки категорій
  const categoryCards = cardsContainer.querySelectorAll(
    '.exercises__content__main__cards-item'
  );
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryName = card.getAttribute('data-category-name');
      if (categoryName) {
        loadExercisesByCategory(categoryName);
      }
    });
  });
}

// Функція для рендерингу карток вправ
function renderExerciseItemCards(exercises) {
  const cardsContainer = document.querySelector(
    '.exercises__content__main__cards'
  );

  if (!cardsContainer) {
    console.warn('Cards container not found');
    return;
  }

  // Додаємо клас для карток вправ
  cardsContainer.classList.add('exercises__content__main__cards--exercises');

  // Очищаємо контейнер
  cardsContainer.innerHTML = '';

  // Рендеримо кожну картку
  exercises.forEach(exercise => {
    const cardHTML = createExerciseItemCard(exercise);
    cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Додаємо обробники кліків на картки вправ для відкриття модального вікна
  const exerciseCards = cardsContainer.querySelectorAll(
    '.exercises__content__main__cards-item--exercise'
  );
  exerciseCards.forEach(card => {
    card.addEventListener('click', () => {
      const exerciseId = card.getAttribute('data-exercise-id');
      if (exerciseId) {
        openExerciseModal(exerciseId);
      }
    });
  });
}

// Глобальні змінні для фільтра та сторінки
let currentFilter = 'Muscles';
let currentPage = 1;
let currentCategory = null;

// Функція для оновлення breadcrumbs
function updateBreadcrumbs(categoryName = null) {
  const breadcrumbsContainer = document.getElementById(
    'js-exercises-breadcrumbs'
  );

  if (!breadcrumbsContainer) {
    return;
  }

  breadcrumbsContainer.innerHTML = '';

  // Завжди додаємо "Exercises"
  const exercisesBtn = document.createElement('button');
  exercisesBtn.className = 'exercises__content__header-breadcrumbs-item';
  exercisesBtn.textContent = 'Exercises';
  exercisesBtn.setAttribute('data-breadcrumb', 'exercises');

  if (!categoryName) {
    exercisesBtn.classList.add(
      'exercises__content__header-breadcrumbs-item--active'
    );
  }

  exercisesBtn.addEventListener('click', () => {
    currentCategory = null;
    currentPage = 1;
    loadExerciseCards(currentFilter, currentPage);
  });

  breadcrumbsContainer.appendChild(exercisesBtn);

  // Якщо є категорія, додаємо її
  if (categoryName) {
    const separator = document.createElement('span');
    separator.className = 'exercises__content__header-breadcrumbs-separator';
    separator.textContent = '/';
    breadcrumbsContainer.appendChild(separator);

    const categoryBtn = document.createElement('button');
    categoryBtn.className =
      'exercises__content__header-breadcrumbs-item exercises__content__header-breadcrumbs-item--active';
    categoryBtn.textContent = categoryName;
    breadcrumbsContainer.appendChild(categoryBtn);
  }
}

// Функція для рендерингу пагінації
function renderPagination(totalPages, page = 1) {
  const paginationContainer = document.querySelector(
    '.exercises__content__pagination'
  );

  if (!paginationContainer) {
    console.warn('Pagination container not found');
    return;
  }

  // Очищаємо контейнер
  paginationContainer.innerHTML = '';

  // Створюємо кнопки для кожної сторінки
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = 'exercises__content__pagination-page';
    pageButton.textContent = i;

    if (i === page) {
      pageButton.classList.add('exercises__content__pagination-page--active');
    }

    // Додаємо обробник кліку
    pageButton.addEventListener('click', () => {
      currentPage = i;
      if (currentCategory) {
        loadExercisesByCategory(currentCategory, i);
      } else {
        loadExerciseCards(currentFilter, i);
      }
    });

    paginationContainer.appendChild(pageButton);
  }
}

// Функція для завантаження карток категорій
function loadExerciseCards(filter, page = 1) {
  // Кодуємо параметри для безпечного передавання в URL
  const encodedFilter = encodeURIComponent(filter);
  const url = `https://your-energy.b.goit.study/api/filters?filter=${encodedFilter}&page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Припускаємо, що API повертає масив exercises або об'єкт з полем results/exercises
      const exercises = data.results || data.exercises || data || [];

      // Отримуємо загальну кількість сторінок
      const totalPages =
        data.totalPages || data.total_pages || data.pageCount || 1;

      if (Array.isArray(exercises) && exercises.length > 0) {
        currentCategory = null; // Скидаємо поточну категорію
        updateBreadcrumbs(null);
        renderExerciseCards(exercises);
        renderPagination(totalPages, page);
      } else {
        console.warn('No exercises data received');
        updateBreadcrumbs(null);
        renderPagination(1, 1);
      }
    })
    .catch(error => {
      console.error('Error fetching filters:', error);
    });
}

// Функція для завантаження вправ за категорією
function loadExercisesByCategory(categoryName, page = 1) {
  // Визначаємо параметр залежно від типу фільтра
  let paramName = '';
  if (currentFilter === 'Muscles') {
    paramName = 'muscles';
  } else if (currentFilter === 'Body parts') {
    paramName = 'bodyPart';
  } else if (currentFilter === 'Equipment') {
    paramName = 'equipment';
  }

  // Кодуємо параметри для безпечного передавання в URL
  const encodedCategory = encodeURIComponent(categoryName);
  const url = `https://your-energy.b.goit.study/api/exercises?${paramName}=${encodedCategory}&page=${page}&limit=10`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Отримуємо масив вправ
      const exercises = data.results || [];

      // Отримуємо загальну кількість сторінок
      const totalPages = data.totalPages || 1;

      if (Array.isArray(exercises) && exercises.length > 0) {
        currentCategory = categoryName; // Зберігаємо поточну категорію
        updateBreadcrumbs(categoryName);
        renderExerciseItemCards(exercises);
        renderPagination(totalPages, page);
      } else {
        console.warn('No exercises data received');
        updateBreadcrumbs(categoryName);
        const cardsContainer = document.querySelector(
          '.exercises__content__main__cards'
        );
        if (cardsContainer) {
          cardsContainer.innerHTML = '';
        }
        renderPagination(1, 1);
      }
    })
    .catch(error => {
      console.error('Error fetching exercises:', error);
    });
}

// Функція для відкриття модального вікна з даними вправи
function openExerciseModal(exerciseId) {
  const modal = document.getElementById('js-exercise-modal');
  if (!modal) return;

  // Зберігаємо ID вправи для рейтингу
  currentExerciseIdForRating = exerciseId;

  // Показуємо модальне вікно з індикатором завантаження
  modal.classList.add('exercise-modal--open');
  document.body.style.overflow = 'hidden';

  // Отримуємо елементи для заповнення
  const image = document.getElementById('js-exercise-modal-image');
  const title = document.getElementById('js-exercise-modal-title');
  const ratingValue = document.querySelector('.exercise-modal__rating-value');
  const ratingStars = document.querySelector('.exercise-modal__rating-stars');
  const target = document.getElementById('js-exercise-modal-target');
  const bodyPart = document.getElementById('js-exercise-modal-body-part');
  const equipment = document.getElementById('js-exercise-modal-equipment');
  const popular = document.getElementById('js-exercise-modal-popular');
  const calories = document.getElementById('js-exercise-modal-calories');
  const time = document.getElementById('js-exercise-modal-time');
  const description = document.getElementById('js-exercise-modal-description');

  // Очищаємо попередні дані
  if (title) title.textContent = 'Loading...';
  if (ratingValue) ratingValue.textContent = '0.0';
  if (ratingStars) ratingStars.innerHTML = '';
  if (target) target.textContent = '';
  if (bodyPart) bodyPart.textContent = '';
  if (equipment) equipment.textContent = '';
  if (popular) popular.textContent = '0';
  if (calories) calories.textContent = '0';
  if (time) time.textContent = '/0 min';
  if (description) description.textContent = '';
  if (image) image.src = '';

  // Завантажуємо детальну інформацію про вправу
  fetch(`https://your-energy.b.goit.study/api/exercises/${exerciseId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch exercise details');
      }
      return response.json();
    })
    .then(exercise => {
      // Заповнюємо дані модального вікна
      if (image) image.src = exercise.gifUrl || '';
      if (title) title.textContent = exercise.name || '';
      if (target) target.textContent = exercise.target || '';
      if (bodyPart) bodyPart.textContent = exercise.bodyPart || '';
      if (equipment) equipment.textContent = exercise.equipment || '';
      if (popular) popular.textContent = exercise.popularity || 0;
      if (calories) calories.textContent = exercise.burnedCalories || 0;
      if (time) time.textContent = `/${exercise.time || 0} min`;
      if (description) description.textContent = exercise.description || '';

      // Оновлюємо рейтинг
      if (ratingValue) {
        ratingValue.textContent = (exercise.rating || 0).toFixed(1);
      }

      if (ratingStars) {
        ratingStars.innerHTML = '';
        const rating = Math.round(exercise.rating || 0);
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('svg');
          star.className = 'exercise-modal__rating-star';
          star.setAttribute('width', '18');
          star.setAttribute('height', '18');
          star.setAttribute('viewBox', '0 0 18 18');
          star.setAttribute('fill', 'none');
          star.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

          if (i < rating) {
            star.classList.add('exercise-modal__rating-star--filled');
            star.innerHTML =
              '<path d="M9 0L11.0206 6.21885L17.5595 6.21885L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885L6.97937 6.21885L9 0Z" fill="#EEA10C"/>';
          } else {
            star.classList.add('exercise-modal__rating-star--empty');
            star.innerHTML =
              '<path d="M9 0L11.0206 6.21885L17.5595 6.21885L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885L6.97937 6.21885L9 0Z" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>';
          }
          ratingStars.appendChild(star);
        }
      }

      // Підключення кнопки "Give a rating"
      const ratingBtn = document.getElementById('js-exercise-modal-rating-btn');
      if (ratingBtn) {
        // Видаляємо попередні обробники
        const newRatingBtn = ratingBtn.cloneNode(true);
        ratingBtn.parentNode.replaceChild(newRatingBtn, ratingBtn);

        newRatingBtn.addEventListener('click', () => {
          closeExerciseModal();
          openRatingModal(exerciseId);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching exercise details:', error);
      if (title) title.textContent = 'Error loading exercise';
      if (description)
        description.textContent =
          'Failed to load exercise details. Please try again later.';
    });
}

// Функція для закриття модального вікна
function closeExerciseModal() {
  const modal = document.getElementById('js-exercise-modal');
  if (!modal) return;

  modal.classList.remove('exercise-modal--open');
  document.body.style.overflow = '';
}

// Глобальна змінна для зберігання ID вправи для рейтингу
let currentExerciseIdForRating = null;

// Функція для відкриття модального вікна рейтингу
function openRatingModal(exerciseId) {
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

// Функція для закриття модального вікна рейтингу
function closeRatingModal() {
  const modal = document.getElementById('js-rating-modal');
  if (!modal) return;

  modal.classList.remove('rating-modal--open');
  document.body.style.overflow = '';
  currentExerciseIdForRating = null;
}

// Початкове завантаження та ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  // Початкове завантаження карток
  loadExerciseCards(currentFilter, currentPage);

  // Обробники для модального вікна
  const modalCloseBtn = document.getElementById('js-exercise-modal-close');
  const modal = document.getElementById('js-exercise-modal');
  const modalOverlay = modal?.querySelector('.exercise-modal__overlay');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeExerciseModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeExerciseModal);
  }

  // Закриття по Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeExerciseModal();
      closeRatingModal();
    }
  });

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
      currentFilter = filter;
      currentPage = 1; // Скидаємо на першу сторінку при зміні фільтра
      currentCategory = null; // Скидаємо поточну категорію при зміні фільтра
      updateBreadcrumbs(null); // Оновлюємо breadcrumbs

      // Завантажуємо нові картки
      loadExerciseCards(filter, currentPage);
    });
  });
});
