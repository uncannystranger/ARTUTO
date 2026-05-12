/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Validate if constant exists
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== ACTIVE SECTION LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if(sectionsClass){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link');
            }else{
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, the question is what was the one he chose
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== LOADING SCREEN ===============*/
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

/*=============== PORTFOLIO FILTER ===============*/
const filterItems = document.querySelectorAll('.portfolio__filter-item');
const portfolioCards = document.querySelectorAll('.portfolio__card');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all filter items
        filterItems.forEach(filter => filter.classList.remove('active-filter'));
        // Add active class to clicked filter item
        item.classList.add('active-filter');
        
        const filterValue = item.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
            if(filterValue === 'all' || card.getAttribute('data-category') === filterValue){
                card.classList.remove('hidden');
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            }else{
                card.classList.add('hidden');
            }
        });
    });
});

/* Add fadeIn animation */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if(contactForm){
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Simulate form submission (in real app, you would send to server)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            contactMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            contactMessage.classList.add('success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.classList.remove('success');
            }, 5000);
        }, 1500);
    });
}

/*=============== SKILLS ANIMATION ===============*/
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skills__percentage');

function animateSkills() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if(sectionPos < screenPos){
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        // Only animate once
        window.removeEventListener('scroll', animateSkills);
    }
}

window.addEventListener('scroll', animateSkills);

/*=============== SCROLL REVEAL ANIMATION ===============*/
// Check if ScrollReveal is available
if(typeof ScrollReveal !== 'undefined'){
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 100,
        reset: false
    });

    sr.reveal(`.home__title`, {delay: 100});
    sr.reveal(`.home__description`, {delay: 200});
    sr.reveal(`.home__buttons`, {delay: 300});
    sr.reveal(`.home__img`, {delay: 400, origin: 'right'});
    sr.reveal(`.home__social`, {delay: 500, origin: 'left'});
    
    sr.reveal(`.section__title`, {interval: 100});
    sr.reveal(`.section__subtitle`, {delay: 100});
    
    sr.reveal(`.about__content`, {interval: 100});
    sr.reveal(`.about__data`, {delay: 200});
    
    sr.reveal(`.skills__content`, {interval: 200});
    
    sr.reveal(`.services__card`, {interval: 200});
    
    sr.reveal(`.portfolio__card`, {interval: 200});
    
    sr.reveal(`.testimonial__card`, {interval: 200});
    
    sr.reveal(`.contact__content`, {delay: 100});
    sr.reveal(`.contact__form`, {delay: 200});
    
    sr.reveal(`.footer__content`, {delay: 100});
    sr.reveal(`.footer__links`, {delay: 200});
    sr.reveal(`.footer__social`, {delay: 300});
}

/*=============== TYPING EFFECT FOR HOME TITLE ===============*/
const homeTitle = document.querySelector('.home__title');
if(homeTitle){
    const text = homeTitle.textContent;
    homeTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            homeTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after loader disappears
    setTimeout(typeWriter, 1600);
}

/*=============== SMOOTH SCROLL FOR ANCHOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement){
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== PARALLAX EFFECT FOR HOME BLOB ===============*/
const homeBlob = document.querySelector('.home__blob');
if(homeBlob){
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.getElementById('home');
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        
        if(scrolled < homeBottom){
            homeBlob.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

/*=============== TESTIMONIALS SLIDER (AUTO) ===============*/
const testimonialCards = document.querySelectorAll('.testimonial__card');
let currentTestimonial = 0;

if(testimonialCards.length > 0 && window.innerWidth < 768){
    setInterval(() => {
        testimonialCards.forEach((card, index) => {
            if(index === currentTestimonial){
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            }else{
                card.style.display = 'none';
            }
        });
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }, 5000);
}

console.log('Portfolio loaded successfully! 🚀');
