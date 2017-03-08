const net = require('net');
const readline = require('readline');
const colors = require('colors');

//Client command entry interface definition
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Client command entry function definition
const readMessage = (client) => {
  rl.question("Enter query command: ", (line) => {
    console.log(colors.green("Sending query to server:" + line));
    client.write(line);
  });
};

//When client connects
const client = net.connect({port:3000}, () => {
  console.log("Connected! \nUse the following commands to query:");
  console.log("1) lookupByLastName + (lastName)");
  console.log("2) lookupById + (id)");
  console.log("3) addEmployee + (firstName) + (lastName)");
});

//When client disconnects
client.on('end', () => {
  console.log(colors.green("Disconnected from server."));
  return;
});

//When client recieves data
client.on('data', (data) => {
  jsonData = data.toString();
  console.log("\nMessage from Server: " + colors.cyan(jsonData));
  if (jsonData == ("Invalid command.")) {
    client.end();
  }
  readMessage(client);
});
