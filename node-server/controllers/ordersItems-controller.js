const OrdersItems = require("../models/ordersItems");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const order = new OrdersItems({
        OrderId: req.body.OrderIdm,
        ItemId: req.body.ItemId,
        Quantity: req.body.Quantity
    });

    return new Promise((resolve, reject) => {
        OrdersItems.create(order, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => res.status(500).send({
            message: error.message
        }));
};

exports.findAll = (req, res) => {
    return new Promise((resolve, reject) => {
        OrdersItems.getAll((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => res.status(500).send({
            message: error.message
        }));
};

exports.findOne = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    return new Promise((resolve, reject) => {
        OrdersItems.findById(req.params.orderId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });

    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: `OrderItem not found with id: ` + req.params.orderId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    return new Promise((resolve, reject) => {
        OrdersItems.updateById(req.params.orderId, new OrdersItems(req.body), (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: `OrderItem not found with id: ` + req.params.orderId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });
};

exports.delete = (req, res) => {
    return new Promise((resolve, reject) => {
        OrdersItems.remove(req.params.orderId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send({message: 'OrderItem successfully deleted with id: ' + req.params.orderId}),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'OrderItem not found with id: ' + req.params.orderId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });


};

exports.deleteAll = (req, res) => {
    return new Promise((resolve, reject) => {
        OrdersItems.removeAll((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => res.send({message: 'All OrdersItems were successfully deleted'}),
        (error) => res.status(500).send({
            message: error.message
        }));
};