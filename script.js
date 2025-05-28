
function render() {
    let contentRef = document.getElementById("pricelist_id");
    contentRef.innerHTML = ""; 

    // Iteriere über die Kategorien (Keys) in myDishes (sehr ähnlich zu foreach schleifen in C++)
    for (let categoryName in myDishes) {
        //Zeile 18 ist nur dafür da um den ersten Buchstaben in einem String groß anzeigen zu lassen
        contentRef.innerHTML += `<div class="topic-from-menue"><h2>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2></div>`; 


        //Bei jedem durchlauf wird der Inhalt von dem Array mit dem Schlüsselwort "categoryName" die neue Variable "dishesInCategory" zugewieser
        let dishesInCategory = myDishes[categoryName]; 

        // Iteriere über die Gerichte innerhalb dieser Kategorie
        for (let i = 0; i < dishesInCategory.length; i++) {
            let dish = dishesInCategory[i]; // Das aktuelle Gericht
            contentRef.innerHTML += createDishHtml(dish); // Füge das HTML für jedes Gericht hinzu
        }
    }
    renderBasket();
}

function toggleShoppingcart(){
    document.getElementById("shoppingcart_id").classList.toggle("close-shoppingcart");
}




function addToBasket(dish) {
    // 1. Hole den aktuellen Warenkorb aus dem LocalStorage
    // localStorage.getItem('basket') gibt einen String zurück (oder null, wenn nichts gespeichert ist).
    // JSON.parse() wandelt diesen String zurück in ein JavaScript-Array.
    // Wenn 'basket' noch nicht existiert, erstellen wir ein leeres Array ([]).
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    // 2. Füge das neue Gericht zum Warenkorb hinzu
    basket.push(dish);

    

    // 3. Speichere den aktualisierten Warenkorb zurück im LocalStorage
    // localStorage.setItem() erwartet einen String.
    // JSON.stringify() wandelt das JavaScript-Array in einen JSON-String um.
    localStorage.setItem('basket', JSON.stringify(basket));



    console.log('Gericht zum Warenkorb hinzugefügt:', dish.name);
    console.log('Aktueller Warenkorb im LocalStorage:', JSON.parse(localStorage.getItem('basket')));


    
    // Optional: Eine kurze Rückmeldung für den Benutzer (z.B. ein Alert oder eine kleine Animation)
    //alert(`${dish.name} wurde zum Warenkorb hinzugefügt!`);

    renderBasket();
}


// Initialer Aufruf der render-Funktion, wenn die Seite geladen wird
// Füge dies am Ende deines JavaScript-Files hinzu, damit die Elemente gerendert werden,
// sobald das DOM bereit ist.
document.addEventListener('DOMContentLoaded', render);









       
        function renderBasket() {
            let contentRef = document.getElementById("shoppingcart_content_id");
            contentRef.innerHTML = '';

            let basketRef = JSON.parse(localStorage.getItem('basket')) || [];

            if (basketRef.length === 0) {
                contentRef.innerHTML = '<p>Der Warenkorb ist leer.</p>';
                return; // Funktion beenden, wenn nichts im Warenkorb ist
            }

            // Iteriere über jedes Gericht im Warenkorb und erstelle HTML dafür
            basketRef.forEach(dish => {
                contentRef.innerHTML += `
                    <div class="shopingcart-content">
                        <div>
                            <h3>${dish.name}</h3>
                            <a>Preis: ${dish.price.toFixed(2)} ,-</a>
                        </div>
                    </div>
                `;
            });
        }