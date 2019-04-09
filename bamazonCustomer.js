var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  database: "bamazon",
  password: "farmboy1"
 
});


connection.connect(function(err){
    console.log("Connected as id: " + connection.threadId);
    afterConnection(questions)
})

function afterConnection(questions) {
    connection.query("SELECT item_id, product_name, price FROM product", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    })
    questions();
  }

function questions(){
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Please enter the product id that you would like to purchase",
      name: "product"
    },

    {
        type: "input",
        message: "How many would like like to purchase?",
        name: "product"   
    }
])
}
// .then (function(inquirer){


// })