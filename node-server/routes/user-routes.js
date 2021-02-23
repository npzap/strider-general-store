const AuthToken = require('../utils/auth.js');


module.exports = app => {
    const user = require("../controllers/user-controller.js");

    app.post("/register", user.create);

    app.post("/login", (req, res) => {

        const returnUser = user.findOne;

        if(returnUser) {
            const accessToken = AuthToken.generateToken();
            console.log("User logging in...")
            res.json({
                accessToken
            });
        } else {
            res.send("username or password is incorrect!");
        }
    });

};