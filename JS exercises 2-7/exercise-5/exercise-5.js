var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) { 
  var temp = [];
    for (var element in collection){
        temp.push(tranFunc(collection[element]));
    }
    return temp;
}

var output = transform(numbers, function(num) {
    return num * 2;
});

console.log(output)