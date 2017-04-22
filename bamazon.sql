CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL (50,2),
  stock_quantity INTEGER (50),
  PRIMARY KEY (id)
);

INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Cake", "Food", 3.00, 100),
("Pizza", "Food", 5.00, 100),
("To Kill a Mockingbird", "Books", 6.00, 100),
("Pillow", "Furniture", 10.00, 100),
("Playing Cards", "Games", 1.00, 100),
("Macbook Pro", "Electronics", 1200.00, 100),
("Facial Scrub", "Health and Beauty", 5.00, 100),
("Mascara", "Health and Beauty", 6.50, 100),
("Playstation", "Electronics", 350.00, 100),
("Canon 70D", "Electronics", 999.99, 100);
