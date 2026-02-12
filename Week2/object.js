//non-primitive data type: Objects are used to store collections of data and more complex entities.
let person = {
    firstName: "Alice",
    lastName: "Smith",
    age: 30,
    isEmployed: true,
    friends:{
        firstFriend: "Bob",
        secondFriend: "Charlie"
    },
    address: {
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345"
    }
};

person.email = "asmith@miami.edu"; // Adding a new property

console.log(`First Name: ${person.firstName}`); // Accessing properties
console.log(`Last Name: ${person.lastName}`);
console.log(`Address Street: ${person.address.street}`);
console.log(`Email: ${person.email}`);

let person2 = {};
person2.firstName = "David";
person2.lastName = "Johnson";
person2.age = 25;