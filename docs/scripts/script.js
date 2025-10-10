// Авторизация, модальные окна
function initAuthModals() {
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const userMenu = document.getElementById('userMenu');
    const modalLogin = document.getElementById('modalLogin');
    const modalRegister = document.getElementById('modalRegister');
    const modalForgot = document.getElementById('modalForgot');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const closeForgot = document.getElementById('closeForgot');
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToForgot = document.getElementById('linkToForgot');

    if (btnLogin) btnLogin.addEventListener('click', () => modalLogin.classList.remove('hidden'));
    if (btnRegister) btnRegister.addEventListener('click', () => modalRegister.classList.remove('hidden'));
    if (closeLogin) closeLogin.addEventListener('click', () => modalLogin.classList.add('hidden'));
    if (closeRegister) closeRegister.addEventListener('click', () => modalRegister.classList.add('hidden'));
    if (closeForgot) closeForgot.addEventListener('click', () => modalForgot.classList.add('hidden'));
    if (linkToRegister) linkToRegister.addEventListener('click', e => {
        e.preventDefault();
        modalLogin.classList.add('hidden');
        modalRegister.classList.remove('hidden');
    });
    if (linkToForgot) linkToForgot.addEventListener('click', e => {
        e.preventDefault();
        modalLogin.classList.add('hidden');
        modalForgot.classList.remove('hidden');
    });

    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');
    const formForgot = document.getElementById('formForgot');
    if (formLogin) formLogin.addEventListener('submit', e => {
        e.preventDefault();
        const email = formLogin.loginEmail.value.trim();
        const password = formLogin.loginPassword.value.trim();
        if (email && password) {
            modalLogin.classList.add('hidden');
            if (btnLogin) btnLogin.style.display = 'none';
            if (btnRegister) btnRegister.style.display = 'none';
            if (userMenu) userMenu.classList.remove('hidden');
            const userName = document.getElementById('userName');
            if (userName) userName.textContent = email.split('@')[0];
            alert('Успешный вход, ' + email);
            formLogin.reset();
        } else {
            alert('Введите email и пароль');
        }
    });
    if (formRegister) formRegister.addEventListener('submit', e => {
        e.preventDefault();
        const name = formRegister.registerName.value.trim();
        const email = formRegister.registerEmail.value.trim();
        const password = formRegister.registerPassword.value.trim();
        if (name && email && password) {
            modalRegister.classList.add('hidden');
            alert('Регистрация прошла успешно, теперь войдите');
            formRegister.reset();
        } else {
            alert('Пожалуйста заполните все поля');
        }
    });
    if (formForgot) formForgot.addEventListener('submit', e => {
        e.preventDefault();
        const email = formForgot.forgotEmail.value.trim();
        if (email) {
            alert('Ссылка для восстановления отправлена на ' + email);
            modalForgot.classList.add('hidden');
            formForgot.reset();
        } else {
            alert('Введите email');
        }
    });
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) btnLogout.addEventListener('click', () => {
        if (userMenu) userMenu.classList.add('hidden');
        if (btnLogin) btnLogin.style.display = 'inline-block';
        if (btnRegister) btnRegister.style.display = 'inline-block';
        alert('Вы вышли из системы');
    });
}

// Инициализация карусели на главной странице (если используется внешний скрипт, не дублировать)
function setupCarousel(carouselId, interval = 4000) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prev = carousel.querySelector('.carousel-arrow.prev');
    const next = carousel.querySelector('.carousel-arrow.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let current = 0;
    let timeoutId = null;
    let isTransitioning = false;
    function update() {
        if (isTransitioning) return;
        isTransitioning = true;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsWrap.innerHTML = slides.map((_, i) =>
            `<span class="dot${i === current ? ' active' : ''}" data-i="${i}"></span>`
        ).join('');
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }
    function go(i) {
        current = (i + slides.length) % slides.length;
        update();
        reset();
    }
    function nextSlide() { go(current + 1); }
    function prevSlide() { go(current - 1); }
    function reset() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(nextSlide, interval);
    }
    if (dotsWrap) {
        dotsWrap.onclick = e => {
            if (e.target.classList.contains('dot')) {
                go(Number(e.target.dataset.i));
            }
        }
    }
    if (next) next.onclick = nextSlide;
    if (prev) prev.onclick = prevSlide;
    carousel.onmouseenter = () => clearTimeout(timeoutId);
    carousel.onmouseleave = reset;
    update();
    reset();
}

// Переливающиеся карточки преимуществ (join.html)
function setupBenefitsScroller() {
    const track = document.querySelector('.benefits-track');
    const prevBtn = document.querySelector('.scroller-arrow.prev');
    const nextBtn = document.querySelector('.scroller-arrow.next');
    if (track && prevBtn && nextBtn) {
        prevBtn.onclick = () => {
            track.scrollBy({left: -320, behavior:'smooth'});
        };
        nextBtn.onclick = () => {
            track.scrollBy({left: 320, behavior:'smooth'});
        };
        // Drag-to-scroll (свайп)
        let isDown = false, startX, scrollLeft;
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('dragging');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.classList.remove('dragging');
        });
        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('dragging');
        });
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.2;
            track.scrollLeft = scrollLeft - walk;
        });
        // Touch support
        let touchStartX = 0, touchScrollStart = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollStart = track.scrollLeft;
        });
        track.addEventListener('touchmove', (e) => {
            const dx = e.touches[0].pageX - touchStartX;
            track.scrollLeft = touchScrollStart - dx;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAuthModals();
    setupBenefitsScroller();
    // Если на нужной странице, а не на всех запускать карусель:
    if (document.getElementById('photoCarousel')) setupCarousel('photoCarousel');
});
