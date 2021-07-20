// #1
function sum(x, y, z) {
    for(let arg of arguments) console.log(arg);

    return x + y + z;
 }

let num = [0, 1, 2];
console.log("Suma: "+sum(...num));

// #2
function getMasini(nume, prenume, ...masini) { // rest parameters
    console.log( nume + ' ' + prenume );

    for (let m of masini) console.log( m );
    console.log( "Numar masini: "+masini.length );
  }
  
  getMasini("Cuzic", "Gabriela", "Renault", "Peugeot");

  // #3
  let a1 = [1,5,6,-4];
  let a2 = [-100,2,0,7];
  console.log("Minimul"+Math.min(100, ...a1, ...a2));