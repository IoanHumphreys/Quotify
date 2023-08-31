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

  // Generate and display tags
  const tagsContainer = document.getElementById("tags-container");
  tagsContainer.innerHTML = ''; // Clear existing tags

  const tags = generateTags(quote); // Generate tags based on quote
  tags.forEach(tag => {
      const tagElement = document.createElement("span");
      tagElement.className = "tag-text";
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
  });

  const quoteDisplay = document.getElementById("quote-display");
  quoteDisplay.addEventListener("click", copyToClipboard);

  if (autoGenerateEnabled) {
      setTimeout(generateQuote, 5000); // Auto-generate every 5 seconds
  }
}

function generateTags(quote) {
  // Split the quote into words
  const words = quote.split(/\s+/);

  // Define keywords for tags
  const keywords = [
    "motivational", "inspiring", "life", "happiness", "success",
    "positivity", "dreams", "goals", "journey", "passion", "hope", "strength",
    "courage", "perseverance", "believe", "change", "creativity", "confidence",
    "mindfulness", "reflection", "gratitude", "kindness", "love", "friendship",
    "ambition", "growth", "opportunity", "challenge", "achievement", "legacy",
    "empowerment", "innovation", "balance", "faith", "resilience", "selfcare",
    "possibility", "optimism", "freedom", "honesty", "selflove", "compassion",
    "adventure", "curiosity", "simplicity", "imagination", "patience",
    "leadership", "determination", "self-discovery", "persistence", "joy", "grit",
    "mindset", "focus", "transformation", "fulfillment", "selfimprovement", "learning",
    "integrity", "growthmindset", "empathy", "wellness", "goalsetting", "acceptance",
    "challenge", "reflection", "freedom", "simplicity", "faith",
    "curiosity", "persistence", "joy", "grit", "mindset", "world", "change",
    "proud", "universe", "improving", "soul", "intuition", "detour", "sacrifice", "valuable",
    "spiritual", "grace", "optimism", "kindness", "inspiration", "innovation", "creativity", "leadership", "focus",
    "curiosity", "ambition", "resilience", "challenge", "adventure", "opportunity", "growth",
    "balance", "wisdom", "reflection", "perseverance", "imagination", "selfcare", "mindfulness",
    "gratitude", "fulfillment", "success", "determination", "positivity", "integrity", "acceptance",
    "empathy", "compassion", "patience", "learning", "achievement", "courage",
    "freedom", "honesty", "friendship", "legacy", "possibility", "persistence",
    "confidence", "selflove", "belief", "focus", "hope", "happiness",
    "soul", "purpose", "spirit", "perseverance", "strength", "strive", "transform", "thrive",
    "authenticity", "clarity", "adapt", "innovate", "empowerment", "evolve", "mindset", "change",
    "fulfillment", "connection", "mindfulness", "wellness", "vitality", "explore", "nurture",
    "radiant", "serenity", "equanimity", "transcend", "inspire", "illuminate", "potential",
    "flourish", "enrich", "blossom", "awaken", "renew", "wholeness", "intuition", "serendipity",
    "manifest", "abundance", "maintain", "forgiven", "forgotten", "forgiveness", "friend", "accomplish",
    "power", "unique", "prosper", "joyful", "vibrant", "energize", "breathe", "calm",
    "cherish", "celebrate", "god", "beliefs", "loyal", "knowledge", "loving", "enlightenment", "gain",
    "counts", "powerful", "influence", "great", "anticipation", "challenges", "challenge", "victory", "heart", "adversity",
    "wiser", "wise", "knowledge", "understand", "understanding", "enemy"
  ];

  const lowercaseKeywords = keywords.map(keyword => keyword.toLowerCase());

  const tags = words.filter(word => lowercaseKeywords.includes(word.toLowerCase()));

  return [...new Set(tags.map(tag => tag.toLowerCase()))];
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
  const quoteText = document.getElementById("quote-display").textContent;
  const authorText = document.getElementById("quote-author").textContent;
  const fullText = `${quoteText} - ${authorText}`; // Concatenate quote and author

  navigator.clipboard.writeText(fullText).then(() => {
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