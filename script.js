// script.js – modern interactions

// ---------- TYPEWRITER EFFECT (nav__logo) ----------
const typewriterEl = document.getElementById('typewriter');
const phrases = ['Shovon Debnath', 'WE DESIGN.', 'WE CREATE.', 'WE CODE.', 'WE BUILD.', 'WE INNOVATE.'];
let pIdx = 0, cIdx = 0, deleting = false;

const TYPE_SPEED   = 90;
const DELETE_SPEED  = 45;
const PAUSE_AFTER   = 1400;
const PAUSE_BEFORE  = 300;

let lastTime = 0;
let pauseUntil = 0;

function typeLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;

    if (timestamp < pauseUntil) {
        requestAnimationFrame(typeLoop);
        return;
    }

    const delay = deleting ? DELETE_SPEED : TYPE_SPEED;


    if (timestamp - lastTime >= delay) {
        lastTime = timestamp;
        const phrase = phrases[pIdx];

        if (!deleting) {
            cIdx++;
            typewriterEl.textContent = phrase.slice(0, cIdx);
            if (cIdx === phrase.length) {
                deleting = true;
                pauseUntil = timestamp + (phrase === 'Shovon Debnath' ? 3800 : PAUSE_AFTER);
            }
        } else {
            cIdx--;
            typewriterEl.textContent = phrase.slice(0, cIdx);
            if (cIdx === 0) {
                deleting = false;
                pIdx = (pIdx + 1) % phrases.length;
                pauseUntil = timestamp + PAUSE_BEFORE;
            }
        }
    }

    requestAnimationFrame(typeLoop);
}
requestAnimationFrame(typeLoop);

// ---------- MOBILE MENU TOGGLE ----------
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ---------- ACTIVE LINK HIGHLIGHT ON SCROLL ----------
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ---------- SCROLL REVEAL ANIMATIONS ----------
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 200,
    reset: false      // smoother, no constant replay
});

// home
sr.reveal('.home__data', { origin: 'left' });
sr.reveal('.resume-link-wrap', { origin: 'left', delay: 300 });
sr.reveal('.home__img', { origin: 'right', delay: 400 });
sr.reveal('.home__social', { origin: 'bottom', delay: 600 });

// about
sr.reveal('.about__img', { origin: 'left' });
sr.reveal('.about__content', { origin: 'right', delay: 300 });

// projects, certs, achievements
sr.reveal('.project__card', { interval: 200 });
sr.reveal('.cert__card', { interval: 180 });
sr.reveal('.ach__card', { interval: 150 });

// contact & footer
sr.reveal('.contact__form', { origin: 'bottom' });
sr.reveal('.footer', { origin: 'bottom', distance: '40px' });

// ---------- FORM SUBMIT handled by EmailJS below ----------

// ---------- SMOOTH SCROLL FOR ALL INTERNAL LINKS ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* === HOME IMG WRAPPER === */
const homeImg = document.querySelector('.home__blob-img');
  if (homeImg) {
    const wrapper = document.createElement('div');
    wrapper.className = 'home__img-wrapper';

    const badge = document.createElement('div');
    badge.className = 'home__badge';
    badge.innerHTML = '<div class="home__badge-text">✨ Available for Hire</div>';

    homeImg.parentNode.insertBefore(wrapper, homeImg);
    wrapper.appendChild(homeImg);
    wrapper.appendChild(badge);
  }

// EmailJS is initialized in HTML, no need to call init again

function showNotification(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = message;
    toast.className = 'toast toast--' + type + ' show';
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function sendEmail() {
    var parms = {
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    }
    emailjs.send("service_ov671y4", "template_xek2klh", parms)
        .then(function (res) {
            showNotification("Message sent successfully!", "success");
            // Clear form fields after successful submission
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
        })
        .catch(function (err) {
            showNotification("Failed to send message. Please try again later.", "error");
        });
}