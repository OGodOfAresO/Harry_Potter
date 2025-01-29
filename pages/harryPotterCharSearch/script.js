async function fetchCharacters() {
    try {
      const response = await fetch("https://hp-api.onrender.com/api/characters/");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      return [];
    }
  }
  
  // Render characters in cards
  function renderCharacters(characters) {
    const container = document.getElementById("characterContainer");
    container.innerHTML = ""; // Clear previous results
  
    characters.forEach((char) => {
      const charCard = document.createElement("div");
      charCard.className = "card";
      charCard.innerHTML = `
        <h2>${char.name}</h2>
        <p><strong>House:</strong> ${char.house || "Unknown"}</p>
        <p><strong>Species:</strong> ${char.species || "Unknown"}</p>
        <p><strong>Gender:</strong> ${char.gender || "Unknown"}</p>
        <img src="${char.image}" alt="${char.name}" />
      `;
      container.appendChild(charCard);
    });
  }
  
  function setupSearch(characters) {
    const searchInput = document.getElementById("searchInput");
  
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase();
  
      // Filter characters and hide/show cards accordingly
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        const characterName = card.querySelector("h2").innerText.toLowerCase(); // Get the name from the card's heading
        if (characterName.includes(query)) {
          card.classList.remove("hidden"); // Show matching cards
        } else {
          card.classList.add("hidden"); // Hide non-matching cards
        }
      });
    });
  }
  
  async function init() {
    const characters = await fetchCharacters();
    renderCharacters(characters); // Display all characters initially
    setupSearch(characters); // Setup the search input
  }
  
  init();
  