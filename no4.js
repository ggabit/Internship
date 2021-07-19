// obiecte
let caine = {
    nume: "Otto",
    varsta: 6,
    "are alergii": true  // quoted multiword prop
  };

console.log(caine.nume);
console.log(caine["nume"]);
console.log(caine["are alergii"]);
console.log( "rasa" in caine );

delete caine["are alergii"];


// cum iterez
for (let key in caine) {
    // nume
    console.log( key );  // nume, varsta, are alergii
    // valori
    console.log( caine[key] ); // Otto, 6, true
  }

// copy 
let caine2 = caine; // referinta la acelasi obiect
caine2.nume = "Nemo";
console.log(caine.nume); // schimbari in caine

// clone
let clone = {};
for (let key in caine) {
  clone[key] = caine[key];
  clone.nume = "Nostradamus";
  console.log(caine.nume); // nu produce schimbari in caine
}

