
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.header-logo');
    const originalSrc = logo.src;

    logo.addEventListener('mouseover', () => {
        logo.src = './image/handleNumber.png';
    });

    logo.addEventListener('mouseout', () => {
        logo.src = originalSrc;
    });
});

// Константы и переменные
const basketBtn = document.getElementById('basketBtn');
const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');
const ticketForm = document.getElementById('ticketForm');
const quantityInput = document.getElementById('quantity');
const ticketTypeSelect = document.getElementById('ticketType');
const totalPriceDisplay = document.getElementById('totalPrice');
const modalTotalPriceDisplay = document.getElementById('modalTotalPrice');
const cartItemsDiv = document.getElementById('cartItems');
const cartCountDisplay = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkoutBtn');

const ticketPrices = {
    adult: 1000,
    child: 500,
    family: 2500,
};

let cartItems = [];
let totalTickets = 0;

// Функции
function calculateTotalPrice() {
    return cartItems.reduce((sum, item) => sum + item.totalCost, 0);
}

function updateCartCount() {
    totalTickets = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountDisplay.textContent = totalTickets;
}

function updateModalTotalPrice() {
    modalTotalPriceDisplay.textContent = calculateTotalPrice() + ' руб.';
}

function updateCartItems() {
    cartItemsDiv.innerHTML = '';
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.quantity} x ${item.type}: ${item.totalCost} руб.`;
        cartItemsDiv.appendChild(itemDiv);
    });
}

function addToCart(type, quantity, totalCost) {
    cartItems.push({ type, quantity, totalCost });
    updateCartCount();
    updateModalTotalPrice();
    updateCartItems();
}

// Обработчики событий
basketBtn.onclick = function () {
    modal.style.display = "block";
    updateCartItems();
};

closeModal.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

ticketForm.onsubmit = function (event) {
    event.preventDefault();
    const selectedType = ticketTypeSelect.value;
    const quantity = parseInt(quantityInput.value);
    const totalCost = ticketPrices[selectedType] * quantity;

    addToCart(selectedType, quantity, totalCost);
    totalPriceDisplay.textContent = calculateTotalPrice() + ' руб.';
    ticketForm.reset();
};

checkoutBtn.onclick = function () {
    alert('Заказ оформлен! Спасибо за покупку.');
    modal.style.display = "none";
    cartItems = [];
    totalTickets = 0;
    cartCountDisplay.textContent = totalTickets;
    totalPriceDisplay.textContent = '0';
    modalTotalPriceDisplay.textContent = '0';
    cartItemsDiv.innerHTML = '';
};

// Адаптивность для header
function updateHeader() {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header-logo');
    const nav = document.querySelector('.header-nav');
    const button = document.querySelector('.header-button');

    if (window.innerWidth <= 940) {
        header.style.flexDirection = 'column';
        header.style.alignItems = 'center';
        logo.style.marginBottom = '10px';
        nav.style.marginBottom = '10px';
        button.style.width = '100%';
    } else {
        header.style.flexDirection = 'row';
        header.style.alignItems = 'center';
        logo.style.marginBottom = '0';
        nav.style.marginBottom = '0';
        button.style.width = 'auto';
    }
}

window.addEventListener('resize', updateHeader);
updateHeader(); // Вызов при загрузке страницы

// Обработчик прокрутки для кнопки корзины
window.addEventListener('scroll', function () {
    const cartButton = document.querySelector('.cart-button');
    if (window.scrollY > 50) {
        cartButton.classList.add('scrolled');
    } else {
        cartButton.classList.remove('scrolled');
    }
});