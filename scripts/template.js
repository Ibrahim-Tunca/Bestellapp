function createDishHtml(dish) {
    return `
        <div class="main-content">
            <div class="price-seperator">
                <h3>${dish.name}</h3>
                <a>${dish.price},-<button class="plus-button"><img class="plus-icon" src="./assets/icons/hinzufuegen.png" alt="plus.png"></button></a>
            </div>
            <p>${dish.desctiption}</p>
        </div>`;
}

