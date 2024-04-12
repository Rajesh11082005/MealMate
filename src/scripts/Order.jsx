import { Cart } from "./Cart.jsx";
import Menu from "./Menu.jsx";
import { User } from "./User.jsx";


export default class Order {
    static orderList = [];

    static OrderProgress = {
        1: "Your order is being prepared.",
        2: "Your order is being packed.",
        3: "Your order is on its way to be delivered.",
        4: "Your order has been successfully delivered.",
    };

    constructor(deliveryDetails, cartItems, paymentMethod) {
        this.id = Menu.generateIdForItem(Order.orderList);
        this.deliveryDetails = Order.createDeliveryDetails(deliveryDetails);
        this.orderProgress = 1;
        this.orderTiming = Order.orderTiming();
        this.paymenMethod = Order.paymenDetails(paymentMethod);
        this.cartDetails = cartItems
        this.totalFee = Cart.getTotalCartAmount(deliveryDetails.currentUser.id, Cart.cartItems.discountCode)
    }

    static createOrder(details, cartItems, method){
        let order = new Order(details, cartItems, method);
        Order.orderList.push(order);
        Order.addToLocalStorage();
        Order.getFromLocalStorage();
    }

    static createDeliveryDetails(deliveryDetails) {
        return new Delivery(deliveryDetails.name, deliveryDetails.email, deliveryDetails.street, deliveryDetails.city, deliveryDetails.state, deliveryDetails.pinCode, deliveryDetails.country, deliveryDetails.phone);
    }

    static switchOrderProgress(id) {
        let order = this.orderList.find(order => order.id === id);
        if (order) {
            if (order.orderProgress < 4) {
                order.orderProgress++;
                Order.addToLocalStorage();
            }
        }
    }

    static orderTiming() {
        return {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
        };
    }

    static paymenDetails(method) {
        // to do
        return PaymentMethods.paymentMethods[method]
    }

    static addToLocalStorage() {
        localStorage.setItem("orderList", JSON.stringify(Order.orderList));
    }

    static getFromLocalStorage() {
        const order = localStorage.getItem("orderList");
        if (order) {
            Order.orderList = JSON.parse(order);
            return Order.orderList;
        }
    }

}

export class Delivery {
    constructor(name, email, street, city, state, pinCode, country, phone) {
        this.name = name;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
        this.country = country;
        this.phone = phone;
        this.currentUser = User.loadCurrentUserFromLocalStorage().currentUser;
    }
}

export class PaymentMethods{
    static paymentMethods = {
        1 : "UPI Payment",
        2 : "Credit/Debit Card Payment",
        3 : "Amazon Pay",
        4 : "COD (Cash On Delivery)"
    }
}

// Sample delivery details
// const deliveryDetails = {
//     name: "John Doe",
//     email: "john@example.com",
//     street: "123 Main St",
//     city: "New York",
//     state: "NY",
//     pinCode: "10001",
//     country: "USA",
//     phone: "123-456-7890",
//     currentUser: User.loadCurrentUserFromLocalStorage().currentUser// Load a sample user from local storage
// };
// Order.init();
// Order.getFromLocalStorage();
// Order.switchOrderProgress(1)
// console.log(Order.orderList);

