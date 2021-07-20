// closures

// #1
function f1() {
    var nume = 'Gabriela'; // var locala in f1
    function f2() { // f2 closure = function + lexical environment 
      console.log(nume);
    }
    f2();
  }
  f1();

// #2
function getSum(x) {
    return function(y) {
      return x + y;
    };
  }
  
  var plus5 = getSum(5); // x=5
  var plus10 = getSum(10); // x=10
  
  console.log(plus5(1));  // 6
  console.log(plus10(1)); // 11
