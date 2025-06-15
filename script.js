
function render() {
    let contentRef = document.getElementById("pricelist_id");
    contentRef.innerHTML = ""; 
    for (let categoryName in myDishes) {
        contentRef.innerHTML += `<div class="topic-from-menue"><h2>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2></div>`; 
        let dishesInCategory = myDishes[categoryName]; 
        for (let i = 0; i < dishesInCategory.length; i++) {
            let dish = dishesInCategory[i];
            contentRef.innerHTML += createDishHtml(dish);
        }
    }
    renderBasket();
}


function toggleShoppingcart(){
    document.getElementById("shoppingcart_id").classList.toggle("close-shoppingcart");
}


function addToBasket(dish) {

    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let foundDish = basket.find(item => item.name === dish.name);

    if (foundDish) {
        foundDish.amount++;
    } else {
        let newDish = { ...dish, amount: 1 }; 
        basket.push(newDish);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket();
}


function renderBasket() {

    let contentRef = document.getElementById("shoppingcart_content_id");
    contentRef.innerHTML = '';
    let basketRef = JSON.parse(localStorage.getItem('basket')) || [];
    if (basketRef.length === 0) {
            contentRef.innerHTML = '<p>Der Warenkorb ist leer.</p>';
            calculateOrderPrice();
            return; 
            }
            basketRef.forEach(dish => {
                contentRef.innerHTML += createOderHtml(dish);
            });
            calculateOrderPrice();
}


 function increaseAmount(dishName) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let foundDish = basket.find(item => item.name === dishName);

    if (foundDish) {
        foundDish.amount++;
        localStorage.setItem('basket', JSON.stringify(basket));
        renderBasket();
    }
}


function decreaseAmount(dishName) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let foundDish = basket.find(item => item.name === dishName);

    if (foundDish) {
        foundDish.amount--;
        if (foundDish.amount <= 0) {
            basket = basket.filter(item => item.name !== dishName);
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        renderBasket();
    }
}


function cancelOrder(dishName) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket = basket.filter(item => item.name !== dishName);
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket();
}


function calculateOrderPrice(){
    let basketRef = JSON.parse(localStorage.getItem('basket')) || [];
    
    let subTotal = 0;
    basketRef.forEach(dish => {
        subTotal += dish.price * dish.amount;
    });
    addDeliveryCost(subTotal);
}


function addDeliveryCost(subTotal){
    let basketRef = JSON.parse(localStorage.getItem('basket')) || [];
    let deliveryCost = 3.00;
    let contentRef = document.getElementById("bill_id");
    const total = subTotal + deliveryCost;
    if(total > 15){
        deliveryCost = 0.00;
    };
        if(basketRef.length > 0){
            contentRef.innerHTML = getOrderPrice(subTotal, deliveryCost, total);    
    } else {
        contentRef.innerHTML = '';
    }
}


function confirmOrder() {
    localStorage.removeItem('basket'); 
    renderBasket();
    popUpWindowForOrder();
    toggleShoppingcart();
}

function popUpWindowForOrder(){
    contentRef = document.getElementById("popup-window");
    contentRef.classList.remove("d_none");
    contentRef.innerHTML += getPopupWindow();
}


function closePopup(){
    contentRef = document.getElementById("popup-window").classList.add("d_none");
}


