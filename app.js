let persons = [
    {firstName: "shahin", lastName: 'kadkhodei', age: 20, nationalCode: 5658997, status: "single"},
    {firstName: "komeil", lastName: 'mehranfar', age: 30, nationalCode: 8897741, status: "single"},
    {firstName: "alireza ", lastName: 'rezaei', age: 45, nationalCode: 5651357, status: "maried"},
    {firstName: "behrooz ", lastName: 'latifi', age: 10, nationalCode: 3239687, status: "single"},
];

let table = document.getElementById('table');
currentObjIndex = null;
const firstName = document.getElementById('FirstName')
const lastName = document.getElementById('LastName')
const age = document.getElementById('Birthday')
const nationalCode = document.getElementById('NationalCode')
const status = document.getElementById('Status')


function getElements(){
    let obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
        nationalCode: nationalCode.value,
        status: status.value,
    }
    return obj;
}

function addRow(){
    let newObj = getElements();
    if(!newObj.firstName || !newObj.lastName || !newObj.age || !newObj.nationalCode || !newObj.status ){
        alert("please fill all the input");
        return;
    }
    persons.push(newObj)
    loadTableData(persons)

}


function loadTableData(personsData){
    let dataHtml = `<tr><th>FirstName</th><th>LastName</th><th>Birthday</th><th>NationalCode</th><th>Status</th></tr>`;
    for(let person of personsData){
        dataHtml += `<tr><td>${person.firstName}</td><td>${person.lastName}</td><td>${person.age}</td><td>${person.nationalCode}</td><td>${person.status}</td></tr>`;
    }
    table.innerHTML = dataHtml;
    eventHandler()
}loadTableData(persons);


function eventHandler(){
    for(let i = 1; i < table.rows.length; i++){
        table.rows[i].onclick = function(){
            let currentObj = persons.find((person,index) => index == i-1)
            currentObjIndex = i-1;
            fillEditMode(currentObj)
        }
    }
}
eventHandler()

function fillEditMode(obj){
    firstName.value = obj.firstName;
    lastName.value = obj.lastName;
    age.value = obj.age;
    nationalCode.value = obj.nationalCode;
    status.value = obj.status;
}


function editRow(){
    let currentObj = {...getElements()}
    persons[currentObjIndex] = currentObj;
    loadTableData(persons)
}


function deleteRow(){
    persons.splice(currentObjIndex, 1);
    firstName.value = "";
    lastName.value = "";
    age.value = "";
    nationalCode.value = "";
    status.value = "";
    loadTableData(persons)
}


function sortByName(){   
    persons.sort(function(a, b){
        let nameA = a.firstName;
        let nameB = b.firstName;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    })
    loadTableData(persons)
}


function sortByAge(){   
    persons.sort(function(a, b){return a.age - b.age})
    loadTableData(persons)
}


function filterRow(event){
    const val = event.target.value;
    const personsData = persons.filter(person => {
        for(let item in person){
            if(person[item].toString().search(val) > -1){
                return true
            }
        }
    })
    loadTableData(personsData)
}