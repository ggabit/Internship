// async, await
function fun() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('gata');
    }, 2000);
  });
}

async function asyncFun() {
  console.log('apelare..');
  const result = await fun();
  console.log(result);
}

asyncFun();
