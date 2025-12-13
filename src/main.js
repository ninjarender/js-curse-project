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

// Функція для створення HTML картки
function createExerciseCard(exercise) {
  return `
    <div class="exercises__content__main__cards-item">
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

// Функція для рендерингу карток
function renderExerciseCards(exercises) {
  const cardsContainer = document.querySelector(
    '.exercises__content__main__cards'
  );

  if (!cardsContainer) {
    console.warn('Cards container not found');
    return;
  }

  // Очищаємо контейнер
  cardsContainer.innerHTML = '';

  // Рендеримо кожну картку
  exercises.forEach(exercise => {
    const cardHTML = createExerciseCard(exercise);
    cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// Глобальні змінні для фільтра та сторінки
let currentFilter = 'Muscles';
let currentPage = 1;

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
      loadExerciseCards(currentFilter, i);
    });

    paginationContainer.appendChild(pageButton);
  }
}

// Функція для завантаження карток
function loadExerciseCards(filter, page = 1) {
  // Кодуємо параметри для безпечного передавання в URL
  const encodedFilter = encodeURIComponent(filter);
  const url = `https://your-energy.b.goit.study/api/filters?filter=${encodedFilter}&page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);

      // Припускаємо, що API повертає масив exercises або об'єкт з полем results/exercises
      const exercises = data.results || data.exercises || data || [];

      // Отримуємо загальну кількість сторінок
      const totalPages =
        data.totalPages || data.total_pages || data.pageCount || 1;

      if (Array.isArray(exercises) && exercises.length > 0) {
        renderExerciseCards(exercises);
        renderPagination(totalPages, page);
      } else {
        console.warn('No exercises data received');
        renderPagination(1, 1);
      }
    })
    .catch(error => {
      console.error('Error fetching filters:', error);
    });
}

// Початкове завантаження та ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  // Початкове завантаження карток
  loadExerciseCards(currentFilter, currentPage);

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

      // Завантажуємо нові картки
      loadExerciseCards(filter, currentPage);
    });
  });
});
