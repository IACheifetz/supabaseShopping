export async function renderItem(listItem) {
    const h3 = document.createElement('h3');

    h3.classList.add('list-item');

    h3.textContent = `${listItem.amount} ${listItem.item_name}`;

    return h3;
}