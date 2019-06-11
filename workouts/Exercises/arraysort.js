var person=[{name:"Pavithra", rollno:34,std_id:4},{name:"Arul",rollno:23,std_id:3},
    {name:"Ajith",rollno:45,std_id:1},{name:"Puppy",rollno:56,std_id:5},{name:"Ammu",rollno:43,std_id:2}];
var sortbyperson = person.sort(function(a,b){
    return a.std_id-b.std_id;
    
});
//console.log(sortbyperson);
var i=0;
let inArray=[];
while(i<person.length){
    inArray.push ( sortbyperson.slice(i,i+2));
    i += 2;
}

console.log(inArray);
var msg = "Hello World!";
var x= msg.split('').reverse().join('');
console.log(x);
