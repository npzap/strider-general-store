const sql = require("./db.js");


const OrdersItems = function(ordersItems) {
    this.OrderId = ordersItems.OrderId;
    this.ItemId = ordersItems.ItemId;
    this.Quantity = ordersItems.Quantity;
};

OrdersItems.create = (newOrder, result) => {
    sql.query("INSERT INTO OrdersItems (OrderId, ItemId, Quantity) VALUES (?, ?, ?)",
        [newOrder.OrderId, newOrder.ItemId, newOrder.Quantity],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("New order-item created: ", newOrder);
            result(null, newOrder);
        });
};

OrdersItems.findById = (orderId, result) => {
    sql.query("SELECT * FROM OrdersItems WHERE OrderId = ?", orderId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Order found: ", res);
            result(null, res);
            return;
        }
    });
};

OrdersItems.getItemsById = ((orderId, result) => {
    sql.query("SELECT ItemName, Price, Quantity FROM OrdersItems LEFT OUTER JOIN Items ON OrdersItems.ItemId = Items.ItemId WHERE OrdersItems.OrderId = ?", orderId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Order found: ", res);
            result(null, res);
            return;
        }
    });
});



OrdersItems.getAll = result => {
    sql.query("SELECT * FROM OrdersItems", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Order: ", res);
        result(null, res);
    });
};

OrdersItems.updateById = (orderId, order, result) => {
    sql.query("UPDATE OrdersItems SET ItemId = ?, Quantity = ? WHERE OrderId = ?",
        [order.ItemId, order.Quantity, orderId],
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

OrdersItems.remove = (orderId, result) => {
    sql.query("DELETE FROM OrdersItems WHERE OrderId = ?", orderId, (err, res) => {
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

OrdersItems.removeAll = result => {
    sql.query("DELETE FROM OrdersItems", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Rows deleted: " + res.affectedRows);
        result(null, res);
    });
};

module.exports = OrdersItems;