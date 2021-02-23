const sql = require("./db.js");


const Item = function(item) {
    this.ItemName = item.ItemName;
    this.Price = item.Price;
    this.Active = item.Active;
};

Item.create = (newItem, result) => {
    sql.query("INSERT INTO Items (ItemName, Price, Active) VALUES ( ?, ?, ?)",
        [newItem.ItemName, newItem.Price, newItem.Active],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("New item created: ", { id: res.insertId, ...newItem});
        result(null, {id: res.insertId, ...newItem});
    });
};

Item.findById = (itemId, result) => {
    sql.query("SELECT * FROM items WHERE ItemId = ?", itemId,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Item found: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Item.getAll = result => {
    sql.query("SELECT * FROM items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Items: ", res);
        result(null, res);
    });
};

Item.updateById = (itemId, item, result) => {
    sql.query("UPDATE items SET ItemName = ?, Price = ?, Active = ? WHERE ItemId = ?",
        [item.ItemName, item.Price, item.Active, itemId],
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

            console.log("Item updated with id: ", { id: itemId, ...item});
            result(null, { id: itemId, ...item });
        });
};

Item.remove = (itemId, result) => {
    sql.query("DELETE FROM items WHERE ItemId = ?", itemId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Item deleted with id: " + itemId);
        result(null, res);
    });
};

Item.removeAll = result => {
    sql.query("DELETE FROM items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Rows deleted: " + res.affectedRows);
        result(null, res);
    });
};

module.exports = Item;