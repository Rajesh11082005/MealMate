import Menu from "./Menu.jsx"
// import MenuItem from "./menuList.json"

export class User {
    static STORAGE_KEY = "users";
    static Users = [];
    static currentUser = {
        id : 0,
        username : "guest"
    };

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = Menu.generateIdForItem(User.Users);
    }

    static isValidPassword(password) {
        let re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        return re.test(password);
    }

    static isEmailAlreadyExist(email) {
        User.loadUsersFromLocalStorage();
        return User.Users.some(user => user.email === email || user.email === "admin1@mealmate.com");
    }

    static registerUser(username, email, password, stateCallback) {
        
        if (User.isEmailAlreadyExist(email)) {
            throw new Error("Email already exists");
        }
        else{
            let user = new User(username, email, password)
            this.Users.push(user);
            this.currentUser = user
            User.saveCurrentUserToLocalStorage(user)
            User.saveUsersToLocalStorage();
            User.setCurrentUser();
            stateCallback(this.currentUser)
        }
    }

    static authenticateUser(email, password, stateCallback) {
        User.loadUsersFromLocalStorage()
        if (email === "admin1@mealmate.com" && password === "Admin123./") {
            return true;
        } else {
            const user = this.Users.find(user => user.email === email);
            console.log(this.Users);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.password === password){
                this.currentUser = user
                User.saveCurrentUserToLocalStorage(user)
                User.setCurrentUser();
                stateCallback(this.currentUser)
                return true
            }
            else{
                return false
            }
        }
    }

    static saveUsersToLocalStorage() {
        localStorage.setItem(User.STORAGE_KEY, JSON.stringify(User.Users));
    }

    static loadUsersFromLocalStorage() {
        const users = localStorage.getItem(User.STORAGE_KEY);
        if (users) {
            User.Users = JSON.parse(users);
        }
    }


    static saveCurrentUserToLocalStorage(currentUser) {
        localStorage.setItem("currentUser", JSON.stringify({currentUser : currentUser}));
    }

    static loadCurrentUserFromLocalStorage() {
        const user = localStorage.getItem("currentUser");
        if (user) {
           return JSON.parse(user)
        }
        else{
            return false
        }
    }

    static setCurrentUser(){
        const user = User.loadCurrentUserFromLocalStorage()
        User.currentUser = user
    }

    static init(){
        User.loadUsersFromLocalStorage();

        if (User.Users.length === 0) {
            const testUsers = [
               {
                id : 0,
                username : "guest"
               }
            ];
            User.Users = testUsers;

            User.saveUsersToLocalStorage();
            User.saveCurrentUserToLocalStorage(User.currentUser);
        }


    }

    // static init() {

    //     User.loadUsersFromLocalStorage();

    //     if (User.Users.length === 0) {
    //         const testUsers = [
    //             { id: 1, username: "user1", email: "user1@example.com", password: "Test123!" },
    //             { id: 2, username: "user2", email: "user2@example.com", password: "Password123!" },
    //             { id: 3, username: "user3", email: "user3@example.com", password: "SecurePwd456!" },
    //             { id: 4, username: "user4", email: "user4@example.com", password: "SecretPass789!" },
    //             { id: 5, username: "user5", email: "user5@example.com", password: "StrongPwd321!" },
    //             { id: 6, username: "user6", email: "user6@example.com", password: "SafePassword987!" },
    //             { id: 7, username: "user7", email: "user7@example.com", password: "TestPass123!" },
    //             { id: 8, username: "user8", email: "user8@example.com", password: "SecurePassword456!" },
    //             { id: 9, username: "user9", email: "user9@example.com", password: "StrongPwd789!" },
    //             { id: 10, username: "user10", email: "user10@example.com", password: "SafePass321!" }
    //         ];
    //         User.Users = testUsers;

    //         User.saveUsersToLocalStorage();
    //     }
    // }
}

// Initialize users and use localStorage if available
User.init();
// console.log(User.Users);

// // Register a new user
// User.registerUser("Rajesh P", "rajesh007@gmail.com", "Rajesh@123");
// console.log(User.Users);

// // Check if email already exists
// console.log(User.isEmailAlreadyExist("admin1@mealmate.com"));

// // Authenticate user
// console.log(User.authenticateUser("user2@example.com", "Password123!"));

