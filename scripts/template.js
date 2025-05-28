

function createDishHtml(dish) {
    // Wichtig: Wir müssen den Button anklickbar machen und die Funktion 'addToBasket' aufrufen.
    // Dafür nutzen wir ein 'onclick'-Attribut und übergeben das 'dish'-Objekt.
    // Da 'dish' ein Objekt ist, müssen wir es mit JSON.stringify() in einen String umwandeln,
    // damit es im 'onclick'-Attribut korrekt als Parameter übergeben werden kann.
    return `
        <div class="main-content">
            <div class="price-seperator">
                <h3>${dish.name}</h3>
                <a>${dish.price},-
                    <button class="plus-button" onclick='addToBasket(${JSON.stringify(dish)})'>
                        <img class="plus-icon" src="./assets/icons/hinzufuegen.png" alt="plus.png">
                    </button>
                </a>
            </div>
            <p>${dish.desctiption}</p>
        </div>`;
}