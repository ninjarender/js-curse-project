import { switchToHome, switchToFavorites } from './exercises.js';

// Current active page
let currentPage = 'home';

// Switch page and update UI
export function switchPage(page) {
  if (currentPage === page) return;

  currentPage = page;

  // Update nav links active state
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.classList.add('header__nav-link--active');
    } else {
      link.classList.remove('header__nav-link--active');
    }
  });

  // Call corresponding function to render content
  if (page === 'home') {
    switchToHome();
  } else if (page === 'favorites') {
    switchToFavorites();
  }
}

// Initialize header event listeners
export function initHeader() {
  const navLinks = document.querySelectorAll('.header__nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) {
        switchPage(page);
      }
    });
  });
}

// Get current page
export function getCurrentPage() {
  return currentPage;
}

