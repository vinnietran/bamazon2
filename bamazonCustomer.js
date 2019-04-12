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

connection.connect(function (err) {
  console.log("Connected as id: " + connection.threadId);
})

showStore();

//function to display first 2 questions
function questions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the product id that you would like to purchase",
        name: "product",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        message: "How many would like like to purchase?",
        name: "quantity",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function updateInventory(inquirerResponse) {
      var userOrder = parseInt(inquirerResponse.quantity);
      var item = parseInt(inquirerResponse.product);

      connection.query("SELECT stock_quantity, product_name, price FROM product WHERE ?",
        [{ item_id: inquirerResponse.product }],
        function (err, res) {

          var currentInv = parseInt(res[0].stock_quantity);
          var productName = res[0].product_name;
          var price = parseInt(res[0].price);

          if (err) throw err;

          if (parseInt(currentInv) < parseInt(userOrder)) {
            console.log("INSUFFICIENT QUANTITY! ORDER LESS!")
            setTimeout(function () { showStore(); }, 1200);

          }
          else {
            var orderTotal = userOrder * price;
            var newQuant = parseInt(currentInv) - parseInt(userOrder);
            connection.query("UPDATE product SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuant
                },
                {
                  item_id: item
                }
              ],
              function (error) {
                if (error) throw err;
                console.log("THANK YOU FOR YOUR ORDER!!!! \n",
                  "You have ordered " + userOrder + " " + productName + "s\n",
                  "The total for your order is $" + orderTotal);
              }
            );
            //connection.end();
            setTimeout(function () { continueShop(); }, 1200);
          }
        })
    })
}

function showStore() {
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM product",
    function (err, res) {
      if (err) throw err;
      //console.log(res);
      var table = "";
      for (var i = 0; i < res.length; i++) {
        table = "";
        table += "Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " ||" + "Price: $" + res[i].price + " ||"
          + "Number Available: " + res[i].stock_quantity + " ||";
        console.log("--------------------------------------------------------------------------------------\n",
          table)
      }
    })
  setTimeout(function () { questions(); }, 1200)
}

function continueShop() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "Would you like to continue shopping?",
        name: "continue",
        choices: ["YES", "NO"]
      }
    ]).then(function (inquirerResponse) {
      if (inquirerResponse.continue === 'YES') {
        showStore();
      }
      else {
        connection.end();
      }
    })
}

