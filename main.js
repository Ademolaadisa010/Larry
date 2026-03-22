// ============================================================
// LARRY AUTOS — main.js
// Shared logic across all pages
// ============================================================

// ----------- NAVBAR -----------
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ----------- HERO CAR ANIMATION -----------
function initHeroAnimation() {
  const track = document.getElementById('heroTrack');
  if (!track) return;

  const cars = [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=80',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80',
  ];

  // Duplicate for infinite loop
  const all = [...cars, ...cars];
  track.innerHTML = all.map(src => `
    <div class="hero-car-slide">
      <img src="${src}" alt="Car" loading="lazy"/>
      <div class="slide-shimmer"></div>
    </div>
  `).join('');
}

initHeroAnimation();

// ----------- BUILD CAR CARD -----------
function buildCarCard(car) {
  const waMsg = encodeURIComponent(`Hello Larry Autos, I'm interested in the ${car.name} ${car.year} listed on your website.`);
  return `
    <div class="car-card" data-id="${car.id}">
      <a href="car-details.html?id=${car.id}" class="card-img-link">
        <div class="card-img-wrap">
          <img src="${car.image}" alt="${car.name} ${car.year}" loading="lazy" />
          <div class="card-condition ${car.condition === 'Tokunbo' ? 'cond-tokunbo' : 'cond-used'}">${car.condition}</div>
          ${!car.available ? '<div class="card-sold">SOLD</div>' : ''}
          <div class="card-overlay">
            <span>View Details</span>
          </div>
        </div>
      </a>
      <div class="card-body">
        <div class="card-top">
          <h3 class="card-name">${car.name} <span>${car.year}</span></h3>
          <div class="card-price">₦${car.price.toLocaleString()}</div>
        </div>
        <div class="card-specs">
          <span>⚙️ ${car.transmission}</span>
          <span>⛽ ${car.fuel}</span>
          <span>🏎️ ${car.mileage}</span>
        </div>
        <div class="card-actions">
          <a href="car-details.html?id=${car.id}" class="btn-card-details">View Details</a>
          <a href="https://wa.me/2348012345678?text=${waMsg}" target="_blank" class="btn-card-wa" title="Chat on WhatsApp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

// ----------- SCROLL REVEAL -----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeReveal() {
  document.querySelectorAll('.car-card, .why-card, .about-grid, .contact-grid, .section-head').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// Run after DOM mutations (cards loaded dynamically)
const mutationObserver = new MutationObserver(observeReveal);
mutationObserver.observe(document.body, { childList: true, subtree: true });
observeReveal();