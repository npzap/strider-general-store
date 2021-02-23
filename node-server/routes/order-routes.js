const {authenticateJWT} = require('../utils/auth');

module.exports = app => {
    const orders = require("../controllers/shared-controller");

    app.post("/orders", authenticateJWT,  orders.create);

    app.get("/orders", authenticateJWT,  orders.findAll);

    app.get("/orders/:orderId", authenticateJWT,  orders.findOne);

    // app.put("/orders/:orderId", orders.update);

    app.delete("/orders/:orderId", authenticateJWT,  orders.delete);

    // app.delete("/orders", orders.deleteAll);

};