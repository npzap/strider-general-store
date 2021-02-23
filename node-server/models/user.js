const sql = require("./db.js");


const User = function(user) {
    this.Username = user.Username;
    this.Password = user.Password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO Users (Username, Password) VALUES (?, ?)", [newUser.Username, newUser.Password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("New user created: ", newUser);
        result(null, newUser);
    });
};

User.findById = (username, result) => {
    sql.query("SELECT * FROM Users WHERE username = ? AND ", username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("User found: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Rows deleted: " + res.affectedRows);
        result(null, res);
    });
};

module.exports = User;