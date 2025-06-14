

function createDishHtml(dish) {
    return `
        <div class="main-content">
            <div class="price-seperator">
                <h3>${dish.name}</h3>
                <h3>${dish.price},-
                    <button class="plus-button" onclick='addToBasket(${JSON.stringify(dish)})'>
                        <img class="plus-icon" src="./assets/icons/hinzufuegen.png" alt="plus.png">
                    </button>
                </h3>
            </div>
            <p>${dish.desctiption}</p>
        </div>`;
}


function createOderHtml(dish){
   return  `
                    <div class="shopingcart-content">
                        <div>
                            <div class="display-flex-space-between">
                                <h3>${dish.name}</h3>
                                <button class="take-out-basket-button" onclick="cancelOrder('${dish.name}')">
                                X
                                </button>
                            </div>
                            <div class="order-section"> 
                                <div class="font-size-shoppingcart">
                                    <button class="add-remove-button" onclick="decreaseAmount('${dish.name}')">
                                    -
                                    </button>
                                    ${dish.amount}
                                    x
                                    <button class="add-remove-button" onclick="increaseAmount('${dish.name}')">
                                    +
                                    </button>
                                </div>
                                <a class="font-size-shoppingcart">${dish.price.toFixed(2)},-</a>
                            </div>
                        </div>
                    </div>
                `;

}


function getOrderPrice(subTotal, deliveryCost, total){
    return `
            <div class="bill-summary">
                <div class="bill-food-deliver">
                    <a>Zwischensumme: </a>
                    <a>${subTotal.toFixed(2)},-</a>
                </div>
                <div class="bill-food-deliver">
                    <a>Lieferkosten: </a>
                    <a>${deliveryCost.toFixed(2)},-</a>
                </div>
                <div class="separator">
                </div>
                <div class="bill-total">
                    <a class="total-price">Gesamt: </a>
                    <a>${total.toFixed(2)},-</a>
                </div>
                <div class="pay-button-container">
                    <button onclick="confirmOrder()" class="pay-button">Jetzt bestellen</button>
                </div>
            </div>

            
        `;
}


function getPopupWindow(){
    return `<div onclick="closePopup()" class="background-darkener">
                                        <div class="popup-window-buy">
                                            <div class="popup-window-buy-content">
                                                <p>Bestellung ist unterwegs!</p>
                                                <div class="popup-window-buy-content-space"></div>
                                                <button class="popup-window-buy-button" onclick="">ok</button>
                                            </div>
                                        </div>
                                    </div>`
}