// (Остальной твой JS)
// Вставь функцию инициализации модалок в конец файла:
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
    btnLogin.addEventListener('click', () => modalLogin.classList.remove('hidden'));
    btnRegister.addEventListener('click', () => modalRegister.classList.remove('hidden'));
    closeLogin.addEventListener('click', () => modalLogin.classList.add('hidden'));
    closeRegister.addEventListener('click', () => modalRegister.classList.add('hidden'));
    closeForgot.addEventListener('click', () => modalForgot.classList.add('hidden'));
    linkToRegister.addEventListener('click', e => {
        e.preventDefault();
        modalLogin.classList.add('hidden');
        modalRegister.classList.remove('hidden');
    });
    linkToForgot.addEventListener('click', e => {
        e.preventDefault();
        modalLogin.classList.add('hidden');
        modalForgot.classList.remove('hidden');
    });
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');
    const formForgot = document.getElementById('formForgot');
    formLogin.addEventListener('submit', e => {
        e.preventDefault();
        const email = formLogin.loginEmail.value.trim();
        const password = formLogin.loginPassword.value.trim();
        if (email && password) {
            modalLogin.classList.add('hidden');
            btnLogin.style.display = 'none';
            btnRegister.style.display = 'none';
            userMenu.classList.remove('hidden');
            document.getElementById('userName').textContent = email.split('@')[0];
            alert('Успешный вход, ' + email);
            formLogin.reset();
        } else {
            alert('Введите email и пароль');
        }
    });
    formRegister.addEventListener('submit', e => {
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
    formForgot.addEventListener('submit', e => {
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
    document.getElementById('btnLogout').addEventListener('click', () => {
        userMenu.classList.add('hidden');
        btnLogin.style.display = 'inline-block';
        btnRegister.style.display = 'inline-block';
        alert('Вы вышли из системы');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // ... твои другие инициализации
    initAuthModals();
});
