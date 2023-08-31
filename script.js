let autoGenerateEnabled = false;

// Function to fetch quotes from the JSON file
async function fetchQuotes() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return [{
      quote: data.content,
      author: data.author
    }];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

// Function to generate a random quote
async function generateQuote() {
  const quotes = await fetchQuotes();
  if (quotes.length === 0) {
    document.getElementById("quote-display").textContent = 'No quotes available.';
    return;
  }
  const quote = quotes[0].quote;
  const author = quotes[0].author;
  document.getElementById("quote-display").textContent = quote;
  document.getElementById("quote-author").textContent = author;

  const quoteDisplay = document.getElementById("quote-display");
  quoteDisplay.addEventListener("click", copyToClipboard);

  if (autoGenerateEnabled) {
    setTimeout(generateQuote, 5000); // Auto-generate every 5 seconds
  }
}

const autoButton = document.getElementById("auto-button");
autoButton.addEventListener("click", () => {
  autoGenerateEnabled = !autoGenerateEnabled;
  if (autoGenerateEnabled) {
    autoButton.innerHTML = '<i class="fas fa-arrows-rotate fa-fade"></i> Stop Auto Generate';
    generateQuote(); // Start auto-generation immediately
  } else {
    autoButton.innerHTML = '<i class="fas fa-arrows-rotate"></i>Auto Generate';
  }
});

function copyToClipboard() {
  const quoteText = document.getElementById("quote-display").innerText;

  navigator.clipboard.writeText(quoteText).then(() => {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerText = "Copied to clipboard";

    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.remove();
    }, 3000);
  });
}

window.addEventListener('load', generateQuote);