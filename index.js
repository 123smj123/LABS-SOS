let myDouble=2.2;
myDouble = myDouble + 1;


let var1 = 1;
let var2 = "1";

/*if (var1 === var2)
    console.log("var1 and var2 are equal");
else
    console.log("var1 and var2 are not equal");
*/
function log(msg) {
    console.log(msg);
}

function add(a, b) {
    return a + b;
}

//log(add(1, 2));

let otherNumbers = [1, 2, 3];
//log(otherNumbers.length);   
let numbers = new Array(1,2,3,4,5);
numbers.push(6);
numbers[0] = 0;

//log(numbers);

let things = [1, "two", [3, 4], 5.5];
//log(things);

/*for(let i = 0; i < things.length; i++) {
    log(things[i]);
}

for (let thing of things) {
    log(thing);
}*/

// ITERADORES

numbers.forEach(log);

numbers.forEach(function /*se puede nombrar o no a la funcion*/(num){
    log(num + 1);
});

numbers.forEach(num => log(num + 1));

let evenNumbers =numbers.filter(num => num % 2 === 0);

log(evenNumbers);

numbers.filter(num => num > 3).forEach(log);

numbers
    .map(num => num * 2)
    .filter(num => num > 5)
    .forEach(log);   

let s = numbers.reduce((acc, num) => acc + num, 0);

log(s);

// OBJETOS

let myObject = new Object();
myObject.attribute = 1;

let contact1 = new Object();
contact1.name = "John Doe";
contact1.phone = "1233456789";

let contact2 = {
    name: "Jane Doe",
    phone: "9876543210",
    children: {
        name: "Jack Doe",
        toys: ["car", "doll"]
    }
};

log(contact1);
log(contact2);

contact1.print = function() {
    log(this.name + ": " + this.phone);
}