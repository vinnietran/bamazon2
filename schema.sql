CREATE database bamazon;

USE bamazon;
CREATE TABLE product (
item_id INTEGER (11) auto_increment NOT NULL,
product_name VARCHAR(300) not null, 
department_name VARCHAR(300) not null, 
price INTEGER (11) not null, 
stock_quantity integer(25) not null,
key (item_id)
);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Tech", "1500", 300);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Tech", "800", 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Blue Shirt", "Clothing", "13", 1000);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Tech", "1200", 150);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Home", "150",200);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Brown Suit", "Clothing", "1000", 10);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("4K TV", "Tech", "1500", 100);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Home", "1500", 25);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Painting", "Home", "1500", 20);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Porsche", "Auto", "150000", 5);

select * from product;