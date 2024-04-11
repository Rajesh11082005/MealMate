import { assets } from "../assets/assets";

export default class Menu {
    static MenuList = [];
    static STORAGE_KEY = "MenuList";

    constructor(name, desc, image, price, category) {
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.category = category;
        this.price = price;
        this.id = Menu.generateIdForItem(Menu.MenuList);
    }

    //client methods

    static getAllMenuItems() {
        Menu.loadMenuFromLocalStorage();
        return Menu.MenuList;
    }

    static getMenuItemsByCategory(category) {
        Menu.loadMenuFromLocalStorage();
        return Menu.MenuList.filter(item => item.category === category);
    }

    //admin methods

    static generateIdForItem(array) {
        return array.length === 0 ? 1 : array[array.length - 1].id + 1;
    }


    static addMenuItem(name, desc, image, price, category) {
        try {
            const item = new Menu(name, desc, image, price, category);
            Menu.MenuList.push(item);
            Menu.saveMenuToLocalStorage();
            Menu.loadMenuFromLocalStorage();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static removeMenuItem(id) {
        try {
            Menu.MenuList = Menu.MenuList.filter(item => item.id !== id);
            Menu.saveMenuToLocalStorage();
            Menu.loadMenuFromLocalStorage();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static updateMenu(id, change, toChange) {
        try {
            const item = Menu.MenuList.find(item => item.id === id);
            if (item) {
                item[toChange] = change;
                Menu.saveMenuToLocalStorage();
                Menu.loadMenuFromLocalStorage();
                return true;
            } else {
                throw new Error("Item not found");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static saveMenuToLocalStorage() {
        localStorage.setItem(Menu.STORAGE_KEY, JSON.stringify(Menu.MenuList));
    }

    static loadMenuFromLocalStorage() {
        const menu = localStorage.getItem(Menu.STORAGE_KEY);
        if (menu) {
            Menu.MenuList = JSON.parse(menu);
        }
    }

    static init() {
        Menu.loadMenuFromLocalStorage();

        if (Menu.MenuList.length === 0) {
            this.MenuList = [
                {
                    "name": "Mozzarella Sticks",
                    "desc": "Fried cheese sticks served with marinara sauce.",
                    "image": assets.placeHolder,
                    "category": "Appetizers",
                    "price": 7.99,
                    "id": 1
                },
                {
                    "name": "Chicken Wings",
                    "desc": "Spicy chicken wings served with blue cheese dressing.",
                    "image": assets.placeHolder,
                    "category": "Appetizers",
                    "price": 9.99,
                    "id": 2
                },
                {
                    "name": "Caesar Salad",
                    "desc": "Fresh romaine lettuce, croutons, parmesan cheese, and Caesar dressing.",
                    "image": assets.placeHolder,
                    "category": "Salads",
                    "price": 8.49,
                    "id": 3
                },
                {
                    "name": "Margherita Pizza",
                    "desc": "Traditional Italian pizza topped with tomato sauce, mozzarella, and basil.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 12.99,
                    "id": 4
                },
                {
                    "name": "Chocolate Lava Cake",
                    "desc": "Warm chocolate cake with a molten chocolate center.",
                    "image": assets.placeHolder,
                    "category": "Desserts",
                    "price": 6.99,
                    "id": 5
                },
                {
                    "name": "Iced Tea",
                    "desc": "Refreshing iced tea served with lemon slices.",
                    "image": assets.placeHolder,
                    "category": "Beverages",
                    "price": 2.49,
                    "id": 6
                },
                {
                    "name": "Pancakes",
                    "desc": "Fluffy pancakes served with maple syrup.",
                    "image": assets.placeHolder,
                    "category": "Breakfast",
                    "price": 5.99,
                    "id": 7
                },
                {
                    "name": "Cheeseburger",
                    "desc": "Juicy beef patty topped with cheese, lettuce, tomato, and pickles.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 10.49,
                    "id": 8
                },
                {
                    "name": "French Fries",
                    "desc": "Crispy golden fries served with ketchup.",
                    "image": assets.placeHolder,
                    "category": "Snacks",
                    "price": 3.49,
                    "id": 9
                },
                {
                    "name": "Fruit Salad",
                    "desc": "Fresh assortment of seasonal fruits.",
                    "image": assets.placeHolder,
                    "category": "Salads",
                    "price": 4.99,
                    "id": 10
                },
                {
                    "name": "Smoothie",
                    "desc": "Blended fruit smoothie with yogurt.",
                    "image": assets.placeHolder,
                    "category": "Beverages",
                    "price": 5.49,
                    "id": 11
                },
                {
                    "name": "Nachos",
                    "desc": "Crispy tortilla chips topped with melted cheese, salsa, and jalapenos.",
                    "image": assets.placeHolder,
                    "category": "Appetizers",
                    "price": 8.99,
                    "id": 12
                },
                {
                    "name": "Club Sandwich",
                    "desc": "Triple-decker sandwich with turkey, bacon, lettuce, tomato, and mayo.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 11.99,
                    "id": 13
                },
                {
                    "name": "Fried Rice",
                    "desc": "Stir-fried rice with vegetables and choice of protein.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 9.99,
                    "id": 14
                },
                {
                    "name": "Cheesecake",
                    "desc": "Creamy cheesecake with graham cracker crust.",
                    "image": assets.placeHolder,
                    "category": "Desserts",
                    "price": 7.49,
                    "id": 15
                },
                {
                    "name": "Chicken Caesar Wrap",
                    "desc": "Grilled chicken, romaine lettuce, parmesan cheese, and Caesar dressing wrapped in a tortilla.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 9.49,
                    "id": 16
                },
                {
                    "name": "Margarita",
                    "desc": "Classic margarita with tequila, lime juice, and triple sec.",
                    "image": assets.placeHolder,
                    "category": "Beverages",
                    "price": 7.99,
                    "id": 17
                },
                {
                    "name": "Onion Rings",
                    "desc": "Crispy battered onion rings served with dipping sauce.",
                    "image": assets.placeHolder,
                    "category": "Appetizers",
                    "price": 6.49,
                    "id": 18
                },
                {
                    "name": "Caprese Salad",
                    "desc": "Fresh tomatoes, mozzarella cheese, basil, and balsamic glaze.",
                    "image": assets.placeHolder,
                    "category": "Salads",
                    "price": 7.99,
                    "id": 19
                },
                {
                    "name": "Hot Chocolate",
                    "desc": "Rich and creamy hot chocolate topped with whipped cream.",
                    "image": assets.placeHolder,
                    "category": "Beverages",
                    "price": 3.99,
                    "id": 20
                },
                {
                    "name": "Grilled Cheese Sandwich",
                    "desc": "Buttered bread with melted cheese.",
                    "image": assets.placeHolder,
                    "category": "Snacks",
                    "price": 4.99,
                    "id": 21
                },
                {
                    "name": "Fettuccine Alfredo",
                    "desc": "Creamy Alfredo sauce served over fettuccine pasta.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 13.99,
                    "id": 22
                },
                {
                    "name": "Cobb Salad",
                    "desc": "Mixed greens topped with grilled chicken, avocado, bacon, eggs, and blue cheese.",
                    "image": assets.placeHolder,
                    "category": "Salads",
                    "price": 10.99,
                    "id": 23
                },
                {
                    "name": "Cappuccino",
                    "desc": "Espresso with steamed milk and froth.",
                    "image": assets.placeHolder,
                    "category": "Beverages",
                    "price": 4.49,
                    "id": 24
                },
                {
                    "name": "Chips and Salsa",
                    "desc": "Tortilla chips served with salsa.",
                    "image": assets.placeHolder,
                    "category": "Appetizers",
                    "price": 5.99,
                    "id": 25
                },
                {
                    "name": "Omelette",
                    "desc": "Fluffy omelette with choice of fillings.",
                    "image": assets.placeHolder,
                    "category": "Breakfast",
                    "price": 8.99,
                    "id": 26
                },
                {
                    "name": "Fish Tacos",
                    "desc": "Grilled fish served in soft tortillas with cabbage slaw and avocado crema.",
                    "image": assets.placeHolder,
                    "category": "Main Course",
                    "price": 11.49,
                    "id": 27
                },
                {
                    "name": "Brownie Sundae",
                    "desc": "Warm brownie topped with vanilla ice cream and chocolate sauce.",
                    "image": assets.placeHolder,
                    "category": "Desserts",
                    "price": 8.99,
                    "id": 28
                },
                {
                    "name": "Lemonade",
                    "desc": "Refreshing lemonade served with lemon slices.",
                    "image": assets.placeHolder,
                    "category": "Beverages",
                    "price": 2.99,
                    "id": 29
                },
                {
                    "name": "Chicken Quesadilla",
                    "desc": "Grilled chicken and melted cheese stuffed in a flour tortilla.",
                    "image": assets.placeHolder,
                    "category": "Appetizers",
                    "price": 9.49,
                    "id": 30
                }
            ]
            
            Menu.saveMenuToLocalStorage();
        }
    }
}

export class Category {
    static categoryList = [];
    static STORAGE_KEY = "CategoryList"

    constructor(category, categoryImage) {
        this.category = category;
        this.categoryImage = categoryImage;
        this.id = Menu.generateIdForItem(Category.categoryList);
    }

    static getCategories() {
        Category.loadCategoriesFromLocalStorage();
        return Category.categoryList;
    }

    static isCategoryAlreadyExists(category) {
        Category.loadCategoriesFromLocalStorage();
        return Category.categoryList.some(c => c.category === category);
    }

    static addCategory(category, categoryImage) {
        try {
            if (!Category.isCategoryAlreadyExists(category)) {
                const newCategory = new Category(category, categoryImage);
                Category.categoryList.push(newCategory);
                Category.saveCategoriesToLocalStorage();
                Category.loadCategoriesFromLocalStorage();
                return true;
            } else {
                throw new Error("Category already exists!");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static removeCategory(id) {
        try {
            Category.categoryList = Category.categoryList.filter(item => item.id !== id);
            Category.saveCategoriesToLocalStorage();
            Category.loadCategoriesFromLocalStorage();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static updateCategoryImage(id, newImage) {
        try {
            const category = Category.categoryList.find(item => item.id === id);
            if (category) {
                category.categoryImage = newImage;
                Category.saveCategoriesToLocalStorage();
                Category.loadCategoriesFromLocalStorage();
                return true;
            } else {
                throw new Error("Category not found");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static saveCategoriesToLocalStorage() {
        localStorage.setItem(Category.STORAGE_KEY, JSON.stringify(Category.categoryList));
    }

    static loadCategoriesFromLocalStorage() {
        const category = localStorage.getItem(Category.STORAGE_KEY);
        if (category) {
            Category.categoryList = JSON.parse(category);
        }
    }

    static init() {
        Category.loadCategoriesFromLocalStorage();

        if (Category.categoryList.length === 0) {
            this.categoryList = [
                {
                    "category": "Appetizers",
                    "categoryImage": assets.placeHolder,
                    "id": 1
                },
                {
                    "category": "Main Course",
                    "categoryImage": assets.placeHolder,
                    "id": 2
                },
                {
                    "category": "Desserts",
                    "categoryImage": assets.placeHolder,
                    "id": 3
                },
                {
                    "category": "Beverages",
                    "categoryImage": assets.placeHolder,
                    "id": 4
                },
                {
                    "category": "Salads",
                    "categoryImage": assets.placeHolder,
                    "id": 5
                },
                {
                    "category": "Snacks",
                    "categoryImage": assets.placeHolder,
                    "id": 6
                },
                {
                    "category": "Breakfast",
                    "categoryImage": assets.placeHolder,
                    "id": 7
                }
            ]
            
            Category.saveCategoriesToLocalStorage();
        }
    }
}

Menu.init();
Category.init();


