
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
}





function toggleShoppingcart(){
    document.getElementById("shoppingcart_id").classList.toggle("close-shoppingcart");
}

