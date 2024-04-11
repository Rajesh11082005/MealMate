export class Discount {
    static discountList = {};

    static addDiscount(discountCode, discountPrice) {
        try {
            if (!this.checkForDiscountAlreadyExists(discountCode)) {
                this.discountList[discountCode] = discountPrice;
                Discount.storeDiscountInLocalStorage();
                return true;
            } else {
                throw new Error("Discount code already exists!");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static removeDiscount(discountCode) {
        try {
            if (this.checkForDiscountAlreadyExists(discountCode)) {
                delete this.discountList[discountCode];
                Discount.storeDiscountInLocalStorage();
                return true;
            } else {
                throw new Error("Discount code does not exist!");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static checkForDiscountAlreadyExists(discountCode) {
        // Discount.loadDiscountFromLocalStorage()
        return this.discountList.hasOwnProperty(discountCode);
    }

    static storeDiscountInLocalStorage(){
        localStorage.setItem("discountCodes", JSON.stringify(this.discountList));
    }

    static loadDiscountFromLocalStorage(){
        const dCodes = localStorage.getItem("discountCodes");
        if (dCodes) {
            this.discountList = JSON.parse(dCodes);
        }
    }

    static getDiscount(discountCode) {
        Discount.loadDiscountFromLocalStorage()
        try {
            if (this.checkForDiscountAlreadyExists(discountCode)) {
                return this.discountList[discountCode];
            } else {
                throw new Error("Discount code does not exist!");
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static init() {
        if (Object.keys(this.discountList).length === 0) {
            this.addDiscount("DISCOUNT2", 2);
            this.addDiscount("DISCOUNT5", 5); 
        }
    }

    static checkForValidDiscount(discountCode) {
        return this.checkForDiscountAlreadyExists(discountCode);
    }
}

Discount.init();

export default Discount;
