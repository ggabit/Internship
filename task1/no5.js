// mutator methods
let animals = ["cat", "dog", "parrot"];

console.log(animals.pop());
console.log(animals.toString());

animals.push("bunny")
console.log(animals.toString());

console.log(animals.shift());
console.log(animals.toString());

animals.unshift("cow");

animals.splice(1, 0, "fish");
console.log(animals.toString());

animals.reverse();
console.log(animals.toString());

animals.fill("Shark", 1, 3);
console.log(animals.toString());

animals.sort();
console.log(animals.toString());

//iteration
for (let animal of animals) {
    console.log( animal );
  }

for (let key in animals) { // slower
    console.log( animals[key] ); 
}

// accessor methods
let dulciuri = [ "inghetata", "prajitura", "ciocolata" ];
let fructe = [ "banana", "mar", "portocala" ];
let mancare = dulciuri.concat(fructe);
console.log( mancare.toString() );

let fructeStr = fructe.join(';');
console.log(fructeStr);

let totFructe = mancare.slice(3);
console.log(totFructe.toString());

console.log("Indexul pt mar:"+mancare.indexOf("mar"));

mancare.push("mar");
console.log( mancare.toString() );
console.log("Ultimul index pt mar:"+mancare.lastIndexOf("mar"));