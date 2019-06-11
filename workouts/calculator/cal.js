var readLine = require('readline-sync');
var num = readLine.question("Enter How many numbers to perform operation:  ");
var i = 0;
var loopArray = []
for (i = 0; i < num; i++) {
    var number = readLine.question("Enter the numbers:  ");
    loopArray.push(number);

};
console.log(loopArray);
var operation = readLine.question("enter the operation to perform ");
var result = myFunction();
var result = 0;
result = loopArray.reduce(myFunction);
console.log(result);
function myFunction(value1, value2) {
    switch (operation) {
        case "add":
            return Number(value1) + Number(value2);
            break;

        case "subtract":
            return value1 - value2;
            break;

        case "multiply":
            return value1 * value2;
            break;

        case "divide":
            return value1 / value2;
            break;

        default:
            console.log("Invalid operation");
    }

};