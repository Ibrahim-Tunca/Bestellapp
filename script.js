
function render() {
    let contentRef = document.getElementById("pricelist_id");
    contentRef.innerHTML = ""; 

    // Iteriere über die Kategorien (Keys) in myDishes (sehr ähnlich zu foreach schleifen in C++)
    for (let categoryName in myDishes) {
        //Zeile 18 ist nur dafür da um den ersten Buchstaben in einem String groß anzeigen zu lassen
        contentRef.innerHTML += `<div class="topic-from-menue"><h2>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2></div>`; 


        //Bei jedem durchlauf wird der Inhalt von dem Array mit dem Schlüsselwort "categoryName" die neue Variable "dishesInCategory" zugewiesen
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
    // Hole den aktuellen Warenkorb aus dem LocalStorage
    // localStorage.getItem('basket') gibt einen String zurück (oder null, wenn nichts gespeichert ist).
    // JSON.parse() wandelt diesen String zurück in ein JavaScript-Array.
    // Wenn 'basket' noch nicht existiert, erstellen wir ein leeres Array ([]).
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    
    
   // Überprüfen, ob das Gericht bereits im Warenkorb ist
   // mit === vergleicht man nicht nur beide Werte sondern auch beide Typen ==> Mache die If abfrage nur wenn String und Type gleich ist.
    let foundDish = basket.find(item => item.name === dish.name);

    if (foundDish) {
        foundDish.amount++;
    } else {
        // Wenn das Gericht nicht gefunden wurde, füge es neu hinzu
        // Setze die Menge des neu hinzugefügten Gerichts immer auf 1
        let newDish = { ...dish, amount: 1 }; 
        basket.push(newDish);
    }



    localStorage.setItem('basket', JSON.stringify(basket));



    
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
                calculateOrderPrice();
                return; // Funktion beenden, wenn nichts im Warenkorb ist
            }

            // Iteriere über jedes Gericht im Warenkorb und erstelle HTML dafür
            basketRef.forEach(dish => {
                contentRef.innerHTML += createOderHtml(dish);
            });

            calculateOrderPrice();
        }





        function clearBasket() {
            localStorage.removeItem('basket'); // Entfernt den 'basket' Eintrag komplett
            renderBasket();
        }

        






 function increaseAmount(dishName) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let foundDish = basket.find(item => item.name === dishName);

    if (foundDish) {
        foundDish.amount++;
        localStorage.setItem('basket', JSON.stringify(basket));
        renderBasket(); // Warenkorb neu rendern
    }
}

function decreaseAmount(dishName) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let foundDish = basket.find(item => item.name === dishName);

    if (foundDish) {
        foundDish.amount--;
        // Wenn die Menge 0 erreicht, das Gericht aus dem Warenkorb entfernen
        if (foundDish.amount <= 0) {
            basket = basket.filter(item => item.name !== dishName);
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        renderBasket(); // Warenkorb neu rendern
    }
}




function cancelOrder(dishName) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    // Filtere alle Elemente heraus, die NICHT den übergebenen dishName haben.
    // Das Ergebnis ist ein neues Array ohne das zu entfernende Gericht.
    basket = basket.filter(item => item.name !== dishName);

    localStorage.setItem('basket', JSON.stringify(basket)); // Speichere den neuen Warenkorb
    renderBasket(); // Aktualisiere die Anzeige des Warenkorbs
}




function calculateOrderPrice(){
    let basketRef = JSON.parse(localStorage.getItem('basket')) || [];
    let contentRef = document.getElementById("bill_id");
    
    let subTotal = 0;
    basketRef.forEach(dish => {
        
        subTotal += dish.price * dish.amount;

    });



    const deliveryCost = 3.00;
    const total = subTotal + deliveryCost;


        if(basketRef.length > 0){
            contentRef.innerHTML = getOrderPrice(subTotal, deliveryCost, total);
        
    } else {
        contentRef.innerHTML = '';
    }


}

