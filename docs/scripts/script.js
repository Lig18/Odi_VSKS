// scripts/script.js

// --- Вспомогательные функции ---
function showAlert(message, type = 'info') {
    // type: 'info'|'error'|'success'
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3500);
}

// --- Авторизация и модальные окна ---
function initAuthModals() {
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const userMenu = document.getElementById('userMenu');
    const modalLogin = document.getElementById('modalLogin');
    const modalRegister = document.getElementById('modalRegister');
    const modalForgot = document.getElementById('modalForgot');
    const closeBtns = document.querySelectorAll('.modal .close-btn');
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToForgot = document.getElementById('linkToForgot');
    const linkToLogin = document.getElementById('linkToLogin');

    if (btnLogin) btnLogin.addEventListener('click', () => modalLogin.classList.remove('hidden'));
    if (btnRegister) btnRegister.addEventListener('click', () => modalRegister.classList.remove('hidden'));

    closeBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.target.closest('.modal').classList.add('hidden');
        });
    });

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
    if (linkToLogin) linkToLogin.addEventListener('click', e => {
        e.preventDefault();
        modalRegister.classList.add('hidden');
        modalLogin.classList.remove('hidden');
    });

    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');
    const formForgot = document.getElementById('formForgot');
    if (formLogin)
        formLogin.addEventListener('submit', e => {
            e.preventDefault();
            const email = formLogin.loginEmail.value.trim();
            const password = formLogin.loginPassword.value.trim();
            if (email && password) {
                // demo: replace with real authentication request
                modalLogin.classList.add('hidden');
                btnLogin && (btnLogin.style.display = 'none');
                btnRegister && (btnRegister.style.display = 'none');
                userMenu && userMenu.classList.remove('hidden');
                const userName = document.getElementById('userName');
                userName && (userName.textContent = email.split('@')[0]);
                showAlert(`Успешный вход, ${email}`, 'success');
                formLogin.reset();
            } else {
                showAlert('Введите email и пароль', 'error');
            }
        });
    if (formRegister)
        formRegister.addEventListener('submit', e => {
            e.preventDefault();
            const name = formRegister.registerName.value.trim();
            const email = formRegister.registerEmail.value.trim();
            const password = formRegister.registerPassword.value.trim();
            if (name && email && password) {
                // demo: replace with real registration request
                modalRegister.classList.add('hidden');
                showAlert('Регистрация прошла успешно, теперь войдите', 'success');
                formRegister.reset();
            } else {
                showAlert('Пожалуйста заполните все поля', 'error');
            }
        });
    if (formForgot)
        formForgot.addEventListener('submit', e => {
            e.preventDefault();
            const email = formForgot.forgotEmail.value.trim();
            if (email) {
                // demo: replace with real password reset request
                showAlert(`Ссылка для восстановления отправлена на ${email}`, 'info');
                modalForgot.classList.add('hidden');
                formForgot.reset();
            } else {
                showAlert('Введите email', 'error');
            }
        });
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout)
        btnLogout.addEventListener('click', () => {
            userMenu && userMenu.classList.add('hidden');
            btnLogin && (btnLogin.style.display = 'inline-block');
            btnRegister && (btnRegister.style.display = 'inline-block');
            showAlert('Вы вышли из системы', 'info');
        });
}

// --- Карусель главной страницы ---
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

    function update() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsWrap.innerHTML = slides.map((_, i) =>
            `<span class="dot${i === current ? ' active' : ''}" data-i="${i}"></span>`
        ).join('');
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
        };
    }
    next && (next.onclick = nextSlide);
    prev && (prev.onclick = prevSlide);

    carousel.onmouseenter = () => clearTimeout(timeoutId);
    carousel.onmouseleave = reset;
    update();
    reset();
}

// --- Прокрутка карточек преимуществ ---
function setupBenefitsScroller() {
    const track = document.querySelector('.benefits-track');
    const prevBtn = document.querySelector('.scroller-arrow.prev');
    const nextBtn = document.querySelector('.scroller-arrow.next');
    if (track && prevBtn && nextBtn) {
        prevBtn.onclick = () => {
            track.scrollBy({ left: -320, behavior: 'smooth' });
        };
        nextBtn.onclick = () => {
            track.scrollBy({ left: 320, behavior: 'smooth' });
        };
        // Drag-to-scroll
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

// --- Лайтбокс галереи с стрелками и клавиатурой ---
function setupGalleryLightbox() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    let images = Array.from(galleryGrid.querySelectorAll('img'));
    let currentIdx = 0;
    function openLightbox(idx) {
        currentIdx = idx;
        let lightbox = document.createElement('div');
        lightbox.className = 'lightbox active';
        let content = document.createElement('div');
        content.className = 'lightbox-content';
        let img = document.createElement('img');
        img.src = images[currentIdx].src;
        img.alt = images[currentIdx].alt;
        let closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => document.body.removeChild(lightbox);

        let prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-arrow lightbox-prev';
        prevBtn.innerHTML = '❮';
        prevBtn.onclick = function () { changeImg(-1); };

        let nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-arrow lightbox-next';
        nextBtn.innerHTML = '❯';
        nextBtn.onclick = function () { changeImg(1); };

        content.appendChild(img);
        content.appendChild(closeBtn);
        if (images.length > 1) {
            content.appendChild(prevBtn);
            content.appendChild(nextBtn);
        }
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);

        function changeImg(dir) {
            currentIdx = (currentIdx + dir + images.length) % images.length;
            img.src = images[currentIdx].src;
            img.alt = images[currentIdx].alt;
        }

        lightbox.onclick = e => { if (e.target === lightbox) document.body.removeChild(lightbox); };
        window.addEventListener('keydown', keyHandler);

        function keyHandler(e) {
            if (!document.body.contains(lightbox)) return;
            if (e.key === 'Escape') document.body.contains(lightbox) && document.body.removeChild(lightbox);
            if (e.key === 'ArrowLeft' && images.length > 1) changeImg(-1);
            if (e.key === 'ArrowRight' && images.length > 1) changeImg(1);
        }
        closeBtn.addEventListener('click', () => window.removeEventListener('keydown', keyHandler));
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox)
                window.removeEventListener('keydown', keyHandler);
        });
    }
    images.forEach((img, idx) => img.onclick = () => openLightbox(idx));
}

// ---- Мобильное бургер-меню ----
function setupMobileSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    if (!sidebarToggle || !mobileSidebar) return;
    sidebarToggle.onclick = function () {
        mobileSidebar.classList.toggle('open');
    };
    mobileSidebar.onclick = function(e) {
        if (e.target === mobileSidebar) mobileSidebar.classList.remove('open');
    };
}

// --- Инициализация при загрузке ---
document.addEventListener('DOMContentLoaded', () => {
    initAuthModals();
    setupBenefitsScroller();
    if (document.getElementById('photoCarousel')) setupCarousel('photoCarousel');
    setupGalleryLightbox();
    setupMobileSidebar();
});
