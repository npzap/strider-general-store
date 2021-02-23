const sql = require("./db.js");


const Customer = function(customer) {
    this.CustomerName = customer.CustomerName;
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO Customers (CustomerName) VALUES (?)", newCustomer.CustomerName, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("New customer created: ", { id: res.insertId, ...newCustomer});
        result(null, {id: res.insertId, ...newCustomer});
    });
};

Customer.findById = (customerId, result) => {
    sql.query("SELECT * FROM customers WHERE CustomerId = ?", customerId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Customer found: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Customers: ", res);
        result(null, res);
    });
};

Customer.updateById = (customerId, customer, result) => {
    sql.query("UPDATE customers SET CustomerName = ? WHERE CustomerId = ?",
        [customer.CustomerName, customerId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Customer updated with id: ", { id: customerId, ...customer});
            result(null, { id: customerId, ...customer });
        });
};

Customer.remove = (customerId, result) => {
    sql.query("DELETE FROM customers WHERE CustomerId = ?", customerId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Customer deleted with id: " + customerId);
        result(null, res);
    });
};

Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Rows deleted: " + res.affectedRows);
        result(null, res);
    });
};

module.exports = Customer;