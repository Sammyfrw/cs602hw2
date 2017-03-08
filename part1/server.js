//Module requirement definition
const net = require('net');
const colors = require('colors');
var employees = require('./employeeModule');

const server = net.createServer(
  (socket) => {
    //Greet client
    console.log(colors.green("Client connected."));
    socket.write("Greetings, client.");

    //Client invokes lookupById
    socket.on('data', (data) => {
      jsonQuery = data.toString();
      console.log(colors.green("Received query: " + jsonQuery));

      //Splits query into array of strings
      command = jsonQuery.split(" ");

      //Checking for command input
      switch(command[0]) {
        case "lookupByLastName":
          console.log(colors.cyan("Looking up last name " + command[1]));
          results = JSON.stringify(employees.lookupByLastName(command[1]));
          socket.write(results);
          break;
        case "lookupById":
          console.log(colors.cyan("Looking up ID number " + command[1]));
          idNumber = parseInt(command[1]);
          results = JSON.stringify(employees.lookupById(idNumber));
          socket.write(results);
          break;
        case "addEmployee":
          console.log(colors.cyan("Adding employee: " + command[1] + command[2]));
          employees.addEmployee(command[1], command[2]);
          break;
        default:
          socket.write("Invalid command.")
      };
    });

    //When client disconnects
    socket.on('end', () => {
      console.log(colors.green("Client disconnected."));
    });
  });

//Listening for connections
server.listen(3000, () => {
  console.log(colors.green("Waiting for connections."));
});

