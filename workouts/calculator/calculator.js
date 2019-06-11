var readLine = require('readline-sync');
var num = readLine.question("Enter How many numbers to perform operation:  ");
var i = 0;
var loopArray = []
for (i = 0; i < num; i++) {
    var number = readLine.question("Enter the numbers:  ");
    loopArray.push(number);

};
console.log(loopArray);

var operation = readLine.question("Enter the operation:  ");
var result = getResult(operation, loopArray);
function getResult(operation, loopArray) {
    var result = 0;
    var result1 = 1;

    if (operation == "add") {
        for (let j in loopArray) {
            result += Number(loopArray[j]);
        }
        console.log(result);
    }


    else if (operation == "subtract") {
        result = Number(loopArray[0])
        for (let j = 1; j < loopArray.length; j++) {
            result -= Number(loopArray[j]);
        }
        console.log(result);
    }

    else if (operation == "multiply") {
        for (let j = 0; j < loopArray.length; j++) {
            result1 *= Number(loopArray[j]);
        }
        console.log(result1);
    }

    else if (operation == "divide" && number != 0 && num == 2) {
        var result2 = Number(loopArray[0]);
        for (let j = 1; j < loopArray.length; j++) {
            result2 /= Number(loopArray[j]);
        }

        console.log(result2);
    }

    else {
        console.log("Invalid operation");
    }


};
