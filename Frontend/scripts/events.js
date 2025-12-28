


    
    // ===== FETCH EVENTS & SERMONS =====
    async function fetchEvents() {
        const container = document.getElementById('events-container');
        if (!container) return;

        container.innerHTML = `<div class="loading-events"><i class="fas fa-spinner fa-spin"></i><p>Loading upcoming events...</p></div>`;

        try {
            const res = await fetch('http://localhost:5000/api/events');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const events = await res.json();
            displayEvents(events);
        } catch (err) {
            console.error('Error fetching events:', err);
            showEventsError('Unable to load events at this time. Please try again.');
        }
    }

    function displayEvents(events) {
        const container = document.getElementById('events-container');
        container.innerHTML = '';

        if (!events || events.length === 0) {
            container.innerHTML = '<p class="no-events">No upcoming events scheduled.</p>';
            return;
        }

        events.filter(e => new Date(e.date) >= new Date())
            .sort((a,b)=> new Date(a.date) - new Date(b.date))
            .slice(0,5)
            .forEach(e => container.appendChild(createEventItem(e, new Date(e.date))));
    }

    function createEventItem(e, date) {
        const div = document.createElement('div');
        div.className = 'event-item';
        div.innerHTML = `
            <div class="event-date"><span>${date.toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</span><strong>${date.getDate()}</strong></div>
            <div class="event-details">
                <h4>${e.title || 'Church Event'}</h4>
                <p class="event-time"><i class="far fa-clock"></i> ${date.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})}
                ${e.location? `<span class="event-location"><i class="fas fa-map-marker-alt"></i> ${e.location}</span>` : ''}</p>
                ${e.description? `<p class="event-description">${e.description}</p>` : ''}
            </div>
        `;
        return div;
    }

    function showEventsError(msg) {
        const c = document.getElementById('events-container');
        if (!c) return;
        c.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i><p>${msg}</p><button onclick="fetchEvents()" class="btn-retry">Try Again</button></div>`;
    }


// EVENT REGISTRATION FORM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#register form");
  const messageBox = document.getElementById("registration-message");

  if (!form) {
    console.error("Registration form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('input[placeholder="Your Full Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Your Email Address"]').value.trim();
    const phone = form.querySelector('input[placeholder="Your Phone Number"]').value.trim();

    const registrationData = { fullName, email, phone };

    try {
      const response = await fetch("http://localhost:5000/api/eventsRegistration/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!result.success) {
        showMessage(result.error || "Registration failed.", "error");
        return;
      }

      showMessage("Registration successful!", "success");
      form.reset();

    } catch (err) {
      console.error("Error submitting form:", err);
      showMessage("Failed to submit. Please try again.", "error");
    }
  });

  // ————————————————————————————————
  // FUNCTION TO SHOW AND AUTO-HIDE MESSAGE
  // ————————————————————————————————
  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.className = `form-message ${type}`;
    messageBox.style.display = "block";

    // Auto-hide after 3 seconds
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 2000);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".sermon-grid");

  if (!container) return;

  try {
    const res = await fetch("http://localhost:5000/api/speakers");
    const data = await res.json();

    if (!data.success) {
      container.innerHTML = "<p>No speakers available at the moment for Upcoming Event.</p>";
      return;
    }

    const speakers = data.speakers;

    // Clear existing content
    container.innerHTML = "";

    speakers.forEach(speaker => {
      const card = document.createElement("div");
      card.classList.add("sermon-card");

      card.innerHTML = `
        <div class="sermon-thumbnail">
          <img src="${speaker.image}" alt="${speaker.name}">
        </div>
        <div class="sermon-info">
          <h4>${speaker.name}</h4>
          <p>${speaker.title}</p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching speakers:", err);
    container.innerHTML = "<p>Failed to load speakers.</p>";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const heroSection = document.getElementById("hero");

  try {
    const res = await fetch("http://localhost:5000/api/hero");
    const data = await res.json();

    if (!data.success || !data.hero) return;

    const hero = data.hero;

    heroSection.style.backgroundImage = `url(${hero.backgroundImage})`;
    heroSection.querySelector(".hero-scripture").textContent = hero.scripture || "";
    heroSection.querySelector(".hero-title").textContent = hero.title;
    heroSection.querySelector(".hero-subtitle").textContent = hero.subtitle;
    heroSection.querySelector(".btn-primary").textContent = hero.registerBtnText || "Register Now";
    heroSection.querySelector(".btn-primary").href = hero.registerBtnLink || "#register";
    heroSection.querySelector(".btn-secondary").textContent = hero.learnBtnText || "Learn More";
    heroSection.querySelector(".btn-secondary").href = hero.learnBtnLink || "#details";

  } catch (err) {
    console.log("Error loading hero:", err);
  }
});

