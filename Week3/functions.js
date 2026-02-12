function addNumbers(a,b) {
    let product = a+b;
    return product;
}

let result = addNumbers(addNumbers(1,1), 3); // Returns 5

// console.log(result);


function greet(name){
    return `Hello, ${name}!`;
}

let greeting = greet("Mia");
console.log(greeting); // Returns "Hello, Mia!"

const greet = (name) => `Hello, ${name}!`;
