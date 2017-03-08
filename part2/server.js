//Module definitions
const express = require('express');
const http = require("http");
const app = express();
const employees = require ('./employeeModule.js');

//Handlebar setup
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Body-parser setup
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Static resources reference
app.use(express.static(__dirname + '/public'));

//Get request definitions
//Homepage
app.get('/', (req, res) => {
  res.render('homepage', {
    employees: employees.getAllEmployees()
  });
});

//Employee Info Page
app.get('/id/:eid', (req, res) => {
  res.format({

    'application/json': () => {
      res.json(employees.lookupById(req.params.eid));
    },

    'application/xml': () => {
      let employee = employees.lookupById(req.params.eid);
      let employeeXml =
        '<?xml version="1.0"?>\n' +
        '<employee id ="' + employee.id + '">\n' +
        ' <firstName>' + employee.firstName + '</firstName>\n' +
        ' <lastName>' + employee.lastName + '</lastName>\n' +
        '</employee>';
      res.type('application/xml');
      res.send(employeeXml);
    },

    'text/html': () => {
      res.render('employee', {
        employee: employees.lookupById(req.params.eid)
      });
    }
  });
});

//Employee List by Last Name
app.get('/lastName/:name', (req, res) => {
  res.format({

    'application/json': () => {
      res.json(employees.lookupByLastName(req.params.name));
    },

    'application/xml': () => {
      let employeesXml =
        '<xml version="1.0">\n<employees>\n' +
          employees.lookupByLastName(req.params.name).map(function(e){
            return ' <employee id="' + e.id + '">\n' +
            '   <firstName>' + e.firstName + '</firstName>\n' +
            '   <lastName>' + e.lastName + '</lastName>\n' +
            ' </employee>';
          }).join('\n') + '\n</employees>\n';
      res.type('application/xml');
      res.send(employeesXml);
    },

    'text/html': () => {
      res.render('employeeList', {
        lastName: req.params.name,
        employees: employees.lookupByLastName(req.params.name)
      });
    }
  });
});

//Add New Employee Form
app.get('/addEmployee/', (req, res) => {
  res.render('addEmployee')
});

app.post('/addEmployee/', (req, res) => {
  employees.addEmployee(req.body.firstname, req.body.lastname);
  res.redirect(('/lastName/') + req.body.lastname);
});

//Search by last name form
app.get('/nameSearch', (req, res) => {
  const lastName = req.query.lname
  res.redirect(('/lastName/') + lastName);
})

//Default 404 Page
app.use((req, res) => {
  res.type('text/html');
  res.status(404);
  res.send("<u>Error - 404 Not Found</u>");
});

//Server listening to port
app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
