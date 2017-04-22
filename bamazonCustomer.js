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

connection.query("SELECT * FROM products", function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
  }
  console.log("-----------------------------------");
});


var runSearch = function() {
  inquirer.prompt([
    {
      name: "Item",
    type: "input",
    message: "What is the id number of the item you would like to buy?"
  },
  {
    name: "Quantity",
    type: "input",
    message: "How many do you want?"
  }
  ]).then(function(answer) {


    connection.query("SELECT * FROM products WHERE id=?", [answer.Item], function(err, res) {
    for (var i = 0; i < res.length; i++) {
      if(res[i].stock_quantity < answer.Quantity){
        console.log("Insufficient Quantity!");
      }else
      console.log(answer.Quantity + " | " + res[i].product_name + " | "  + "$"+ (res[i].price * answer.Quantity));
    }

  });

  })
};
runSearch();
