import Discount from "./Discount.jsx";
import Menu from "./Menu.jsx";


export class Cart {
    static cartItems = {};

    static DELIVERYFEE = 1;

    static addToCart(userId, itemId) {
        console.log("Hi");
        if (!Cart.cartItems[userId]) {
            Cart.cartItems[userId] = {};
        }
        if (!Cart.cartItems[userId][itemId]) {
            Cart.cartItems[userId][itemId] = 1;
        } else {
            Cart.cartItems[userId][itemId]++;
        }
        Cart.saveCart();
    }

    static removeFromCart(userId, itemId) {
        if (Cart.cartItems[userId][itemId]) {
            Cart.cartItems[userId][itemId]--;
            if (Cart.cartItems[userId][itemId] <= 0) {
                delete Cart.cartItems[userId][itemId];
            }
            Cart.saveCart();
        }
    }

    static removeAllFromCart(userId) {
        if (Cart.cartItems[userId]) {
            delete Cart.cartItems[userId];
            Cart.saveCart();
        }
    }

    static removeAllCountfromCartForAItem(userId, itemId) {
        if (Cart.cartItems[userId] && Cart.cartItems[userId][itemId]) {
            delete Cart.cartItems[userId][itemId];
            Cart.saveCart();
        }
    }

    static getTotalCartAmount(userId, discountCode="") {
        let totalAmount = 0;
        if (userId){

            if (Cart.cartItems[userId] && Object.keys(Cart.cartItems[userId]).length !== 0) {

                console.log(Cart.cartItems);
                for (const itemId in Cart.cartItems[userId]) {
                    if (Cart.cartItems[userId].hasOwnProperty(itemId)) {
                        let itemInfo = Menu.getAllMenuItems().find(p => p.id === +itemId);
                        totalAmount += itemInfo.price * Cart.cartItems[userId][itemId];
                    }
                }
                let totalBeforeDiscount = totalAmount + Cart.DELIVERYFEE;
                let totalAfterDiscount = Discount.checkForValidDiscount(discountCode) ? totalBeforeDiscount - Discount.getDiscount(discountCode) : totalBeforeDiscount;
                Cart.cartItems.discountCode = discountCode 
                Cart.saveCart()
                return Math.round(totalAfterDiscount * 100) / 100;
            }

            else{
                return 0
            }
        }
        else{
            return 0
        }
    }

    static getCartItems(userId) {
        Cart.loadCart();
        return Cart.cartItems[userId] || {};
    }

    static saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(Cart.cartItems));
    }

    static loadCart() {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            Cart.cartItems = JSON.parse(cartItems);
        }
    }

    static init() {
        Cart.loadCart();
    }
}

Cart.init();

// // Test user IDs
// const userId1 = 11;
// // const userId2 = 1;

// // // Test item IDs
// const itemId1 = 1;
// const itemId2 = 2;
// const itemId3 = 3;

// // // Test discount code
// const discountCode = "DISCOUNT2";

// Cart.addToCart(userId1, itemId1); // Add an item for user 1
// Cart.addToCart(userId1, itemId2); // Add another item for user 1
// Cart.addToCart(userId1, itemId1); // Add an item for user 2

// // Cart.removeFromCart(userId1, itemId1); // Remove one item from user 1's cart
// Cart.removeAllFromCart(userId1); // Remove all items from user 1's cart
// // Cart.removeAllCountfromCartForAItem(userId1, itemId1); // Remove all counts of a specific item from user 2's cart


// // let id = User.loadCurrentUserFromLocalStorage().currentUser.id
// console.log(Cart.getCartItems(userId1));
// console.log(Cart.getTotalCartAmount(userId1, "DISCOUNT2")); 


