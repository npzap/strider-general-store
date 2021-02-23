const {authenticateJWT} = require('../utils/auth');

module.exports = app => {
    const customers = require("../controllers/customer-controller.js");

    app.post("/customers", authenticateJWT, customers.create);

    app.get("/customers", authenticateJWT, customers.findAll);

    app.get("/customers/:customerId", authenticateJWT, customers.findOne);

    app.put("/customers/:customerId", authenticateJWT, customers.update);

    app.delete("/customers/:customerId", authenticateJWT, customers.delete);

    app.delete("/customers", authenticateJWT, customers.deleteAll);

};