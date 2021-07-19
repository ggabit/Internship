// promise
let promise1 = new Promise(function(resolve, reject) {

    setTimeout(() => resolve("gata"), 1000);
  });

  promise1.then(
    result => console.log(result), 
    error => console.log(error) 
  );

let promise2 = new Promise(function(resolve, reject) {

    setTimeout(() => reject(new Error("eroare")), 1000);
}).finally(() => console.log("Promise ready"));

promise2.catch(console.log);

// callback 
function fun1() {
    console.log(1);
  }
  
  function fun2(callback) {
    setTimeout(() => {
      console.log(2);
      callback();
    }, 1000);
  }
  
  function fun3() {
    console.log(3);
  }

fun1();
fun2(fun3);