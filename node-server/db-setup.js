const mysql = require("mysql");
const dbconfiq = require("./config/db-config");

const connection = mysql.createConnection({
    host: dbconfiq.HOST,
    user: dbconfiq.USER,
    password: dbconfiq.PASSWORD,
    database: dbconfiq.DB
});

let sqlStatements = [
    "CREATE TABLE Customers (CustomerId int NOT NULL PRIMARY KEY AUTO_INCREMENT, CustomerName varchar(255) NOT NULL);",
    "CREATE TABLE Items (ItemId int NOT NULL PRIMARY KEY AUTO_INCREMENT, ItemName varchar(255) NOT NULL, Price decimal(13, 4) NOT NULL, Active boolean);",
    "CREATE TABLE Orders (OrderId int NOT NULL PRIMARY KEY AUTO_INCREMENT, CustomerId int NOT NULL, Date DATETIME NOT NULL, Total decimal(13, 4) NOT NULL);",
    "CREATE TABLE OrdersItems (OrderId int NOT NULL, ItemId int NOT NULL, Quantity int NOT NULL, PRIMARY KEY (OrderId, ItemId));",
    "CREATE TABLE Users (Username varchar(255) NOT NULL, Password varchar(255) NOT NULL, PRIMARY KEY (Username, Password));",
    "INSERT INTO Users (Username, Password) VALUES ('admin', 'password')",
    "INSERT INTO Customers (CustomerName) VALUES ('Elizabeth');",
    "INSERT INTO Customers (CustomerName) VALUES ('Alexander');",
    "INSERT INTO Customers (CustomerName) VALUES ('Emira');",
    "INSERT INTO Customers (CustomerName) VALUES ('LJ');",
    "INSERT INTO Customers (CustomerName) VALUES ('Armand');",
    "INSERT INTO Customers (CustomerName) VALUES ('Elizabeth');",
    "INSERT INTO Items (ItemName, Price, Active) VALUES ('Candle' , 3.00, true);",
    "INSERT INTO Items (ItemName, Price, Active) VALUES ('Book' , 15.00, true);",
    "INSERT INTO Items (ItemName, Price, Active) VALUES ('Pen' , 0.75, true);",
    "INSERT INTO Items (ItemName, Price, Active) VALUES ('Paper' , 5.25, true);",
    "INSERT INTO Items (ItemName, Price, Active) VALUES ('Jar' , 12.50, true);",
    "INSERT INTO Items (ItemName, Price, Active) VALUES ('Movie' , 18.00, true);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (1 , '2021-02-01 08:30:00.000', 30);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (2 , '2021-02-02 10:00:00.000', 52.50);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (1 , '2021-02-02 12:46:00.000', 6.00);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (3 , '2021-02-03 15:25:00.000', 30.50);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (4 , '2021-02-04 18:50:00.000', 36.00);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (5 , '2021-02-04 08:05:00.000', 52.50);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (6 , '2021-02-06 17:30:00.000', 35.50);",
    "INSERT INTO Orders (CustomerId, Date, Total) VALUES (3 , '2021-02-08 16:30:00.000', 18.00);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (1, 1, 3);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (1, 2, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (1, 3, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (1, 4, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (2, 2, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (2, 5, 3);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (3, 3, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (3, 4, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (4, 1, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (4, 2, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (4, 5, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (5, 3, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (5, 2, 2);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (5, 4, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (6, 2, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (6, 5, 3);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (7, 6, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (7, 5, 1);",
    "INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (8, 6, 1);"
];

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database: " + dbconfiq.DB);


    sqlStatements.forEach((sql) => {
        connection.query(sql, function (err, result){
            if (err) throw err;
            console.log("Executed query: " + sql);
        });
    });
});

module.exports = connection;