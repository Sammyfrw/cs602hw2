//package requirement definition
const _ = require('underscore');

//employee data definition
const employeeData = [
  {id:1, firstName: 'John', lastName: 'Smith'},
  {id:2, firstName: 'Jane', lastName: 'Smith'},
  {id:3, firstName: 'John', lastName: 'Doe'}
  ];

//function definitions

//lookup by id; where an id is found, that employee's object is returned
var lookupById = (pid) => {
  employee = _.findWhere(employeeData, {id: parseInt(pid)});
  return JSON.parse(JSON.stringify(employee));
};

//Lookup by lastName; where names are found that object is added to an array which is later returned
var lookupByLastName = (name) => {
  employeeList = _.where(employeeData, {lastName: name})
  return employeeList;
};

//Add a new employee with the new first and last name; an ID is supplied
var addEmployee = (newFirstName, newLastName) => {

  //Plucking list of all ids to find max ID; set new ID to 1 if array is empty
  idList = _.pluck(employeeData, 'id');
  if (_.isEmpty(idList)) {
    newId = 1;
  }  else {
    newId = _.max(idList) + 1;
  }

  //Create new employee and add to array
  newEmployee = {id: newId, firstName: newFirstName, lastName: newLastName};
  employeeData.push(newEmployee);
  console.log("Successfully added new employee with data:");
  console.log(newEmployee);
};

var getAllEmployees = () => {
  let result = JSON.parse(JSON.stringify(employeeData));
  return result;
}

//exporting functions
module.exports = {
  lookupById,
  lookupByLastName,
  addEmployee,
  getAllEmployees
}
