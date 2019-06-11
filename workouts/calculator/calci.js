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
//var result = getResult(operation, loopArray);
function getResult(operation, loopArray) {
    var result = 0;

    if (operation == "add") {
        result = loopArray.reduce(myFunction);
        console.log(result);

        function myFunction(value1, value2) {
            return Number(value1) + Number(value2);
        }

    }


    else if (operation == "subtract") {
        result = loopArray.reduce(myFunction);
        console.log(result);

        function myFunction(value1, value2) {
            return value1 - value2;
        }


    }

    else if (operation == "multiply") {
        result = loopArray.reduce(myFunction);
        console.log(result);

        function myFunction(value1, value2) {
            return value1 * value2;
        }


    }

    else if (operation == "divide" && number != 0 && num == 2){
        result = loopArray.reduce(myFunction);
        console.log(result);

        function myFunction(value1, value2) {
            return value1 / value2;
        }
    }
    else{
        console.log("Invalid operation");
    }
        
    };