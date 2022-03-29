import { checkAuth, logout, getShoppingList, deleteShoppingList, buyItem, createListItem } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const formEl = document.querySelector('form');
const listEl = document.querySelector('.shopping-list');


logoutButton.addEventListener('click', () => {
    logout();
});

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(formEl);

    await createListItem({
        amount: data.get('amount'),
        item_name: data.get('item'),
        is_bought: false,
    });

    await fetchAndDisplayItems();
});

async function fetchAndDisplayItems() {
    listEl.textContent = '';

    const shoppingList = await getShoppingList();

    for (let listItem of shoppingList) {
        const listItemEl = document.createElement('p');

        listItemEl.textContent = `${listItem.amount} ${listItem.item_name}`;

        listEl.append(listItemEl);
    }
}

window.addEventListener('load', () => {
    fetchAndDisplayItems();
});