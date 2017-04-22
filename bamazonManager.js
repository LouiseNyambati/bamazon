// NPM packages
var inquirer = require("inquirer");
var mysql = require("mysql");

// Connect to database
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "Louise",
    password: "Louisemn",
    database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});
// var viewProducts = function(){
//     connection.query("SELECT * FROM products", function(err,results){
//       console.log(results);
    // });
// }

  inquirer.prompt([
  {
    name: "Menu",
    type: "rawlist",
    message: "What do you want to do?",
    choices: ["View Products for Sale","View Low Inventory","Add to Inventory","New Item"]
  }
]).then(function(answer) {
  // console.log("it worked");
  if (answer === "View Products for Sale"){
  connection.query("SELECT * FROM products WHERE stock_quantity > 1", function(err,res){
    console.log(res);
  });
}

});
