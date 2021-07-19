 // declarations processed at function start/script start
var x = 10; // ignores block
var y = 10;
// Here x is 10
{
  let x = 2; // visible only inside block
  const Y = 2; // value cannot be changed
}
console.log(x);
// x is visible after block, is global if declared outside function

function fun() {
    if (true) {
      var salut = "Buna"; // processed at function start
      var salut = "Hello"; // no error
    }
  
    console.log(salut); // works, salut is function-level
  }
  
  fun();
  //console.log(salut); // ReferenceError: salut is not defined