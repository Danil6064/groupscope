const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const menu = document.getElementById('menu');
const overlay = document.getElementById('menu-overlay')

openBtn.addEventListener('click', function () {
    menu.classList.add('open');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', function () {
    menu.classList.remove('open');
    overlay.classList.remove('active');
});

document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !openBtn.contains(event.target)) {
        menu.classList.remove('open');
        overlay.classList.remove('active');
    }
});