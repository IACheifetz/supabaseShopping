import { checkAuth, logout, getShoppingList, deleteShoppingList, buyItem, createListItem } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const formEl = document.querySelector('form');
const listEl = document.querySelector('.shopping-list');
const deleteButton = document.getElementById('delete-list');


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

    formEl.reset();

    await fetchAndDisplayItems();
});

async function fetchAndDisplayItems() {
    listEl.textContent = '';

    const shoppingList = await getShoppingList();

    for (let listItem of shoppingList) {
        const listItemEl = document.createElement('h3');

        listItemEl.classList.add('list-item');

        listItemEl.textContent = `${listItem.amount} ${listItem.item_name}`;

        listEl.append(listItemEl);
    }
}

window.addEventListener('load', () => {
    fetchAndDisplayItems();
});

deleteButton.addEventListener('click', async () => {
    await deleteShoppingList();

    await fetchAndDisplayItems();
});