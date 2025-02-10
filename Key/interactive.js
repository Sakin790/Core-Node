const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let num1, num2;

rl.question('Enter the first number: ', (answer) => {
  num1 = parseInt(answer);
  rl.question('Enter the second number: ', (answer) => {
    num2 = parseInt(answer);
    const sum = num1 + num2;
    console.log(`The sum is: ${sum}`);
    rl.close();
  });
});