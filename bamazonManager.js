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

var start = function(){

    inquirer.prompt([
    {
      name: "Menu",
      type: "rawlist",
      message: "What do you want to do?",
      choices: ["View Products for Sale","View Low Inventory","Add to Inventory","New Item"]
    }
  ]).then(function(answer) {
    // console.log("it worked");
    // What to do when manager selects View Products for Sale
    if (answer.Menu === "View Products for Sale"){
    connection.query("SELECT * FROM products", function(err,res){
      console.log(res);
    });
    //// What to do when manager selects View Low Inventory
  }if (answer.Menu === "View Low Inventory"){
    connection.query("SELECT * FROM products WHERE stock_quantity=?", [0], function(err,res){

      console.log("These items need to be stocked");
      console.log(res);
    });

// What to do when manager selects New Item
  }if (answer.Menu === "New Item"){
    inquirer.prompt([
      {
        name: "Product",
        type: "input",
        message: "Whats the name of the item you want to enter?"
      },
      {
        name: "Department",
        type: "input",
        message: "Whats the name of the department your item is in?"
      },
      {
        name: "Price",
        type: "input",
        message: "How much does your item cost?"
      },
      {
        name: "Stock",
        type: "input",
        message: "How much stock is there?"
      }

    ]).then(function(answer){
      connection.query("INSERT INTO products SET ?", {
        product_name:answer.Product,
        department_name: answer.Department,
        price: answer.Price,
        stock_quantity: answer.Stock
      }, function(err){
        if(err) throw err;
        console.log ("You added a product!");

      })
    })

// What to do when manager selects Add to Inventory
  }if (answer.Menu === "Add to Inventory"){
    inquirer.prompt([
      {
        name:"identification",
        type: "input",
        message: "What is the id number of the item's stock you want to update?"
      },
      {
        name:"Quantity",
        type: "input",
        message: "What's the new quantity for this item?"
      }
    ]).then(function(answer){
        connection.query("UPDATE products SET ? WHERE ?",  [{
          stock_quantity: answer.quantity
        },{
          id: answer.identification
        }])
        console.log("Updated!")
    })



  }

  });

}
  start();
