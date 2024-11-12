const openBtn = document.querySelector('#openNav');
const closeBtn = document.querySelector('#closeNav');
const nav = document.querySelector('#mobileNav');

const openCart = document.querySelector('#openCart');
const closeCart = document.querySelector('#closeCart');
const mainCart = document.querySelector('#cartMain');
const cartReal = document.querySelector('#cartReal');

let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
let counter = cartStorage.length || 0;

//burger menu
openBtn.addEventListener('mouseenter', (e) => {
    console.log('open');
    anime({
        targets: openBtn,
        rotate: [0, 180],
        duration: 1000,
    });
});

openBtn.addEventListener('click', (e) => {
    e.preventDefault();

    nav.classList.remove('hidden');

    anime({
        targets: nav,
        translateY: [-1000, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 250,
        easing: 'easeOutQuad',
        delay: 100
    });
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    anime({
        targets: closeBtn,
        rotate: [-180, 180],
        duration: 1000,
        easing: 'easeOutQuad'
    });

    anime({
        targets: nav,
        translateY: [0, -1000],
        opacity: [1, 0],
        scale: [1, 0.5],
        duration: 250,
        easing: 'easeInQuad',
        delay: 100,
        complete: () => {
            nav.classList.add('hidden');
        }
    });
});

// Cart functionality

openCart.addEventListener('click', (e) => {
    e.preventDefault();

    mainCart.classList.toggle('hidden');

    anime({
        targets: mainCart,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    anime({
        targets: cartReal,
        translateX: [1000, 0],
        opacity: [0, 1],
        duration: 250,
        easing: 'easeOutQuad'
    });
});

closeCart.addEventListener('click', (e) => {
    e.preventDefault();

    anime({
        targets: cartReal,
        translateX: [0, 1000],
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInQuad'
    });

    anime({
        targets: mainCart,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInQuad',
        complete: () => {
            mainCart.classList.toggle('hidden');
        }
    });
});

const loadNumber = () => {
    const number = document.querySelector("#cartNum");
    const menuNumber = document.querySelector("#cartMenuNum");

    number.textContent = counter;
    menuNumber.textContent = `${counter} ITEMS`;

    console.log(cartStorage);
    loadCartItem();
}

const loadCartItem = () => {
    const container = document.querySelector("#cartContainer");
    container.innerHTML = "";

    cartStorage.forEach(item => {
        const existingItem = [...container.children].find(
            child => child.querySelector("#itemTitle").innerText === item.title
        );

        if (existingItem) {
            const quantityElement = existingItem.querySelector("p.font-bold");
            quantityElement.innerText = `QTY: ${item.quantity}`;
        } else {

            const newItem = document.createElement("div");
            newItem.className = "bg-white w-full h-1/5 flex flex-row";

            const description = item.description.split(" ").slice(0, 15).join(" ") + "...";

            newItem.innerHTML = `
                <img class="w-1/3 p-4 object-cover h-full bg-white" src="${item.image}" alt="">
                <div class="w-full h-full flex flex-col justify-start p-2">
                    <div class="flex justify-between">
                        <p id="itemTitle" class="text-2xl">${item.title}</p>
                        <span id="removeFromCart" class="icon-[iconamoon--trash-light] text-2xl cursor-pointer hover:bg-red-500 transition-all"></span>
                    </div>
                    <p class="text-gray-500 h-full">${description}</p>
                    <div class="flex justify-between flex-wrap">
                        <p class="font-bold">QTY: ${item.quantity}</p>
                        <p class="text-lBrown font-medium">${item.price}</p>
                    </div>
                </div>
            `;

            container.appendChild(newItem);

            const removeBtn = newItem.querySelector("#removeFromCart");
            removeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const itemTitle = newItem.querySelector("#itemTitle").innerText;
                const itemIndex = cartStorage.findIndex(item => item.title === itemTitle);
                if (itemIndex > -1) {
                    cartStorage.splice(itemIndex, 1);

                    localStorage.setItem("cart", JSON.stringify(cartStorage));

                    counter--;
                    loadNumber();
                    loadCartItem();
                }
            });
        }
    });
}


document.addEventListener("DOMContentLoaded", loadNumber);