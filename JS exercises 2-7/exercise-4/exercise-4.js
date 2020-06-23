var fruits = [
  {id: 1, name: 'Banana', color: 'Yellow'},
  {id: 2, name: 'Apple', color: 'Red'}
]

function searchByName(obj, req_name){
  for (var fruit in obj){
    if (obj[fruit].name.toUpperCase() == req_name.toUpperCase()){
        return (obj[fruit]);
    }
  }
}

function searchByKey(obj, key, req_name){
  for (var fruit in obj){
    if (obj[fruit][key].toUpperCase() == req_name.toUpperCase()){
        return (obj[fruit]);
    }
  }
}

console.log(searchByName(fruits, 'apple'));

console.log(searchByKey(fruits, 'name', 'apple'));