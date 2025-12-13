fetch('https://your-energy.b.goit.study/api/quote')
  .then(response => response.json())
  .then(data => {
    console.log(data);
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
