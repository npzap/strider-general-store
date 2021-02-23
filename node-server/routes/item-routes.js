const {authenticateJWT} = require('../utils/auth');

module.exports = app => {
    const items = require("../controllers/item-controller.js");

    app.post("/items", authenticateJWT, items.create);

    app.get("/items", authenticateJWT,  items.findAll);

    app.get("/items/:itemId", authenticateJWT,  items.findOne);

    app.put("/items/:itemId", authenticateJWT,  items.update);

    app.delete("/items/:itemId", authenticateJWT,  items.delete);

    app.delete("/items", authenticateJWT,  items.deleteAll);

};