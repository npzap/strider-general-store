const sql = require("./db.js");


const Order = function(order) {
    this.CustomerId = order.CustomerId;
    this.Date = order.Date;
    this.Total = order.Total;
};

Order.create = (newOrder, result) => {
    sql.query("INSERT INTO Orders (CustomerId, Date, Total) VALUES (?, ?, ?)",
        [newOrder.CustomerId, newOrder.Date, newOrder.Total],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("New order created: ", { id: res.insertId, ...newOrder});
        result(null, {id: res.insertId, ...newOrder});
    });
};

Order.findById = (orderId, result) => {
    sql.query("SELECT * FROM orders WHERE OrderId = ?", orderId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Order found: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Order.getAll = result => {
    sql.query("SELECT * FROM orders", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Order: ", res);
        result(null, res);
    });
};

Order.getAllWithCustomers = result => {
    sql.query("SELECT * FROM orders INNER JOIN customers ON orders.CustomerId = customers.CustomerId", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Order: ", res);
        result(null, res);
    });
};

Order.updateById = (orderId, order, result) => {
    sql.query("UPDATE orders SET CustomerId = ?, Date = ?, Total = ? WHERE OrderId = ?",
        [order.CustomerId, order.Date, order.Total, orderId],
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

            console.log("Order updated with id: ", { id: orderId, ...order});
            result(null, { id: orderId, ...order });
        });
};

Order.remove = (orderId, result) => {
    sql.query("DELETE FROM orders WHERE OrderId = ?", orderId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Order deleted with id: " + orderId);
        result(null, res);
    });
};

Order.removeAll = result => {
    sql.query("DELETE FROM orders", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Rows deleted: " + res.affectedRows);
        result(null, res);
    });
};

module.exports = Order;