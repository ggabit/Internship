// ES6

// assign
let caine1 = {
    nume: "Otto",
    varsta: 6,
    "are alergii": true  // quoted multiword prop
};

let caine2 = {
    nume: "Nemo",
    varsta: 3,
    "are alergii": false
};

Object.assign({},caine2, caine1); // merge same prop

console.log(caine2);

// findIndex
let litere = ['a','b','c','d','e']

console.log(litere.find( x => x == 'b'));
console.log(litere.findIndex(x => x == 'b'));

// String repeating
let str = 'ba';
str += 'na'.repeat(2);
console.log(str);

// String searching
console.log("Gabriela".startsWith("abr", 1));
console.log("Gabriela".endsWith("ela", 8));
console.log("Gabriela".includes("brie", 1));
console.log("Gabriela".includes("brie", 4)); //false

// Number Type check
console.log("Number Type check:");
console.log(Number.isNaN(13)); 
console.log(Number.isNaN(NaN)); 
console.log(Number.isFinite(13)); 
console.log(Number.isFinite(-Infinity)); 

// Number Sign
console.log("Number Sign:"); 
console.log(Math.sign(13));
console.log(Math.sign(-13));
console.log(Math.sign(0));
console.log(Math.sign(-Infinity));
console.log(Math.sign(NaN));

